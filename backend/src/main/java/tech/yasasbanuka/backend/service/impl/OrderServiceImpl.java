package tech.yasasbanuka.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;
    @Override
    public void createOrder(OrderDTO orderDTO) {
        Customer customer = customerRepo.findById(orderDTO.getCustomerId()).orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
        
        Order order = modelMapper.map(orderDTO, Order.class);
        order.setCustomer(customer);

        List<OrderDetails> orderDetailsList = orderDTO.getOrderDetails().stream().map(orderDetailsDTO -> {
            OrderDetails orderDetails = modelMapper.map(orderDetailsDTO, OrderDetails.class);
            orderDetails.setOrder(order);
            Item item = itemRepo.findById(orderDetailsDTO.getItemId()).orElseThrow(() -> new RuntimeException("Item not found with id: " + orderDetailsDTO.getItemId()));
            
            // Reduce item quantity
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
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        return orderRepo.findByCustomer_Id(customerId).stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public List<OrderDTO> getOrdersByDateRange(OffsetDateTime start, OffsetDateTime end) {
        return orderRepo.findByOrderDateBetween(start, end).stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order existingOrder = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        // Restore quantities from old order details
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
            OrderDetails orderDetail = modelMapper.map(detailDTO, OrderDetails.class);
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

        return modelMapper.map(savedOrder, OrderDTO.class);
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot delete. Order not found with ID: " + id));
        
        // Restore item quantities
        order.getOrderDetails().forEach(detail -> {
            Item item = detail.getItems();
            item.setQty(item.getQty() + detail.getQty());
            itemRepo.save(item);
        });
        
        orderRepo.deleteById(id);
    }
}
