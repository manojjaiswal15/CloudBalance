package com.cloudbalance.DTO.costExplorer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResponseGetAllAccountIdDTO {
    private List<Long> accountid;
}
