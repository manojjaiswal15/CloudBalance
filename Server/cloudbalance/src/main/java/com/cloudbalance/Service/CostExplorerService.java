package com.cloudbalance.Service;

import com.cloudbalance.DTO.CostExplorer.ResponseAllCostAccountDTO;
import com.cloudbalance.DTO.CostExplorer.ResponseGetALLAccountDTO;
import com.snowflake.snowpark.DataFrame;
import com.snowflake.snowpark.Row;
import com.snowflake.snowpark.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class CostExplorerService {

    @Autowired
    private Session session;




    public List<ResponseAllCostAccountDTO> getAllAccountByFilter(String groupBy) {
        String sql = String.format("""
        SELECT %s,
               SUM(CASE WHEN TO_CHAR(bill_date, 'YYYY-MM') = '2025-01' THEN cost ELSE 0 END) AS jan_2025,
               SUM(CASE WHEN TO_CHAR(bill_date, 'YYYY-MM') = '2025-02' THEN cost ELSE 0 END) AS feb_2025,
               SUM(CASE WHEN TO_CHAR(bill_date, 'YYYY-MM') = '2025-03' THEN cost ELSE 0 END) AS mar_2025,
               SUM(CASE WHEN TO_CHAR(bill_date, 'YYYY-MM') = '2025-04' THEN cost ELSE 0 END) AS apr_2025,
               SUM(CASE WHEN TO_CHAR(bill_date, 'YYYY-MM') = '2025-05' THEN cost ELSE 0 END) AS may_2025,
               SUM(cost) AS total
        FROM cloudbalance.public.cloudbalance
        GROUP BY %s
        ORDER BY total DESC
    """, groupBy, groupBy);

        DataFrame df = session.sql(sql);
        Row[] rows = df.collect();
        List<ResponseAllCostAccountDTO> result = new ArrayList<>();
        for (Row row : rows) {
            result.add(new ResponseAllCostAccountDTO(
                    row.getString(0),  // group value
                    row.getLong(1),    // jan
                    row.getLong(2),    // feb
                    row.getLong(3),    // mar
                    row.getLong(4),    // apr
                    row.getLong(5),    // may
                    row.getLong(6)     // total
            ));
        }
        return result;
    }

//    this is for subtype and type for get data
public List<ResponseAllCostAccountDTO> getAccountByFilterAndType(String groupBy,List<String> subType){

    String inClause = subType.stream()
            .map(v -> "'" + v.replace("'", "''") + "'")
            .collect(Collectors.joining(","));


    DataFrame df=session.sql(String.format("""
    SELECT %s,
           SUM(CASE WHEN TO_CHAR(bill_date,'YYYY-MM')='2025-01' THEN cost ELSE 0 END) AS jan_2025,
           SUM(CASE WHEN TO_CHAR(bill_date,'YYYY-MM')='2025-02' THEN cost ELSE 0 END) AS feb_2025,
           SUM(CASE WHEN TO_CHAR(bill_date,'YYYY-MM')='2025-03' THEN cost ELSE 0 END) AS mar_2025,
           SUM(CASE WHEN TO_CHAR(bill_date,'YYYY-MM')='2025-04' THEN cost ELSE 0 END) AS apr_2025,
           SUM(CASE WHEN TO_CHAR(bill_date,'YYYY-MM')='2025-05' THEN cost ELSE 0 END) AS may_2025,
           SUM(cost) AS total
    FROM cloudbalance.public.cloudbalance
    WHERE %s IN (%s)
    GROUP BY %s
    ORDER BY total DESC
    """,
                groupBy,        // SELECT %s
                groupBy,        // WHERE %s
                inClause,       // IN (%s)
                groupBy         // GROUP BY %s
    ));
        Row[] rows=df.collect();
        List<ResponseAllCostAccountDTO> result=new ArrayList<>();
        for(Row row:rows){
            result.add(new ResponseAllCostAccountDTO(
                    row.getString(0),  // group value
                    row.getLong(1),    // jan
                    row.getLong(2),    // feb
                    row.getLong(3),    // mar
                    row.getLong(4),    // apr
                    row.getLong(5),    // may
                    row.getLong(6)     // total
            ));
        }
        return result;
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

//    this is for get all account
public ResponseGetALLAccountDTO getAllAccount() {

    Row[] rows = session.sql("""
        select account_id 
        from cloudbalance.public.cloudbalance 
        group by account_id
    """).collect();

    List<Long> accountIds = new ArrayList<>();

    for (Row row : rows) {
        accountIds.add(row.getLong(0));
    }

    return new ResponseGetALLAccountDTO(accountIds);
}

}