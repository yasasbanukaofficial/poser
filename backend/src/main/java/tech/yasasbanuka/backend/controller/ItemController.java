package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.ItemDTO;
import tech.yasasbanuka.backend.service.ItemService;
import tech.yasasbanuka.backend.util.APIResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Validated
public class ItemController {
    private final ItemService itemService;

    @PostMapping
    ResponseEntity<APIResponse<String>> createItem(@RequestBody ItemDTO itemDTO) {
        itemService.createItem(itemDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 201, "Item created successfully", null), HttpStatus.CREATED);
    }

    @PutMapping()
    ResponseEntity<APIResponse<String>> updateItem(@RequestBody ItemDTO itemDTO) {
        ItemDTO existingItem = itemService.getItem(itemDTO.getId());
        itemDTO.setId(existingItem.getId());
        itemService.updateItem(itemDTO);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Item updated successfully", null), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<APIResponse<String>> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Item deleted successfully", null), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<APIResponse<ItemDTO>> getItem(@PathVariable Long id) {
        ItemDTO item = itemService.getItem(id);
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Item retrieved successfully", item), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<APIResponse<List<ItemDTO>>> getAllItems() {
        List<ItemDTO> items = itemService.getAllItems();
        return new ResponseEntity<>(new APIResponse<>(true, 200, "Items retrieved successfully", items), HttpStatus.OK);
    }

}