package com.cloudbalance.DTO.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseJWTDTO {
    private Long id;
    private String token;
    private String firstName;
    private String role;
}
