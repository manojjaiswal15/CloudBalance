package com.cloudbalance.Service;

import com.cloudbalance.DTO.Onboarding.UserAddAccountOnboarding;
import com.cloudbalance.DTO.User.LoginResponseJWTDTO;
import com.cloudbalance.DTO.User.LoginUserDTO;
import com.cloudbalance.DTO.User.ResponseUserDTO;
import com.cloudbalance.Entity.OnboardingAccountEntity;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.OnBoardingAccountRepository;
import com.cloudbalance.Repository.UserRepository;
import com.cloudbalance.Utils.JWTUtil;

import jakarta.transaction.Transactional;
import net.snowflake.client.jdbc.internal.amazonaws.services.s3.transfer.internal.PresignedUrlRetryableDownloadTaskImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public LoginResponseJWTDTO loginUser(LoginUserDTO users) {
        UserEntity user = userRepository.findByEmail(users.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Email not Register"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), users.getPassword())
        );

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        String firstName = user.getFirstName();
        String role = user.getRole();
        return new LoginResponseJWTDTO(user.getId(), token, firstName, role);
    }

    //    add user
    @Transactional
    public ResponseEntity<ResponseUserDTO> addUser(UserAddAccountOnboarding userDTO) {

//    UserEntity userExists = userRepository.findByEmail(userDTO.getEmail()).orElseThrow();
//    if(userExists!=null){
//        throw new RuntimeException("User already exists");
//    }
        if (userDTO.getFirstName().isEmpty() || userDTO.getLastName().isEmpty() || userDTO.getEmail().isEmpty() || userDTO.getPassword().isEmpty()
                || userDTO.getRole().isEmpty() || userDTO.getAccountId().isEmpty()) {
//        throw new I("Invalid Credentials");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }


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
        return ResponseEntity.ok(ResponseUserDTO.fromEntity(finalUser));
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
        } else {
            user.getOnboardingAccountEntities().forEach(account -> {
                account.getUsers().remove(user);
            });
            user.getOnboardingAccountEntities().clear();
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
    public ResponseUserDTO getspecificUser(Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("This User not Exists..."));
        return ResponseUserDTO.fromEntity(user);
    }

}
