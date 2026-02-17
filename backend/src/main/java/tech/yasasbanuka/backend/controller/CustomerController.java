package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.CustomerDTO;
import tech.yasasbanuka.backend.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping
    void createCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.createCustomer(customerDTO);
    }
    @PutMapping()
    void updateCustomer(@RequestBody CustomerDTO customerDTO) {
        CustomerDTO existingCustomer = customerService.getCustomer(customerDTO.getId());
        customerDTO.setId(existingCustomer.getId());
        customerService.updateCustomer(customerDTO);
    }
    @DeleteMapping("/{id}")
    void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
    @GetMapping("/{id}")
    void getCustomer(@PathVariable Long id) {
        customerService.getCustomer(id);
    }
    @GetMapping
    List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

}
