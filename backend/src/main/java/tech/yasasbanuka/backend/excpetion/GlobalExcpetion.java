package tech.yasasbanuka.backend.excpetion;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tech.yasasbanuka.backend.util.APIResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExcpetion {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<APIResponse<String>> handleCustomException(CustomException ex) {
        return new ResponseEntity<>(
                new APIResponse<>(false, 400, ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse<String>> handleOtherExceptions(Exception ex) {
        return new ResponseEntity<>(
                new APIResponse<>(false, 500, "Internal Server Error: " + ex.getMessage(), null),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<APIResponse<String>> handleNullPointer(NullPointerException e) {
        return new ResponseEntity<>(new APIResponse<>(false, HttpStatus.BAD_REQUEST.value(), e.getMessage(), null), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    public ResponseEntity<APIResponse<String>> handleNotFoundException(ChangeSetPersister.NotFoundException ex) {
        return new ResponseEntity<>(new APIResponse<>(
                false,
                HttpStatus.NOT_FOUND.value(),
                "Resource Not Found",
                ex.getMessage()
        ),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String , String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            errors.put(error.getDefaultMessage(), error.getCode());
        });
        return new ResponseEntity<>(new APIResponse<>(
                false,
                HttpStatus.BAD_REQUEST.value(),
                "Validation Error",
                errors
        ),HttpStatus.BAD_REQUEST);
    }

}
