import React from 'react';
import { Modal, Input, InputNumber, Select, Form, Spin, Button, Popconfirm } from 'antd';
import { IProductDetail } from '@/types/product';
import { ICategory } from '@/types/category';
import { useUpdateProductMutation, useDeleteProductMutation } from '@/tanstack/product';
import { useCategories } from '@/tanstack/category';

interface ProductDetailDialogProps {
  open: boolean;
  onClose: () => void;
  product?: IProductDetail | null;
  loading?: boolean;
  isCreateMode?: boolean;
  onCreate?: (values: IProductDetail) => void;
}

const { TextArea } = Input;
const { Option } = Select;

const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({ open, onClose, product, loading, isCreateMode, onCreate }) => {
  const [form] = Form.useForm();
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  React.useEffect(() => {
    if (open) {
      if (product && !isCreateMode) {
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          categoryId: product.categoryId,
        });
      } else if (isCreateMode) {
        form.setFieldsValue({
          price: 10000,
          stockQuantity: 0,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isCreateMode, open]);

  // Đóng dialog khi cập nhật hoặc xóa thành công
  React.useEffect(() => {
    if ((updateProductMutation.isSuccess || deleteProductMutation.isSuccess) && !isCreateMode) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProductMutation.isSuccess, deleteProductMutation.isSuccess, isCreateMode]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (product && !isCreateMode) {
        updateProductMutation.mutate({ ...values, id: product.id });
      }
    } catch {
      // validation error
    }
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      if (onCreate) {
        onCreate(values);
      }
    } catch {
      // validation error
    }
  };

  const handleDelete = () => {
    if (product) {
      deleteProductMutation.mutate(product.id);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} title={isCreateMode ? 'Tạo mới sản phẩm' : (product?.name || 'Product Detail')} footer={null} width={420} centered destroyOnHidden>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : (
        <Form
          form={form}
          layout="vertical"
        >
          {isCreateMode || product ? (
            <>
              <div>
                <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter product name' }]} style={{ marginBottom: 8 }}>
                  <Input size="middle" />
                </Form.Item>
                <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select category' }]} style={{ marginBottom: 8 }}>
                  <Select
                    placeholder="Select category"
                    loading={isCategoriesLoading}
                    showSearch
                    optionFilterProp="children"
                    size="middle"
                  >
                    {(categories as ICategory[]).map((cat: ICategory) => (
                      <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: 'Please enter price' },
                      { type: 'number', min: 10000, message: 'Giá tối thiểu là 10,000 VND' }
                    ]}
                    style={{ flex: 1, marginBottom: 8 }}
                  >
                    <InputNumber
                      min={10000 as number}
                      style={{ width: '100%' }}
                      size="middle"
                      precision={0} // Chỉ cho số nguyên
                      formatter={value => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                      parser={value => value ? Number(value.replace(/,/g, "")) : 0}
                    />
                  </Form.Item>
                  <Form.Item label="Stock" name="stockQuantity" rules={[{ required: true, message: 'Please enter stock quantity' }]} style={{ flex: 1, marginBottom: 8 }}>
                    <InputNumber
                      min={0 as number}
                      style={{ width: '100%' }}
                      size="middle"
                      precision={0} // Chỉ cho số nguyên
                      formatter={value => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                      parser={value => value ? Number(value.replace(/,/g, "")) : 0}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item label="Description" name="description" style={{ marginBottom: 0 }}>
                <TextArea rows={2} size="middle" />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right', marginTop: 8, marginBottom: 0 }}>
                {isCreateMode ? (
                  <Button type="primary" size="large" onClick={handleCreate}>
                    Tạo mới
                  </Button>
                ) : (
                  <>
                    <Button type="primary" size="large" onClick={handleUpdate} disabled={!product} style={{ marginRight: 8 }}>
                      Cập nhật
                    </Button>
                    <Popconfirm title="Bạn có chắc muốn xóa sản phẩm này?" onConfirm={handleDelete} okText="Xóa" cancelText="Hủy">
                      <Button danger size="large" loading={deleteProductMutation.isPending}>Xóa</Button>
                    </Popconfirm>
                  </>
                )}
              </Form.Item>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>No product found.</div>
          )}
        </Form>
      )}
    </Modal>
  );
};

export default ProductDetailDialog;
