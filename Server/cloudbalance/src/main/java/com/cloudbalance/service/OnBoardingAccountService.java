package com.cloudbalance.service;


import com.cloudbalance.dto.onboarding.AccountAssignDTO;
import com.cloudbalance.dto.onboarding.RequestAddAccountDTO;
import com.cloudbalance.dto.onboarding.ResponseAddAccountDTO;
import com.cloudbalance.dto.onboarding.ResponseAssignAccountForCustomerRoleDTO;
import com.cloudbalance.entity.OnboardingAccountEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.OnBoardingAccountRepository;
import com.cloudbalance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OnBoardingAccountService {

    @Autowired
    private OnBoardingAccountRepository onBoardingAccountRepository;

   @Autowired
   private UserRepository userRepository;


    public ResponseAddAccountDTO addAccount(RequestAddAccountDTO requestAddAccountDTO) {
        String arn = onBoardingAccountRepository.findByArn(requestAddAccountDTO.getArn());
        if (arn != null) {
            throw new IllegalArgumentException("Already Account Added!!!!");
        }
//        adding the account using object
        OnboardingAccountEntity newAccount = new OnboardingAccountEntity();
        newAccount.setAccountName(requestAddAccountDTO.getAccountName());
        newAccount.setAccountId(requestAddAccountDTO.getAccountId());
        newAccount.setArn(requestAddAccountDTO.getArn());

        OnboardingAccountEntity saveAccount = onBoardingAccountRepository.save(newAccount);
        return new ResponseAddAccountDTO(saveAccount.getId(), saveAccount.getArn(), saveAccount.getAccountName(), saveAccount.getAccountId());
    }

//    get all account
    public List<ResponseAddAccountDTO> getAllAccount() {
        List<OnboardingAccountEntity> allAccounts = onBoardingAccountRepository.findAll();
        return allAccounts.stream()
                .map(ResponseAddAccountDTO::getConvertEntityToDTO).toList();
    }


//    get per customer all assign account detail
public AccountAssignDTO getAllAssignAccountPerUser(Long id) {

    UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    List<Long> allAccount = user.getOnboardingAccountEntities()
            .stream()
            .map(OnboardingAccountEntity::getId)
            .toList();

    return new AccountAssignDTO(user.getId(), allAccount);
}

//  this is for customer-role for (they are get assign account info)
    public ResponseAssignAccountForCustomerRoleDTO getAllAssignAccountCustomerRole(Long id){
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Long> allAccount=user.getOnboardingAccountEntities().stream()
                .map(onboardingAccountEntity -> onboardingAccountEntity.getAccountId())
                .toList();

        return new ResponseAssignAccountForCustomerRoleDTO(user.getId(), allAccount);
    }
}