package com.cloudbalance.controller;

import com.cloudbalance.dto.costExplorer.ResponseAllCostAccountDTO;
import com.cloudbalance.dto.costExplorer.ResponseGetAllAccountIdDTO;
import com.cloudbalance.service.CostExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/cost")
public class CostExplorerController {

    @Autowired
    private CostExplorerService costExplorerService;

    @GetMapping("/all")
    public ResponseEntity<List<ResponseAllCostAccountDTO>> getAllAccountByFilter(@RequestParam String groupby, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end, @RequestParam Long accountid) {
        return new ResponseEntity<>(costExplorerService.getAllAccountByFilter(groupby,start,end,accountid),HttpStatus.OK);
    }

    @GetMapping("/group")
    public ResponseEntity<List<ResponseAllCostAccountDTO>> getAccountByFilterAndType(@RequestParam String groupby, @RequestParam List<String> subtype, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,@RequestParam Long accountid) {
        return new ResponseEntity<>(costExplorerService.getAccountByFilterAndType(groupby,subtype,start,end,accountid),HttpStatus.OK);
    }

    @GetMapping("/filters")
    public  ResponseEntity<Set<String>> getSubFilterName(@RequestParam String filter){
        return new ResponseEntity<>(costExplorerService.getSubFilterName(filter),HttpStatus.OK);
    }

    @GetMapping("/allaccounts")
    public ResponseEntity<ResponseGetAllAccountIdDTO> getAllAccount(){
        return new ResponseEntity<>(costExplorerService.getAllAccount(),HttpStatus.OK);
    }

}
