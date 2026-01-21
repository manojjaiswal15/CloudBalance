package com.cloudbalance.exception;

import com.cloudbalance.dto.error.ErrorResponseDTO;
import io.jsonwebtoken.JwtException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), ex.getStatus().value()), ex.getStatus());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadCredentials(BadCredentialsException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO( ex.getMessage(), 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponseDTO> handleJwtException(JwtException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("JWT Expired Token", 401), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponseDTO> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), 400), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyInUsedException.class)
    public ResponseEntity<ErrorResponseDTO> handleEmailAlreadyInUsedException(EmailAlreadyInUsedException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), 409), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), 404), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler( NoSuchElementException.class)
    public ResponseEntity<ErrorResponseDTO> handleNoSuchElementException(NoSuchElementException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), 401), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        Map<String,String> response=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error->response.put(((FieldError) error).getField(),error.getDefaultMessage()));
        return new ResponseEntity<>(new ErrorResponseDTO("Validation failed: " + response, 400), HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleConstraintViolationException(ConstraintViolationException ex){
        return new ResponseEntity<>(new ErrorResponseDTO("Validation failed: " + ex.getMessage(), 400), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex){
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(),400),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NullPointerException.class)
    public  ResponseEntity<ErrorResponseDTO> handleNullPointerException(NullPointerException ex){
        return new ResponseEntity<>(new ErrorResponseDTO("Some null pointer exception occured "+ ex.getMessage(), 400), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<ErrorResponseDTO> handleNumberFormatException(NumberFormatException ex){
        return new ResponseEntity<>(new ErrorResponseDTO( ex.getMessage(), 400), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(new ErrorResponseDTO("Internal server error"+ ex.getMessage(), 500), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
