package com.cloudbalance.Exception;

import com.cloudbalance.DTO.Error.ErrorResponseDTO;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), ex.getStatus().value()), ex.getStatus());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadCredentials(BadCredentialsException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("Invalid credentials", 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponseDTO> handleJwtException(JwtException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("JWT Expired Token", 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("Internal server error", 500), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
