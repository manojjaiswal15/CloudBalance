package com.cloudbalance.Controller;

import com.cloudbalance.DTO.User.RequestUserDTO;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping("/admin")

    @PostMapping("/add")
    public ResponseEntity<UserEntity> addUser(@RequestBody RequestUserDTO userDTO){
        return new ResponseEntity<>(userService.addUser(userDTO), HttpStatus.CREATED);
    }
}
