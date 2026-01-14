package com.cloudbalance.Utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import com.snowflake.snowpark.Session;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class SnowUtils {

    @Value("${snowflake.url}")
    private String url;

    @Value("${snowflake.user}")
    private String user;

    @Value("${snowflake.role}")
    private String role;

    @Value("${snowflake.db}")
    private String db;

    @Value("${snowflake.schema}")
    private String schema;
    @Value("${snowflake.password}")
    private String password;

    @Bean
    public Session creationSession() {
        Map<String, String> properties = new HashMap<>();
        properties.put("URL", url);
        properties.put("USER", user);
        properties.put("PASSWORD",password);
        properties.put("ROLE", role);
        properties.put("DB", db);
        properties.put("SCHEMA", schema);

        return Session.builder()
                .configs(properties)
                .create();
    }


}
