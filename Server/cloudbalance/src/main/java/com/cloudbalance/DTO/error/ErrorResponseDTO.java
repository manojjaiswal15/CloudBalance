package com.cloudbalance.DTO.error;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponseDTO {
    private String message;
    private int status;

}
