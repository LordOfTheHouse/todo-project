package com.example.webapplicationexample.exception;

/**
 * Аккаунта не существует
 */
public class AccountNotDefined extends RuntimeException{
    public AccountNotDefined() {
    }

    public AccountNotDefined(String message) {
        super(message);
    }
}
