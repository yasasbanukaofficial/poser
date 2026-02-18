package tech.yasasbanuka.backend.service.impl;

import io.github.yasasbanukaofficial.MiniModelMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.entity.Order;
import tech.yasasbanuka.backend.entity.OrderDetails;
import tech.yasasbanuka.backend.repository.CustomerRepo;
import tech.yasasbanuka.backend.repository.ItemRepo;
import tech.yasasbanuka.backend.repository.OrderRepo;
import tech.yasasbanuka.backend.service.OrderService;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepo orderRepo;
    private final CustomerRepo customerRepo;
    private final ItemRepo itemRepo;
    private final MiniModelMapper miniModelMapper;
    @Override
    public void createOrder(OrderDTO orderDTO) {
        Customer customer = customerRepo.findById(orderDTO.getCustomerId()).orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
        
        Order order = miniModelMapper.map(orderDTO, Order.class);
        order.setCustomer(customer);

        List<OrderDetails> orderDetailsList = orderDTO.getOrderDetails().stream().map(orderDetailsDTO -> {
            OrderDetails orderDetails = miniModelMapper.map(orderDetailsDTO, OrderDetails.class);
            orderDetails.setOrder(order);
            Item item = itemRepo.findById(orderDetailsDTO.getItemId()).orElseThrow(() -> new RuntimeException("Item not found with id: " + orderDetailsDTO.getItemId()));
            
            if (item.getQty() < orderDetailsDTO.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }
            item.setQty(item.getQty() - orderDetailsDTO.getQty());
            itemRepo.save(item);
            
            orderDetails.setItems(item);
            return orderDetails;
        }).toList();

        order.setOrderDetails(orderDetailsList);
        orderRepo.save(order);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order Not found"));
        return miniModelMapper.map(order, OrderDTO.class);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(order -> miniModelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        return orderRepo.findByCustomer_Id(customerId).stream()
                .map(order -> miniModelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public List<OrderDTO> getOrdersByDateRange(OffsetDateTime start, OffsetDateTime end) {
        return orderRepo.findByOrderDateBetween(start, end).stream()
                .map(order -> miniModelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order existingOrder = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        existingOrder.getOrderDetails().forEach(oldDetail -> {
            Item item = oldDetail.getItems();
            item.setQty(item.getQty() + oldDetail.getQty());
            itemRepo.save(item);
        });

        if (!existingOrder.getCustomer().getId().equals(orderDTO.getCustomerId())) {
            Customer newCustomer = customerRepo.findById(orderDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
            existingOrder.setCustomer(newCustomer);
        }

        existingOrder.setOrderDate(orderDTO.getOrderDate());

        List<OrderDetails> newOrderDetails = orderDTO.getOrderDetails().stream().map(detailDTO -> {
            OrderDetails orderDetail = miniModelMapper.map(detailDTO, OrderDetails.class);
            orderDetail.setOrder(existingOrder);

            Item item = itemRepo.findById(detailDTO.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + detailDTO.getItemId()));

            if (item.getQty() < detailDTO.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }

            item.setQty(item.getQty() - detailDTO.getQty());
            itemRepo.save(item);

            orderDetail.setItems(item);
            return orderDetail;
        }).toList();

        existingOrder.getOrderDetails().clear();
        existingOrder.getOrderDetails().addAll(newOrderDetails);
        Order savedOrder = orderRepo.save(existingOrder);

        return miniModelMapper.map(savedOrder, OrderDTO.class);
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot delete. Order not found with ID: " + id));

        order.getOrderDetails().forEach(detail -> {
            Item item = detail.getItems();
            item.setQty(item.getQty() + detail.getQty());
            itemRepo.save(item);
        });

        order.getOrderDetails().clear();
        orderRepo.delete(order);
    }
}
