package com.cloudbalance.Controller;

import com.cloudbalance.DTO.User.LoginResponseJWTDTO;
import com.cloudbalance.DTO.User.LoginUserDTO;
//import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.DTO.User.ResponseUserDTO;
import com.cloudbalance.DTO.User.UpdateUserDTO;
import com.cloudbalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class UserController {
    @Autowired
    UserService userService;

//    login
    @PostMapping("/login")
    public ResponseEntity<LoginResponseJWTDTO> login(@RequestBody LoginUserDTO loginUser){
        return  new ResponseEntity<>(userService.loginUser(loginUser),HttpStatus.OK);
    }

//     users Add
    @PostMapping("/add")
    public ResponseEntity<ResponseUserDTO> addUser(@RequestBody UpdateUserDTO userDTO){
        return new ResponseEntity<>(userService.addUser(userDTO), HttpStatus.CREATED);
    }

//    user update
    @PutMapping("edit/{id}")
    public ResponseEntity<ResponseUserDTO> editUser(@RequestBody UpdateUserDTO userDTO, @PathVariable Long id){
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
