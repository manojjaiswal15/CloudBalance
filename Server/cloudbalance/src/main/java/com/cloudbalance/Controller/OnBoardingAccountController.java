package com.cloudbalance.Controller;


import com.cloudbalance.DTO.Onboarding.AccountAssignDTO;
import com.cloudbalance.DTO.Onboarding.RequestAddAccountDTO;
import com.cloudbalance.DTO.Onboarding.ResponseAddAccountDTO;
import com.cloudbalance.Service.OnBoardingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/onboarding")
public class OnBoardingAccountController {

    @Autowired
    private OnBoardingAccountService onBoardingAccountService;

    @PostMapping("/add")
    public ResponseEntity<ResponseAddAccountDTO> addAccount(@RequestBody RequestAddAccountDTO requestAddAccountDTO){
        return new ResponseEntity<>(onBoardingAccountService.addAccount(requestAddAccountDTO),HttpStatus.CREATED);
    }

    @GetMapping("/allaccounts")
    public ResponseEntity<List<ResponseAddAccountDTO>> getAllAccount(){
        return new ResponseEntity<>(onBoardingAccountService.getAllAccount(),HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getAllAssignAccountPerUser(@PathVariable Long id){
        return  new ResponseEntity<>(onBoardingAccountService.getAllAssignAccountPerUser(id),HttpStatus.OK);
    }


}
