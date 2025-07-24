"use client";

import React, { useState } from 'react';
import CustomTable from '../../../components/commons/core/CustomTable';
import { Column } from '../../../types/table';
import { Button, Tag, Space, Select, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

// Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  categoryName: string;
  images: string[];
}

const ProductManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fake data based on API response
  const fakeProducts: Product[] = [
    {
      id: 1,
      name: "Cherry Profile Keycap Set",
      description: "A high-quality Cherry profile keycap set with premium PBT material.",
      price: 49.99,
      stockQuantity: 10000,
      categoryId: 1,
      categoryName: "Keycap Sets",
      images: []
    },
    {
      id: 2,
      name: "Artisan Keycap - Dragon",
      description: "A unique artisan keycap shaped like a dragon with detailed craftsmanship.",
      price: 29.99,
      stockQuantity: 10000,
      categoryId: 1,
      categoryName: "Keycap Sets",
      images: []
    },
    {
      id: 3,
      name: "Mechanical Keyboard - RGB",
      description: "Full-size mechanical keyboard with RGB backlighting and hot-swappable switches.",
      price: 129.99,
      stockQuantity: 500,
      categoryId: 2,
      categoryName: "Keyboards",
      images: []
    },
    {
      id: 4,
      name: "Cherry MX Blue Switches",
      description: "Tactile and clicky switches perfect for typing enthusiasts.",
      price: 0.75,
      stockQuantity: 5000,
      categoryId: 3,
      categoryName: "Switches",
      images: []
    },
    {
      id: 5,
      name: "Keyboard Wrist Rest",
      description: "Ergonomic wrist rest for comfortable typing experience.",
      price: 19.99,
      stockQuantity: 200,
      categoryId: 4,
      categoryName: "Accessories",
      images: []
    },
    {
      id: 6,
      name: "SA Profile Keycap Set",
      description: "Spherical SA profile keycaps with retro aesthetic.",
      price: 89.99,
      stockQuantity: 50,
      categoryId: 1,
      categoryName: "Keycap Sets",
      images: []
    },
    {
      id: 7,
      name: "Tenkeyless Keyboard",
      description: "Compact tenkeyless mechanical keyboard for space-saving setup.",
      price: 99.99,
      stockQuantity: 300,
      categoryId: 2,
      categoryName: "Keyboards",
      images: []
    },
    {
      id: 8,
      name: "Gateron Red Switches",
      description: "Smooth linear switches with light actuation force.",
      price: 0.65,
      stockQuantity: 3000,
      categoryId: 3,
      categoryName: "Switches",
      images: []
    }
  ];

  // Filter products based on search and category
  const filteredProducts = fakeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...Array.from(new Set(fakeProducts.map(p => p.categoryName)))];

  // Column definitions
  const columns: Column<Product>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      key: 'name',
      title: 'Product Name',
      dataIndex: 'name',
      width: 200,
      render: (record) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500 truncate">{record.description}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'categoryName',
      width: 120,
      align: 'center',
      render: (record) => (
        <Tag color="blue">{record.categoryName}</Tag>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      width: 100,
      align: 'center',
      render: (record) => (
        <span className="font-semibold text-green-600">
          ${record.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'stock',
      title: 'Stock',
      dataIndex: 'stockQuantity',
      width: 100,
      align: 'center',
      render: (record) => (
        <Tag color={record.stockQuantity > 100 ? 'green' : record.stockQuantity > 10 ? 'orange' : 'red'}>
          {record.stockQuantity.toLocaleString()}
        </Tag>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 150,
      align: 'center',
      render: (record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
          >
          </Button>
          <Button 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record);
            }}
          >
          </Button>
        </Space>
      ),
    },
  ];

  const handleRowClick = (record: Product) => {
    console.log('Product clicked:', record);
    // Navigate to product detail or open edit modal
  };

  const handleEdit = (record: Product) => {
    console.log('Edit product:', record);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (record: Product) => {
    console.log('Delete product:', record);
    // Show confirmation modal and delete
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleSearch = (searchValue?: string, categoryValue?: string) => {
    if (searchValue !== undefined) {
      setSearchTerm(searchValue);
    }
    if (categoryValue !== undefined) {
      setSelectedCategory(categoryValue);
    }
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Don't reset page here, let search button handle it
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    // Navigate to add product page or open modal
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search products by name or description..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="large"
            style={{ width: 200 }}
            placeholder="Select Category"
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            size="large"
            onClick={() => handleSearch(searchTerm, selectedCategory)}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <CustomTable<Product>
        columns={columns}
        records={filteredProducts}
        onRowClick={handleRowClick}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredProducts.length,
          onChange: handlePaginationChange,
        }}
        loading={false}
        bordered={true}
        size="middle"
        rowKey="id"
      />
    </div>
  );
};

export default ProductManagement; 