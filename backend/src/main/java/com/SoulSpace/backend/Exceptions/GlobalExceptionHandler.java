package com.SoulSpace.backend.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==========================================
    // BUSINESS / VALIDATION EXCEPTIONS
    // ==========================================
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(
            RuntimeException ex
    ) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage()
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // ==========================================
    // UNEXPECTED EXCEPTIONS
    // ==========================================
   @ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleException(Exception ex) {

    ex.printStackTrace();

    ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
            "Something went wrong. Please try again."
    );

    return new ResponseEntity<>(
            error,
            HttpStatus.INTERNAL_SERVER_ERROR
    );
}
}