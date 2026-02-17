package tech.yasasbanuka.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.Customer;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Optional<Customer> findByName(String name);
}
