export interface Customer {
  id?: string;
  name: string;
  address: string;
}

export interface CustomerListProps {
  customers: Customer[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSelectCustomer?: (c: Customer) => void;
}
