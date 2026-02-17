package tech.yasasbanuka.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.ItemDTO;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.repository.ItemRepo;
import tech.yasasbanuka.backend.service.ItemService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepo itemRepo;

    @Override
    public void createItem(ItemDTO itemDTO) {
        Item item = new Item();
        item.setName(itemDTO.getName());
        item.setStock(itemDTO.getStock());
        item.setPrice(itemDTO.getPrice());
        itemRepo.save(item);
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        Item item = itemRepo.findById(itemDTO.getId())
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(itemDTO.getName());
        item.setStock(itemDTO.getStock());
        item.setPrice(itemDTO.getPrice());
        itemRepo.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepo.deleteById(id);
    }

    @Override
    public ItemDTO getItem(Long identity) {
        Item item = itemRepo.findById(identity)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        return new ItemDTO(item.getId(), item.getName(), item.getStock(), item.getPrice());
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepo.findAll().stream()
                .map(item -> new ItemDTO(item.getId(), item.getName(), item.getStock(), item.getPrice()))
                .collect(Collectors.toList());
    }
}
