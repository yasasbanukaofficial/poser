package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.CustomerDTO;
import tech.yasasbanuka.backend.service.CustomerService;
import tech.yasasbanuka.backend.util.APIResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping
    ResponseEntity<APIResponse<String>> createCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customer created successfully", null), HttpStatus.CREATED);
    }

    @PutMapping()
    ResponseEntity<APIResponse<String>> updateCustomer(@RequestBody CustomerDTO customerDTO) {
        CustomerDTO existingCustomer = customerService.getCustomer(customerDTO.getId());
        customerDTO.setId(existingCustomer.getId());
        customerService.updateCustomer(customerDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customer updated successfully", null), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<APIResponse<String>> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customer deleted successfully", null), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<APIResponse<CustomerDTO>> getCustomer(@PathVariable Long id) {
        CustomerDTO customer = customerService.getCustomer(id);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customer retrieved successfully", customer), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<APIResponse<List<CustomerDTO>>> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Customers retrieved successfully", customers), HttpStatus.OK);
    }

}
