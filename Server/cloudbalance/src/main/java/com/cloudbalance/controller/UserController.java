package com.cloudbalance.controller;

import com.cloudbalance.dto.onboarding.UserAddAccountOnboarding;
import com.cloudbalance.dto.user.*;
import com.cloudbalance.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Validated
public class UserController {

    @Autowired
    private UserService userService;


//    login
    @PostMapping("/login")
    public ResponseEntity<LoginResponseJWTDTO> login(@Valid @RequestBody LoginUserDTO loginUser){
        return  new ResponseEntity<>(userService.loginUser(loginUser),HttpStatus.OK);
    }

//     users Add
    @PostMapping("/add")
    public ResponseEntity<ResponseUserDTO> addUser(@Valid @RequestBody UserAddAccountOnboarding userDTO) {
        return userService.addUser(userDTO);
    }

//    user update
    @PutMapping("edit/{id}")
    public ResponseEntity<ResponseUserDTO> editUser(@RequestBody UserAddAccountOnboarding userDTO, @PathVariable Long id){
        return new ResponseEntity<>(userService.editUser(userDTO,id),HttpStatus.OK);
    }

//    all user details
    @GetMapping("/users")
    public ResponseEntity<List<ResponseUserDTO>> allUser(){
        return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);
    }

//    specific user detail
    @GetMapping("/user/{id}")
    public ResponseEntity<ResponseUserDTO> specificUser(@PathVariable  Long id){
        return new ResponseEntity<>(userService.getspecificUser(id),HttpStatus.OK);
    }


}
