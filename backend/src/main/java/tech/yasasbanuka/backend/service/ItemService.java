package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.ItemDTO;
import java.util.List;

public interface ItemService {
    void createItem(ItemDTO itemDTO);
    void updateItem(ItemDTO itemDTO);
    void deleteItem(Long id);
    ItemDTO getItem(Long identity);
    ItemDTO getItemByName(String name);
    List<ItemDTO> getAllItems();
}
