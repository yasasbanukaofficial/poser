export interface Item {
  id?: string;
  name: string;
  stock: number;
  price: number;
}

export interface ItemListProps {
  items: Item[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSelectItem?: (c: Item) => void;
}
