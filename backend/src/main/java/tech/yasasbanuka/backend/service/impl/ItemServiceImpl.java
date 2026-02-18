package tech.yasasbanuka.backend.service.impl;

import io.github.yasasbanukaofficial.MiniModelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.ItemDTO;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.repository.ItemRepo;
import tech.yasasbanuka.backend.service.ItemService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemRepo itemRepo;
    private final MiniModelMapper miniModelMapper;

    @Override
    public void createItem(ItemDTO itemDTO) {
        itemRepo.save(miniModelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        itemRepo.save(miniModelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void deleteItem(Long id) {
        itemRepo.deleteById(id);
    }

    @Override
    public ItemDTO getItem(Long id) {
        Item item = itemRepo.findById(id).orElseThrow(() -> new RuntimeException("Error when finding the item using id"));
        return miniModelMapper.map(item, ItemDTO.class);
    }

    @Override
    public ItemDTO getItemByName(String name) {
        Item item = itemRepo.findByName(name).orElseThrow(() -> new RuntimeException("Error when finding the item using name"));
        return miniModelMapper.map(item, ItemDTO.class);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepo.findAll().stream().map(item -> miniModelMapper.map(item, ItemDTO.class)).toList();
    }
}