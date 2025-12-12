package com.cloudbalance.DTO.User;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String password;
}
