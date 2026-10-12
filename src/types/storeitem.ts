export interface StoreItem {
  label: string;
  icon: React.ComponentType;
  id?: string;
  isCompleted?: boolean;
  route?: string;
}
