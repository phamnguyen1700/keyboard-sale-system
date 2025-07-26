"use client";

import React from 'react';
import { Table as AntTable } from 'antd';
import { CustomTableProps, Column } from '../../types/table';

export default function CustomTable<T extends Record<string, unknown>>({
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
    render: col.render ? (value: unknown, record: T) => col.render!(record) : undefined,
  }));

  // Handle row click
  const handleRowClick = (record: T) => {
    if (onRowClick) {
      onRowClick(record);
    }
  };

  // Custom row className for hover effect
  const getRowClassName = () => {
    return 'custom-table-row hover:bg-[color:var(--secondary)] cursor-pointer';
  };

  return (
    <div className="border border-gray-300 rounded-none overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <AntTable<T>
        columns={antColumns}
        dataSource={records}
        loading={loading}
        pagination={pagination ? {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: pagination.onChange,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        } : false}
        rowKey={rowKey}
        size={size}
        bordered={bordered}
        scroll={scroll}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={getRowClassName}
        className="custom-table"
        components={{
          header: {
            cell: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
              <th
                {...props}
                className="px-4 py-2 text-center text-xs font-semibold text-white bg-[color:var(--tertiary)] border-b border-gray-400"
              >
                {children}
              </th>
            ),
          },
          body: {
            cell: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
              <td
                {...props}
                className="px-4 py-2 text-xs text-[color:var(--text-color)] border-b border-gray-400"
              >
                {children}
              </td>
            ),
          },
        }}
        locale={{
          emptyText: (
            <div className="text-center py-4">
              Không có dữ liệu
            </div>
          ),
        }}
      />
    </div>
  );
} 