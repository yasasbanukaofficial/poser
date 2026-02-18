package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.service.OrderService;
import tech.yasasbanuka.backend.util.APIResponse;

import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Validated
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    ResponseEntity<APIResponse<String>> createOrder(@Valid @RequestBody OrderDTO orderDTO) {
        orderService.createOrder(orderDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 201, "Order created successfully", null), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<APIResponse<List<OrderDTO>>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Orders retrieved successfully", orders), HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<APIResponse<List<OrderDTO>>> getOrdersByCustomerId(@PathVariable Long customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customer orders retrieved successfully", orders), HttpStatus.OK);
    }

    @GetMapping("/date-range")
    public ResponseEntity<APIResponse<List<OrderDTO>>> getOrdersByDateRange(
            @RequestParam OffsetDateTime start,
            @RequestParam OffsetDateTime end) {
        List<OrderDTO> orders = orderService.getOrdersByDateRange(start, end);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Orders retrieved successfully", orders), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse<OrderDTO>> updateOrder(@PathVariable Long id, @Valid @RequestBody OrderDTO orderDTO) {
        OrderDTO updatedOrder = orderService.updateOrder(id, orderDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Order updated successfully", updatedOrder), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<String>> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Order deleted successfully", null), HttpStatus.OK);
    }
}
