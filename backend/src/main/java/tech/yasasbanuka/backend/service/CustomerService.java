package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.CustomerDTO;
import java.util.List;

public interface CustomerService {
    void createCustomer(CustomerDTO customerDTO);
    void updateCustomer(CustomerDTO customerDTO);
    void deleteCustomer(Long id);
    CustomerDTO getCustomer(Long identity);
    CustomerDTO getCustomerByName(String name);
    List<CustomerDTO> getAllCustomers();
}
