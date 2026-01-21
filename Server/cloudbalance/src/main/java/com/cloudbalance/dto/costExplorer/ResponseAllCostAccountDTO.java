package com.cloudbalance.dto.costExplorer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAllCostAccountDTO {

    private String type;
    private Map<String, Long> monthCost;

}

