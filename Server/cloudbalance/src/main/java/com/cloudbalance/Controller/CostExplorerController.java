package com.cloudbalance.Controller;

import com.cloudbalance.DTO.CostExplorer.ResponseAllCostAccountDTO;
import com.cloudbalance.DTO.CostExplorer.ResponseGetALLAccountDTO;
import com.cloudbalance.Service.CostExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/cost")
public class CostExplorerController {

    @Autowired
    private CostExplorerService costExplorerService;

    @GetMapping("/all")
    public ResponseEntity<List<ResponseAllCostAccountDTO>> getAllAccountByFilter(@RequestParam String groupby) {
        return new ResponseEntity<>(costExplorerService.getAllAccountByFilter(groupby),HttpStatus.OK);
    }

    @GetMapping("/group")
    public ResponseEntity<List<ResponseAllCostAccountDTO>> getAccountByFilterAndType(@RequestParam String groupby, @RequestParam List<String> subtype) {
        return new ResponseEntity<>(costExplorerService.getAccountByFilterAndType(groupby,subtype),HttpStatus.OK);
    }

    @GetMapping("/filters")
    public  ResponseEntity<Set<String>> getSubFilterName(@RequestParam String filter){
        return new ResponseEntity<>(costExplorerService.getSubFilterName(filter),HttpStatus.OK);
    }

    @GetMapping("/allaccounts")
    public ResponseEntity<ResponseGetALLAccountDTO> getAllAccount(){
        return new ResponseEntity<>(costExplorerService.getAllAccount(),HttpStatus.OK);
    }

}
