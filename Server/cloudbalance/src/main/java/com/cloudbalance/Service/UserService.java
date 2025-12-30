package com.cloudbalance.Service;

import com.cloudbalance.DTO.User.LoginResponseJWTDTO;
import com.cloudbalance.DTO.User.LoginUserDTO;
import com.cloudbalance.DTO.User.ResponseUserDTO;
import com.cloudbalance.DTO.User.UpdateUserDTO;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.UserRepository;
import com.cloudbalance.Utils.JWTUtil;

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
    public ResponseUserDTO addUser(UpdateUserDTO users){
        UserEntity newUser=new UserEntity();
//        UserEntity existUser=userRepository.findByEmail(users.getEmail()).orElseThrow(()->new RuntimeException("User Already Exist..."));
        if(users.getEmail()!=null && users.getRole()!=null && users.getFirstName()!=null && users.getLastName()!=null && users.getPassword() != null){
            newUser.setEmail(users.getEmail());
            newUser.setFirstName(users.getFirstName());
            newUser.setLastName(users.getLastName());
            newUser.setRole(users.getRole());
            newUser.setPassword(passwordEncoder.encode(users.getPassword()));
        }

        UserEntity saved = userRepository.save(newUser);
        return ResponseUserDTO.fromEntity(saved);
    }

//    edit user
    public ResponseUserDTO editUser(UpdateUserDTO edituser, Long id) {
        Optional<UserEntity> validUser = userRepository.findById(id);
        if (validUser.isPresent()) {
            validUser.get().setEmail(edituser.getEmail());
            validUser.get().setFirstName(edituser.getFirstName());
            validUser.get().setLastName(edituser.getLastName());
            validUser.get().setRole(edituser.getRole());
            validUser.get().setPassword(passwordEncoder.encode(edituser.getPassword()));
        }
        UserEntity updated= (UserEntity)userRepository.save(validUser.get());
        return ResponseUserDTO.fromEntity(updated);
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
