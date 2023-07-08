package com.example.webapplicationexample.exception;

public class ProductNotInStock extends RuntimeException {

    public ProductNotInStock() {
    }

    public ProductNotInStock(String message) {
        super(message);
    }
}
