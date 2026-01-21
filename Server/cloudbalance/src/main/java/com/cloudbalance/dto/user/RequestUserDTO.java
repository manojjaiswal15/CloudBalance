package com.cloudbalance.dto.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUserDTO {
    @NotBlank(message = "First Name cannot be blank")
    @Size(min = 2, max = 20, message = "First Name must be between 2 and 20 characters")
    private String firstName;
    @NotBlank(message = "Last Name cannot be blank")
    @Size(min = 2, max = 20, message = "Last Name must be between 2 and 20 characters")
    private String lastName;
    @Email(message = "Email is not valid")
    @NotBlank(message = "Email cannot be blank")
    private String email;
    @NotBlank(message = "role must be selected")
    private String role;
    @NotBlank(message = "Password cannot be blank")
    private String password;
}
