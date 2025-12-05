package com.cloudbalance.Service;

import com.cloudbalance.DTO.User.RequestUserDTO;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

//    login for users
    public UserEntity loginUser(RequestUserDTO users){
        UserEntity valid= userRepository.findByEmail(users.getEmail());
       return null;
    }

//    add user
    public UserEntity addUser(RequestUserDTO users){
        UserEntity newUser=new UserEntity();
        if(users.getEmail()!=null || users.getRole()!=null || users.getFirstName()!=null || users.getLastName()!=null){
            newUser.setEmail(users.getEmail());
            newUser.setFirstName(users.getFirstName());
            newUser.setLastName(users.getLastName());
            newUser.setRole(users.getRole());
        }
        return userRepository.save(newUser);
    }

//    edit user
    public UserEntity editUser(RequestUserDTO edituser,Long id){
        Optional<UserEntity> validUser=userRepository.findById(id);
            if(validUser.isPresent()){
                 validUser.get().setEmail(edituser.getEmail());
                 validUser.get().setFirstName(edituser.getFirstName());
                 validUser.get().setLastName(edituser.getLastName());
                 validUser.get().setRole(edituser.getRole());
            }
            return userRepository.save(validUser.get());
    }
}
