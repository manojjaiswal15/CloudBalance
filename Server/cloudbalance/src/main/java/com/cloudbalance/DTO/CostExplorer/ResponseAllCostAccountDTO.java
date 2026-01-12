package com.cloudbalance.DTO.CostExplorer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAllCostAccountDTO {
    private String type;

    private Long jan2025;
    private Long feb2025;
    private Long mar2025;
    private Long apr2025;
    private Long may2025;
    private Long total;
}
