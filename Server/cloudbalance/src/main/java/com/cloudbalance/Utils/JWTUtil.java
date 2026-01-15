package com.cloudbalance.Utils;



import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTUtil {

    @Value("${jwt.secretKey}")
    private String jwtSecretKey;

    @Value("${jwt.expiration}")
    private  Long expireTime;

    public SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }




    public String generateToken(String username,String role){
        Map<String,Object> claims=new HashMap<>();
        claims.put("roles",role);
        claims.put("firstName",username);
        return Jwts.builder()
                .addClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expireTime))
                .signWith(getSecretKey())
                .compact();
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


}

