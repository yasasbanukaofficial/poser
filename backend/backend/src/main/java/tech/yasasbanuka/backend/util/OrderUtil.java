package tech.yasasbanuka.backend.util;

import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.dto.OrderDetailsDTO;
import tech.yasasbanuka.backend.entity.Order;
import tech.yasasbanuka.backend.entity.OrderDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderUtil {

    public static OrderDTO toDTO(Order order) {
        if (order == null) {
            return null;
        }

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate());

        if (order.getCustomer() != null) {
            dto.setCustomerId(order.getCustomer().getId());
            dto.setCustomerName(order.getCustomer().getName());
        }

        if (order.getOrderDetails() != null) {
            List<OrderDetailsDTO> detailsDTOs = order.getOrderDetails().stream()
                    .map(OrderUtil::toOrderDetailsDTO)
                    .collect(Collectors.toList());
            dto.setOrderDetails(detailsDTOs);

            // Calculate total amount
            double total = order.getOrderDetails().stream()
                    .mapToDouble(detail -> detail.getPrice() * detail.getQuantity())
                    .sum();
            dto.setTotalAmount(total);
        } else {
            dto.setOrderDetails(new ArrayList<>());
            dto.setTotalAmount(0.0);
        }

        return dto;
    }

    public static OrderDetailsDTO toOrderDetailsDTO(OrderDetails orderDetails) {
        if (orderDetails == null) {
            return null;
        }

        OrderDetailsDTO dto = new OrderDetailsDTO();
        dto.setId(orderDetails.getId());
        dto.setPrice(orderDetails.getPrice());
        dto.setQuantity(orderDetails.getQuantity());

        if (orderDetails.getItems() != null) {
            dto.setItemId(orderDetails.getItems().getId());
            dto.setItemName(orderDetails.getItems().getName());
        }

        return dto;
    }

    public static List<OrderDTO> toDTOList(List<Order> orders) {
        if (orders == null) {
            return new ArrayList<>();
        }
        return orders.stream()
                .map(OrderUtil::toDTO)
                .collect(Collectors.toList());
    }
}
