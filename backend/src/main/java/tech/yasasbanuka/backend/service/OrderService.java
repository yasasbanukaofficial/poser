package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.OrderDTO;

import java.time.OffsetDateTime;
import java.util.List;

public interface OrderService {
    void createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getOrdersByCustomerId(Long customerId);
    List<OrderDTO> getOrdersByDateRange(OffsetDateTime start, OffsetDateTime end);
    OrderDTO updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
}
