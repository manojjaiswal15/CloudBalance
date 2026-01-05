package com.cloudbalance.DTO.Onboarding;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountAssignDTO {
    private Long userId;
    private List<Long> account;
}
