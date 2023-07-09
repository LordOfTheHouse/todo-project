package com.example.webapplicationexample.controller;

import com.example.webapplicationexample.exception.UserNotFound;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Обработка исключительных ситуаций с пользователем
 */
@Slf4j
@RestControllerAdvice
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserExceptionHandler {
    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<?> handleInsufficientExceptions(UserNotFound ex) {
        return  ResponseEntity.badRequest().body(ex.getMessage());
    }
}
