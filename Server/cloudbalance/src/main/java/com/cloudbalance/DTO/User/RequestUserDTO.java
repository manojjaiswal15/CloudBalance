package com.cloudbalance.DTO.User;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RequestUserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}
