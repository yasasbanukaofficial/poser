package tech.yasasbanuka.backend.service.impl;

import io.github.yasasbanukaofficial.MiniModelMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.CustomerDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.repository.CustomerRepo;
import tech.yasasbanuka.backend.service.CustomerService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepo customerRepo;
    private final MiniModelMapper miniModelMapper;

    @Override
    public void createCustomer(CustomerDTO customerDTO) {
        customerRepo.save(miniModelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        customerRepo.save(miniModelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepo.deleteById(id);
    }

    @Override
    public CustomerDTO getCustomer(Long id) {
        Customer customer = customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Error when finding the customer using id"));
        return miniModelMapper.map(customer, CustomerDTO.class);
    }

    @Override
    public CustomerDTO getCustomerByName(String name) {
        Customer customer = customerRepo.findByName(name).orElseThrow(() -> new RuntimeException("Error when finding the customer using name"));
        return miniModelMapper.map(customer, CustomerDTO.class);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepo.findAll().stream().map(customer -> miniModelMapper.map(customer, CustomerDTO.class)).toList();
    }
}
