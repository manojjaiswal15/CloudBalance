package com.cloudbalance.DTO.onboarding;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAssignAccountForCustomerRoleDTO {
    private Long id;
    private List<Long> assignAccount;
}
