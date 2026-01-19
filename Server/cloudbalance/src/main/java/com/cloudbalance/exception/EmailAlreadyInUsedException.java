package com.cloudbalance.exception;

public class EmailAlreadyInUsedException extends RuntimeException{
    public EmailAlreadyInUsedException(String message) {
        super(message);
    }
}
