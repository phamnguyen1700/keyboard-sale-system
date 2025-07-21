export interface Column<T> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (record: T) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface CustomTableProps<T> {
  columns: Column<T>[];
  records: T[];
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
  };
  onRowClick?: (record: T) => void;
  rowKey?: string | ((record: T) => string);
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  scroll?: { x?: number | string; y?: number | string };
} 