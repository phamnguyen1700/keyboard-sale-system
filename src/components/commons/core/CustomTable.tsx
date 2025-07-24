"use client";

import React from 'react';
import { Table as AntTable, TableProps } from 'antd';
import { CustomTableProps, Column } from '../../types/table';
import CustomPagination from "@/components/commons/core/CustomPagination";

export default function CustomTable<T extends Record<string, any>>({
  columns,
  records,
  loading = false,
  pagination,
  onRowClick,
  rowKey = 'id',
  size = 'middle',
  bordered = true,
  scroll,
}: CustomTableProps<T>) {
  
  // Convert our Column type to Ant Design's ColumnType
  const antColumns = columns.map((col: Column<T>) => ({
    key: col.key,
    title: col.title,
    dataIndex: col.dataIndex,
    width: col.width,
    align: col.align,
    render: col.render ? (value: any, record: T) => col.render!(record) : undefined,
  }));

  // Handle row click
  const handleRowClick = (record: T) => {
    if (onRowClick) {
      onRowClick(record);
    }
  };

  // Custom row className for hover effect
  const getRowClassName = (record: T, index: number) => {
    return 'custom-table-row hover:bg-[color:var(--secondary)] cursor-pointer';
  };

  return (
    <div className="border border-gray-300 rounded-none overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <AntTable<T>
        columns={antColumns}
        dataSource={records}
        loading={loading}
        pagination={false} // <-- Ẩn pagination mặc định
        rowKey={rowKey}
        size={size}
        bordered={bordered}
        scroll={scroll}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={getRowClassName}
        className="custom-table"
        // Custom styles for header
        components={{
          header: {
            cell: ({ children, ...props }: any) => (
              <th 
                {...props} 
                className="px-4 py-2 text-center text-xs font-semibold text-white bg-[color:var(--tertiary)] border-b border-gray-400"
              >
                {children}
              </th>
            ),
          },
          body: {
            cell: ({ children, ...props }: any) => (
              <td 
                {...props} 
                className="px-4 py-2 text-xs text-[color:var(--text-color)] border-b border-gray-400"
              >
                {children}
              </td>
            ),
          },
        }}
        // Empty state
        locale={{
          emptyText: (
            <div className="text-center py-4">
              Không có dữ liệu
            </div>
          ),
        }}
      />
      <CustomPagination
        current={pagination?.current}
        total={pagination?.total}
        pageSize={pagination?.pageSize}
        onChange={pagination?.onChange}
      />
    </div>
  );
}