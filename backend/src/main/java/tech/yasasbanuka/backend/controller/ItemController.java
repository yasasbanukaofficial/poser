package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.ItemDTO;
import tech.yasasbanuka.backend.service.ItemService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping
    void createItem(@RequestBody ItemDTO itemDTO) {
        itemService.createItem(itemDTO);
    }

    @PutMapping
    void updateItem(@RequestBody ItemDTO itemDTO) {
        itemService.updateItem(itemDTO);
    }

    @DeleteMapping("/{id}")
    void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }

    @GetMapping("/{id}")
    ItemDTO getItem(@PathVariable Long id) {
        return itemService.getItem(id);
    }

    @GetMapping
    List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }
}