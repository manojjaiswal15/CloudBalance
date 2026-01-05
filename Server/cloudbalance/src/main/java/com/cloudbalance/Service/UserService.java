package com.cloudbalance.Service;

import com.cloudbalance.DTO.Onboarding.AccountAssignDTO;
import com.cloudbalance.DTO.Onboarding.UserAddAccountOnboarding;
import com.cloudbalance.DTO.User.LoginResponseJWTDTO;
import com.cloudbalance.DTO.User.LoginUserDTO;
import com.cloudbalance.DTO.User.ResponseUserDTO;
import com.cloudbalance.DTO.User.RequestUserDTO;
import com.cloudbalance.Entity.OnboardingAccountEntity;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.OnBoardingAccountRepository;
import com.cloudbalance.Repository.UserRepository;
import com.cloudbalance.Utils.JWTUtil;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OnBoardingAccountRepository onBoardingAccountRepository;




//    login for users
public LoginResponseJWTDTO loginUser(LoginUserDTO users){
    UserEntity user= userRepository.findByEmail(users.getEmail()).orElseThrow(()->new UsernameNotFoundException("Email not Register"));
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(),users.getPassword())
    );

        String token= jwtUtil.generateToken(user.getUsername());
        String firstName=user.getFirstName();
        String role=user.getRole();
    return new LoginResponseJWTDTO(token,firstName,role);
}

//    add user
@Transactional
public ResponseUserDTO addUser(UserAddAccountOnboarding userDTO) {

//    UserEntity userExists = userRepository.findByEmail(userDTO.getEmail()).orElseThrow();
//    if(userExists!=null){
//        throw new RuntimeException("User already exists");
//    }

    // Create User
    UserEntity user = new UserEntity();
    user.setEmail(userDTO.getEmail());
    user.setFirstName(userDTO.getFirstName());
    user.setLastName(userDTO.getLastName());
    user.setRole(userDTO.getRole());
    user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

    // Save user once
    UserEntity savedUser = userRepository.save(user);

    // Assign onboarding accounts ONLY for customer
    if ("customer".equalsIgnoreCase(savedUser.getRole())) {

        List<OnboardingAccountEntity> accounts = onBoardingAccountRepository.findAllById(userDTO.getAccountId());
        if (accounts.isEmpty()) {
            throw new RuntimeException("Account not found");
        }
        for (OnboardingAccountEntity account : accounts) {
            savedUser.getOnboardingAccountEntities().add(account);
            account.getUsers().add(savedUser);
        }
    }
    //Save once more to update join table
    UserEntity finalUser = userRepository.save(savedUser);
    return ResponseUserDTO.fromEntity(finalUser);
}


//edit user
    @Transactional
    public ResponseUserDTO editUser(UserAddAccountOnboarding edituser, Long id) {
     UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

     //  Update basic fields
        user.setEmail(edituser.getEmail());
        user.setFirstName(edituser.getFirstName());
        user.setLastName(edituser.getLastName());
        user.setRole(edituser.getRole());
        if (edituser.getPassword() != null && !edituser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(edituser.getPassword()));
        }

        // Update onboarding accounts ONLY for customer
        if ("customer".equalsIgnoreCase(edituser.getRole())) {
            // clear old mapping
            user.getOnboardingAccountEntities().clear();
            List<Long> accountIds = edituser.getAccountId();
            if (accountIds != null && !accountIds.isEmpty()) {
                List<OnboardingAccountEntity> accounts = onBoardingAccountRepository.findAllById(accountIds);
                if (accounts.isEmpty()) {
                    throw new RuntimeException("Account not found");
                }
                for (OnboardingAccountEntity account : accounts) {
                    user.getOnboardingAccountEntities().add(account);
                    account.getUsers().add(user);
                }
            }
        }

        //  Save once at the end
        UserEntity updatedUser = userRepository.save(user);

        return ResponseUserDTO.fromEntity(updatedUser);
    }




//    alluser
    public List<ResponseUserDTO> getAllUser() {
        return userRepository.findAll()
                .stream()
                .map(ResponseUserDTO::fromEntity)
                .toList();
    }
//    specific user
    public ResponseUserDTO getspecificUser(Long id){
        UserEntity user=userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("This User not Exists..."));
        return ResponseUserDTO.fromEntity(user);
    }



}
