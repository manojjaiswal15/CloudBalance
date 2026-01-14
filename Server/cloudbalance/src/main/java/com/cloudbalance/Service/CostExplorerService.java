package com.cloudbalance.Service;

import com.cloudbalance.DTO.CostExplorer.ResponseAllCostAccountDTO;
import com.cloudbalance.DTO.CostExplorer.ResponseGetAllAccountIdDTO;
import com.snowflake.snowpark.DataFrame;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CostExplorerService {

    @Autowired
    private Session session;
//by default
    public List<ResponseAllCostAccountDTO> getAllAccountByFilter(String type, LocalDate start, LocalDate end,Long accountid) {
        String query = String.format("""
                select  to_char(date_trunc('MONTH',bill_date),'MM-YYYY') as date,
                %s,
                sum(cost) as total
                FROM cloudbalance.public.cloudbalance
                WHERE bill_date >= '%s'
                      AND bill_date <= '%s'
                      AND account_id= '%s'
                    GROUP BY %s,date
                    ORDER BY date;
            """, type,start,end,accountid,type);
        Row[] rows = session.sql(query).collect();

        Map<String, ResponseAllCostAccountDTO> grouped = new LinkedHashMap<>();

        for (Row row : rows) {
            String month = row.getString(0);   // 02-2025
            String filter = row.getString(1);  // AWS Lambda, Amazon EC2
            Long cost = row.getLong(2);

            grouped.putIfAbsent(filter,
                    new ResponseAllCostAccountDTO(filter, new LinkedHashMap<>()));

            ResponseAllCostAccountDTO dto = grouped.get(filter);
            dto.getMonthCost().put(month, cost);
        }

        return new ArrayList<>(grouped.values());
    }


//this is filter and group
    public List<ResponseAllCostAccountDTO> getAccountByFilterAndType(String groupby,List<String> subType,LocalDate start, LocalDate end,Long accountid) {
        String inClause = subType.stream()
                .map(v -> "'" + v.replace("'", "''") + "'")
                .collect(Collectors.joining(","));

        String sql=String.format("""
                select to_char(date_trunc('MONTH',bill_date),'MM-YYYY') as date,
                %s,
               sum(cost) as total
                FROM cloudbalance.public.cloudbalance
                 WHERE bill_date >= '%s'
                      AND bill_date <= '%s' AND 
                     %s IN (%s)
                      AND account_id='%s'
                group by date,%s;
                """,
                groupby,start,end,groupby,inClause,accountid,groupby);
        DataFrame df=session.sql(sql);
        Row[] rows=df.collect();
        Map<String, ResponseAllCostAccountDTO> grouped = new LinkedHashMap<>();

        for (Row row : rows) {
            String month = row.getString(0);   // 02-2025
            String filter = row.getString(1);  // AWS Lambda, Amazon EC2
            Long cost = row.getLong(2);

            grouped.putIfAbsent(filter,
                    new ResponseAllCostAccountDTO(filter, new LinkedHashMap<>()));

            ResponseAllCostAccountDTO dto = grouped.get(filter);
            dto.getMonthCost().put(month, cost);
        }

        return new ArrayList<>(grouped.values());
    }


    //    filter wise
    public Set<String> getSubFilterName(String filter){
        DataFrame df=session.sql(String.format("""
                select %s from cloudbalance.public.cloudbalance
                group by %s;
                """,filter,filter));
        Row[] rows=df.collect();
        Set<String> subfilters=new HashSet<>();
        for(Row row : rows){
            subfilters.add(row.getString(0));
        }
        return subfilters;
    }

// get all accountid
    public ResponseGetAllAccountIdDTO getAllAccount() {

    Row[] rows = session.sql("""
        select account_id
        from cloudbalance.public.cloudbalance
        group by account_id
    """).collect();

    List<Long> accountIds = new ArrayList<>();

    for (Row row : rows) {
        accountIds.add(row.getLong(0));
    }

    return new ResponseGetAllAccountIdDTO(accountIds);
}

}