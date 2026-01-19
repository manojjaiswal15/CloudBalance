package com.cloudbalance.DTO.onboarding;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RequestAddAccountDTO {
    @NotBlank(message = "Arn cannot be blank")
    @Size(min = 10 , max = 20, message = "Arn must be between 10 and 20 characters")
    private String arn;
    @NotBlank(message = "Account Name cannot be blank")
    @Size(min = 5, max = 20, message = "Account Name must be between 5 and 20 characters")
    private String accountName;
    @NotNull(message = "Account Id cannot be blank")
    @Min(10)
    private Long accountId;
}
