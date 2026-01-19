package com.cloudbalance.service;

import com.cloudbalance.DTO.onboarding.UserAddAccountOnboarding;
import com.cloudbalance.DTO.user.LoginResponseJWTDTO;
import com.cloudbalance.DTO.user.LoginUserDTO;
import com.cloudbalance.DTO.user.ResponseUserDTO;
import com.cloudbalance.entity.OnboardingAccountEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.exception.EmailAlreadyInUsedException;
import com.cloudbalance.repository.OnBoardingAccountRepository;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.Utils.JWTUtil;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    Optional<UserEntity> userExists = userRepository.findByEmail(userDTO.getEmail());
    if(userExists.isPresent()){
        throw new EmailAlreadyInUsedException("User already exists");
    }
        if (userDTO.getFirstName().isEmpty() || userDTO.getLastName().isEmpty() || userDTO.getEmail().isEmpty() || userDTO.getPassword().isEmpty()
                || userDTO.getRole().isEmpty() || userDTO.getAccountId().isEmpty()) {
            throw new IllegalArgumentException("All fields are required");
        }


        // Create User
        UserEntity user=UserEntity.builder().email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(userDTO.getRole())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .onboardingAccountEntities(new ArrayList<>())
                .build();

        // Save user once
        UserEntity savedUser = userRepository.save(user);

        // Assign onboarding accounts ONLY for customer
        if ("customer".equalsIgnoreCase(savedUser.getRole())) {
            List<OnboardingAccountEntity> accounts = onBoardingAccountRepository.findAllById(userDTO.getAccountId());
            if (accounts.isEmpty()) {
                throw new IllegalArgumentException("Account not found");
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
        UserEntity user = userRepository.findById(id).orElseThrow();
        if(user==null){
            throw  new IllegalArgumentException("User not found");
        }
        //  Update basic fields
        user.setEmail(edituser.getEmail());
        user.setFirstName(edituser.getFirstName());
        user.setLastName(edituser.getLastName());
        user.setRole(edituser.getRole());
//        if (edituser.getPassword() != null && !edituser.getPassword().isBlank()) {
//            user.setPassword(passwordEncoder.encode(edituser.getPassword()));
//        }

        // Update onboarding accounts ONLY for customer
        if ("customer".equalsIgnoreCase(edituser.getRole())) {
            // clear old mapping
            user.getOnboardingAccountEntities().clear();
            List<Long> accountIds = edituser.getAccountId();
            List<OnboardingAccountEntity> accounts = onBoardingAccountRepository.findAllById(accountIds);
            if (accounts.isEmpty()) {
                throw new RuntimeException("Account not found");
            }
            if (accountIds != null && !accountIds.isEmpty()) {

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
