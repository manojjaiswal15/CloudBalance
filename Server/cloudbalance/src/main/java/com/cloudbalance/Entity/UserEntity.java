package com.cloudbalance.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="Users")
public class UserEntity {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private  String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String role;

    @Column @JsonIgnore
    private  String password;

}
