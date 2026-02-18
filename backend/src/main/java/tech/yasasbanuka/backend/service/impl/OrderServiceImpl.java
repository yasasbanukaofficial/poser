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

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        return orderRepo.findAll().stream()
                .map(order -> {
                    OrderDTO orderDTO = new OrderDTO();
                    orderDTO.setId(order.getId());
                    orderDTO.setCustomerId(order.getCustomer().getId());
                    orderDTO.setOrderDate(order.getOrderDate());
                    orderDTO.setOrderDetails(order.getOrderDetails().stream()
                            .map(details -> {
                                OrderDetailsDTO detailsDTO = new OrderDetailsDTO();
                                detailsDTO.setId(details.getId());
                                detailsDTO.setItemId(details.getItems().getId());
                                detailsDTO.setQty(details.getQty());
                                detailsDTO.setPrice(details.getPrice());
                                return detailsDTO;
                            }).toList());
                    return orderDTO;
                }).toList();
    }

    @Override
    public List<OrderDTO> getOrdersByCustomerId(Long customerId) {
        return List.of();
    }

    @Override
    public List<OrderDTO> getOrdersByDateRange(OffsetDateTime start, OffsetDateTime end) {
        return orderRepo.findByOrderDateBetween(start, end).stream()
                .map(order -> {
                    OrderDTO orderDTO = new OrderDTO();
                    orderDTO.setId(order.getId());
                    orderDTO.setCustomerId(order.getCustomer().getId());
                    orderDTO.setOrderDate(order.getOrderDate());
                    orderDTO.setOrderDetails(order.getOrderDetails().stream()
                            .map(details -> {
                                OrderDetailsDTO detailsDTO = new OrderDetailsDTO();
                                detailsDTO.setId(details.getId());
                                detailsDTO.setItemId(details.getItems().getId());
                                detailsDTO.setQty(details.getQty());
                                detailsDTO.setPrice(details.getPrice());
                                return detailsDTO;
                            }).collect(Collectors.toList()));
                    return orderDTO;
                }).collect(Collectors.toList());
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order existingOrder = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        if (!existingOrder.getCustomer().getId().equals(orderDTO.getCustomerId())) {
            Customer newCustomer = customerRepo.findById(orderDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getCustomerId()));
            existingOrder.setCustomer(newCustomer);
        }

        existingOrder.setOrderDate(orderDTO.getOrderDate());

        existingOrder.getOrderDetails().forEach(detail -> {
            Item item = detail.getItems();
            item.setQty(item.getQty() + detail.getQty());
            itemRepo.save(item);
        });

        List<OrderDetails> newOrderDetails = new ArrayList<>();
        for (OrderDetailsDTO detailDTO : orderDTO.getOrderDetails()) {
            Item item = itemRepo.findById(detailDTO.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + detailDTO.getItemId()));

            if (item.getQty() < detailDTO.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }

            item.setQty(item.getQty() - detailDTO.getQty());
            itemRepo.save(item);

            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setItems(item);
            orderDetail.setOrder(existingOrder);
            orderDetail.setQty(detailDTO.getQty());
            orderDetail.setPrice(detailDTO.getPrice());
            newOrderDetails.add(orderDetail);
        }

        existingOrder.getOrderDetails().clear();
        existingOrder.getOrderDetails().addAll(newOrderDetails);
        Order savedOrder = orderRepo.save(existingOrder);

        OrderDTO responseDTO = new OrderDTO();
        responseDTO.setId(savedOrder.getId());
        responseDTO.setCustomerId(savedOrder.getCustomer().getId());
        responseDTO.setOrderDate(savedOrder.getOrderDate());
        responseDTO.setOrderDetails(savedOrder.getOrderDetails().stream()
                .map(details -> {
                    OrderDetailsDTO detailsDTO = new OrderDetailsDTO();
                    detailsDTO.setId(details.getId());
                    detailsDTO.setItemId(details.getItems().getId());
                    detailsDTO.setQty(details.getQty());
                    detailsDTO.setPrice(details.getPrice());
                    return detailsDTO;
                }).collect(Collectors.toList()));

        return responseDTO;
    }

    @Override
    public void deleteOrder(Long id) {

    }
}
