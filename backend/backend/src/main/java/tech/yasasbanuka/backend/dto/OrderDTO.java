package tech.yasasbanuka.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {
    private Long id;
    private LocalDateTime orderDate;
    private Long customerId;
    private String customerName;
    private List<OrderDetailsDTO> orderDetails;
    private double totalAmount;
}
