package tech.yasasbanuka.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDTO {
    private Long id;

    @NotBlank(message = "Customer name cannot be blank")
    private String name;

    @NotBlank(message = "Customer address cannot be blank")
    @Size(min = 10, message = "Customer address should be at least 10 characters long")
    private String address;
}