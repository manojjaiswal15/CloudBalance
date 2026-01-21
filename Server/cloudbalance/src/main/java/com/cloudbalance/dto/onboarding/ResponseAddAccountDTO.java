package com.cloudbalance.dto.onboarding;


import com.cloudbalance.entity.OnboardingAccountEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseAddAccountDTO {

    private Long id;
    private String arn;
    private String accountName;
    private Long accountId;

    public static ResponseAddAccountDTO getConvertEntityToDTO(OnboardingAccountEntity account){
                   return new ResponseAddAccountDTO(account.getId(), account.getArn(), account.getAccountName(), account.getAccountId());
    }
}
