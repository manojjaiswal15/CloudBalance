package com.cloudbalance.DTO.User;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginUserDTO {
    private String email;
    private String password;
}
