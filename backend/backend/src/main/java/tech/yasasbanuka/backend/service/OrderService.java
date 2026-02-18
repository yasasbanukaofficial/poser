package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.OrderDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getOrdersByCustomerId(Long customerId);
    List<OrderDTO> getOrdersByDateRange(LocalDateTime start, LocalDateTime end);
    OrderDTO updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
}
