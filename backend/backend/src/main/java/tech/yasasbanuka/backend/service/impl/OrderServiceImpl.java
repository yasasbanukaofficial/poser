package tech.yasasbanuka.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.dto.OrderDetailsDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.entity.Order;
import tech.yasasbanuka.backend.entity.OrderDetails;
import tech.yasasbanuka.backend.repository.CustomerRepository;
import tech.yasasbanuka.backend.repository.ItemRepository;
import tech.yasasbanuka.backend.repository.OrderRepository;
import tech.yasasbanuka.backend.service.OrderService;
import tech.yasasbanuka.backend.util.OrderUtil;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        // Validate customer exists
        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));

        // Create order entity
        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate() != null ? orderDTO.getOrderDate() : LocalDateTime.now());
        order.setCustomer(customer);
        order.setOrderDetails(new ArrayList<>());

        // Create order details
        if (orderDTO.getOrderDetails() != null) {
            for (OrderDetailsDTO detailDTO : orderDTO.getOrderDetails()) {
                Item item = itemRepository.findById(detailDTO.getItemId())
                        .orElseThrow(() -> new RuntimeException("Item not found with id: " + detailDTO.getItemId()));

                // Check stock availability
                if (item.getStock() < detailDTO.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for item: " + item.getName());
                }

                OrderDetails orderDetail = new OrderDetails();
                orderDetail.setPrice(detailDTO.getPrice());
                orderDetail.setQty(detailDTO.getQuantity());
                orderDetail.setItems(item);
                orderDetail.setOrder(order);

                order.getOrderDetails().add(orderDetail);

                // Update item stock
                item.setStock(item.getStock() - detailDTO.getQuantity());
                itemRepository.save(item);
            }
        }

        Order savedOrder = orderRepository.save(order);
        return OrderUtil.toDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return OrderUtil.toDTO(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return OrderUtil.toDTOList(orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        List<Order> orders = orderRepository.findByCustomer_Id(customerId);
        return OrderUtil.toDTOList(orders);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByDateRange(LocalDateTime start, LocalDateTime end) {
        List<Order> orders = orderRepository.findByOrderDateBetween(start, end);
        return OrderUtil.toDTOList(orders);
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        // Update order date if provided
        if (orderDTO.getOrderDate() != null) {
            order.setOrderDate(orderDTO.getOrderDate());
        }

        // Update customer if provided and different
        if (orderDTO.getCustomerId() != null && !orderDTO.getCustomerId().equals(order.getCustomer().getId())) {
            Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
            order.setCustomer(customer);
        }

        Order updatedOrder = orderRepository.save(order);
        return OrderUtil.toDTO(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        // Restore item stock before deleting order
        if (order.getOrderDetails() != null) {
            for (OrderDetails detail : order.getOrderDetails()) {
                Item item = detail.getItems();
                item.setStock(item.getStock() + detail.getQuantity());
                itemRepository.save(item);
            }
        }

        orderRepository.delete(order);
    }
}
