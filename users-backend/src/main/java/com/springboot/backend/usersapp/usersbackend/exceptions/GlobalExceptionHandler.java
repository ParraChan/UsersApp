package com.springboot.backend.usersapp.usersbackend.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        String message = ex.getMessage();
        Map<String, String> errors = new HashMap<>();

        if (message.contains("correo")) {
            errors.put("email", message);
        } else if (message.contains("usuario")) {
            errors.put("username", message);
        } else {
            errors.put("error", message);
        }

        return ResponseEntity.badRequest().body(errors);
    }
}