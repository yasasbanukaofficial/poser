export interface HeaderProps {
  title: string;
  subtitle: string;
  onAddClick: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
}
