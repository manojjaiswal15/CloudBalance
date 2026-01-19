package com.cloudbalance.Controller;


import com.cloudbalance.DTO.onboarding.RequestAddAccountDTO;
import com.cloudbalance.DTO.onboarding.ResponseAddAccountDTO;
import com.cloudbalance.service.OnBoardingAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/onboarding")
@Validated
public class OnBoardingAccountController {

    @Autowired
    private OnBoardingAccountService onBoardingAccountService;

    @PostMapping("/add")
    public ResponseEntity<ResponseAddAccountDTO> addAccount(@Valid  @RequestBody RequestAddAccountDTO requestAddAccountDTO){
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

    @GetMapping("/assignaccount/{id}")
    public ResponseEntity<?> getAllAssignAccountCustomerRole(@PathVariable Long id) {
        return new ResponseEntity<>(onBoardingAccountService.getAllAssignAccountCustomerRole(id), HttpStatus.OK);
    }

}
