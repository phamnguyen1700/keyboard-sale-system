"use client";

import React, { useState } from 'react';
import CustomTable from '../../../components/commons/core/CustomTable';
import { Column } from '../../../types/table';
import { Button, Tag, Select, Input } from 'antd';
import { PlusOutlined, SearchOutlined, PictureOutlined } from '@ant-design/icons';
import { useProducts, useProductDetail, useCreateProductMutation } from '@/tanstack/product';
import ProductDetailDialog from '../../../components/commons/productComponents/productDetailDialog';
import { IProduct, IProductDetail } from '@/types/product';
import ProductImageDialog from '../../../components/commons/productComponents/productImageDialog';
import { useCategories } from '@/tanstack/category';
import { ICategory } from '@/types/category';

const { Option } = Select;

const ProductManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [productImageDialogOpen, setProductImageDialogOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const createProductMutation = useCreateProductMutation();

  const { data: products = [], isLoading } = useProducts();
  const { data: productDetail } = useProductDetail(selectedProductId ? String(selectedProductId) : '');
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();

  // Filter products based on search and category
  const filteredProducts = products.filter((product: IProduct) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      product.categoryId === Number(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Column definitions
  const columns: Column<IProduct>[] = [
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
          <div className="text-xs text-gray-500 truncate">{record.description.length > 30 ? record.description.substring(0, 30) + '...' : record.description}</div>
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
      key: 'image',
      title: 'Image',
      width: 80,
      align: 'center',
      render: (record) => (
        <Button
          type="text"
          icon={<PictureOutlined style={{ fontSize: 22 }} />}
          onClick={e => {
            e.stopPropagation();
            setSelectedProductId(record.id);
            setProductImageDialogOpen(true);
          }}
        />
      ),
    },
  ];

  const handleRowClick = (record: IProduct) => {
    setSelectedProductId(record.id);
    setDetailOpen(true);
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
    setCreateOpen(true);
  };

  const handleCreateProduct = (values: IProductDetail) => {
    createProductMutation.mutate(values, {
      onSuccess: () => setCreateOpen(false),
    });
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
              onChange={(e) => handleSearch(e.target.value, selectedCategory)}
              style={{ width: '100%' }}
            />
          </div>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="large"
            style={{ width: 200 }}
            placeholder="Select Category"
            loading={isCategoriesLoading}
          >
            <Option key="all" value="all">All Categories</Option>
            {(categories as ICategory[]).map((cat: ICategory) => (
              <Option key={cat.id} value={cat.id}>{cat.name}</Option>
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

      {/* Table container */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
        <CustomTable<IProduct>
          columns={columns}
          records={filteredProducts}
          onRowClick={handleRowClick}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredProducts.length,
            onChange: handlePaginationChange,
          }}
          loading={isLoading}
          bordered={true}
          size="middle"
          rowKey="id"
        />
      </div>
      <ProductDetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        product={productDetail}
      />
      <ProductDetailDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        isCreateMode
        onCreate={handleCreateProduct}
      />
      <ProductImageDialog
        open={productImageDialogOpen}
        onClose={() => setProductImageDialogOpen(false)}
        productId={selectedProductId}
      />
    </div>
  );
};

export default ProductManagement; 