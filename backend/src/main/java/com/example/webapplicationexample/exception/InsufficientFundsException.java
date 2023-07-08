package com.example.webapplicationexample.exception;

/**
 * Выскакивет при недодостатке средств
 */
public class InsufficientFundsException extends RuntimeException{
    public InsufficientFundsException() {
    }

    public InsufficientFundsException(String message) {
        super(message);
    }
}
