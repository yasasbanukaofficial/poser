package tech.yasasbanuka.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.Item;

import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item, Long> {
    Optional<Item> findByName(String name);
}