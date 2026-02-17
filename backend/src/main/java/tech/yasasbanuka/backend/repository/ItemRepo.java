package tech.yasasbanuka.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.Item;

public interface ItemRepo extends JpaRepository<Item, Long> {
}
