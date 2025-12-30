package com.cloudbalance.config;

import com.cloudbalance.Utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class CustomJWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
       try{
           String header= request.getHeader("Authorization");
           if(header!=null && header.startsWith("Bearer")){
               String token=header.substring(7);
               String email=jwtUtil.extractUsername(token);
               if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                   UserDetails user=userDetailsService.loadUserByUsername(email);
                   UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                   SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
               }
           }
       } catch (Exception e) {
           handlerExceptionResolver.resolveException(request,response,null,e);
           return;
       }
        filterChain.doFilter(request,response);
    }
}
