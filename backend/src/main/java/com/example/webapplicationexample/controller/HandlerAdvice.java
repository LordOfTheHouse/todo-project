package com.example.webapplicationexample.controller;
import com.example.webapplicationexample.exception.AccountNotDefined;
import com.example.webapplicationexample.exception.InsufficientFundsException;
import com.example.webapplicationexample.exception.ProductNotInStock;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
/**
 * Определение ситуации с недостатком средств
 */
@Slf4j
@RestControllerAdvice
@CrossOrigin(origins = "*", maxAge = 3600)
public class HandlerAdvice {
    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<?> handleInsufficientExceptions(InsufficientFundsException ex) {
        return  ResponseEntity.badRequest().body(ex.getMessage());
    }
    @ExceptionHandler(AccountNotDefined.class)
    public ResponseEntity<?> handleAccountNotDefinedExceptions(AccountNotDefined ex) {
        return  ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(ProductNotInStock.class)
    public ResponseEntity<?> productNotInStockException(ProductNotInStock ex) {
        return  ResponseEntity.badRequest().body(ex.getMessage());
    }
}
