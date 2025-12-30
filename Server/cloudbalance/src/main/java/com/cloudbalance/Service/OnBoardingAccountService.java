package com.cloudbalance.Service;


import com.cloudbalance.DTO.Onboarding.AccountAssignDTO;
import com.cloudbalance.DTO.Onboarding.RequestAddAccountDTO;
import com.cloudbalance.DTO.Onboarding.ResponseAddAccountDTO;
import com.cloudbalance.Entity.OnboardingAccountEntity;
import com.cloudbalance.Entity.UserEntity;
import com.cloudbalance.Repository.OnBoardingAccountRepository;
import com.cloudbalance.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class OnBoardingAccountService {

    @Autowired
    private OnBoardingAccountRepository onBoardingAccountRepository;

    @Autowired
    private UserRepository userRepository;




    public ResponseAddAccountDTO addAccount(RequestAddAccountDTO requestAddAccountDTO) {
        String arn = onBoardingAccountRepository.findByArn(requestAddAccountDTO.getArn());
        if (arn != null) {
            throw new RuntimeException("Already Account Added!!!!");
        }
//        adding the account using object
        OnboardingAccountEntity newAccount = new OnboardingAccountEntity();
        newAccount.setAccountName(requestAddAccountDTO.getAccountName());
        newAccount.setAccountId(Long.valueOf(requestAddAccountDTO.getAccountId()));
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


//   assign account onboarding
    public void assignAccount(AccountAssignDTO accountDTO) {
        Long userId = accountDTO.getUserId();
        UserEntity user= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));;
        if(!user.getRole().equals("customer")){
            throw new RuntimeException("Only customer can be assigned accounts");
        }
//       check account have already assigned or not
        List<OnboardingAccountEntity> accounts = onBoardingAccountRepository.findAllById(accountDTO.getAccount());
        if(accounts.isEmpty()){
            throw new RuntimeException("Account not found");
        }


//      make relationship
        for(OnboardingAccountEntity account : accounts){
//            check this account already assigned or not
            if(!user.getOnboardingAccountEntities().contains(account)){
              user.getOnboardingAccountEntities().add(account);
              account.getUsers().add(user);
            }
        }
//        save DB
        userRepository.save(user);
    }
}