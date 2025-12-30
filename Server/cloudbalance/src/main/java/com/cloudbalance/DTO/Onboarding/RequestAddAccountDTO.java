package com.cloudbalance.DTO.Onboarding;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RequestAddAccountDTO {

    private String arn;
    private String accountName;
    private Long accountId;
}
