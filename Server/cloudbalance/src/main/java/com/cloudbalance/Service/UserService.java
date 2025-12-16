package com.cloudbalance.Service;

import com.cloudbalance.DTO.User.LoginUserDTO;
import com.cloudbalance.DTO.User.ResponseUserDTO;
import com.cloudbalance.DTO.User.UpdateUserDTO;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

//    login for users
    public UserEntity loginUser(LoginUserDTO users){
        UserEntity valid= userRepository.findByEmail(users.getEmail());
        return null;
    }

//    add user
    public ResponseUserDTO addUser(UpdateUserDTO users){
        System.out.println("UpdateUserDTO: " + users);
        UserEntity newUser=new UserEntity();
        if(users.getEmail()!=null && users.getRole()!=null && users.getFirstName()!=null && users.getLastName()!=null && users.getPassword() != null){
            newUser.setEmail(users.getEmail());
            newUser.setFirstName(users.getFirstName());
            newUser.setLastName(users.getLastName());
            newUser.setRole(users.getRole());
            newUser.setPassword(users.getPassword());
        }

        UserEntity saved = userRepository.save(newUser);
        System.out.println("saved: " + saved);

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
            validUser.get().setPassword(edituser.getPassword());
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
        UserEntity user=userRepository.findById(id).orElseThrow();
        return ResponseUserDTO.fromEntity(user);
    }


}
