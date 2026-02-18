export interface Item {
  id?: string;
  name: string;
  qty: number;
  price: number;
}

export interface ItemListProps {
  items: Item[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSelectItem?: (c: Item) => void;
}
