package com.cloudbalance.DTO.user;

import com.cloudbalance.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseUserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    public ResponseUserDTO(long id, String email, String firstName, String lastName, String role) {
        this.id=id;
        this.email=email;
        this.firstName=firstName;
        this.lastName=lastName;
        this.role=role;
    }

    public static ResponseUserDTO fromEntity(UserEntity user) {
        return new ResponseUserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole()
        );
    }

}
