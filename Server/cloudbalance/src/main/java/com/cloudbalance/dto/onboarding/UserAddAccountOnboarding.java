package com.cloudbalance.dto.onboarding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserAddAccountOnboarding {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String password;
    List<Long> accountId=new ArrayList<>();
}
