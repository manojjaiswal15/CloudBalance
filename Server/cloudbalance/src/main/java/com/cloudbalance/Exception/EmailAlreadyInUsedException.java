package com.cloudbalance.Exception;

public class EmailAlreadyInUsedException extends RuntimeException{
    public EmailAlreadyInUsedException(String message) {
        super(message);
    }
}
