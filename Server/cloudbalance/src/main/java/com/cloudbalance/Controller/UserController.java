package com.cloudbalance.Controller;

import com.cloudbalance.DTO.User.RequestUserDTO;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class UserController {
    @Autowired
    UserService userService;

//     users Add
    @PostMapping("add")
    public ResponseEntity<UserEntity> addUser(@RequestBody RequestUserDTO userDTO){
        return new ResponseEntity<>(userService.addUser(userDTO), HttpStatus.CREATED);
    }

//    user update
    @PutMapping("edit/{id}")
    public ResponseEntity<UserEntity> editUser(@RequestBody RequestUserDTO userDTO, @PathVariable Long id){
        return new ResponseEntity<>(userService.editUser(userDTO,id),HttpStatus.OK);
    }
}
