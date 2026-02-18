package tech.yasasbanuka.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.dto.OrderDetailsDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.entity.Order;
import tech.yasasbanuka.backend.entity.OrderDetails;
import tech.yasasbanuka.backend.repository.CustomerRepo;
import tech.yasasbanuka.backend.repository.ItemRepo;
import tech.yasasbanuka.backend.repository.OrderRepo;
import tech.yasasbanuka.backend.service.OrderService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepo orderRepo;
    private final CustomerRepo customerRepo;
    private final ItemRepo itemRepo;
    @Override
    public void createOrder(OrderDTO orderDTO) {
        Customer customer = customerRepo.findById(orderDTO.getCustomerId()).orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate());
        order.setCustomer(customer);

        List<OrderDetails> orderDetailsList = new ArrayList<>();
        for (OrderDetailsDTO orderDetailsDTO: orderDTO.getOrderDetails()) {
            Item item = itemRepo.findById(orderDetailsDTO.getItemId()).orElseThrow(() -> new RuntimeException("Item not found with id: " + orderDetailsDTO.getItemId()));
            if (item.getQty() < orderDetailsDTO.getQty()){
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }
            item.setQty(item.getQty() - orderDetailsDTO.getQty());
            itemRepo.save(item);

            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setItems(item);
            orderDetails.setOrder(order);
            orderDetails.setQty(orderDetailsDTO.getQty());
            orderDetails.setPrice(orderDetailsDTO.getPrice());

            orderDetailsList.add(orderDetails);
        }
        order.setOrderDetails(orderDetailsList);
        orderRepo.save(order);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return null;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return List.of();
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        return List.of();
    }

    @Override
    public List<OrderDTO> getOrdersByDateRange(LocalDateTime start, LocalDateTime end) {
        return List.of();
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        return null;
    }

    @Override
    public void deleteOrder(Long id) {

    }
}
