import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Space, Popconfirm } from 'antd';
import { User } from '@/types/user';

interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  onSubmit: (values: Omit<User, 'id'>) => void;
  onUpdate?: (values: Partial<User>) => void;
  onDelete?: () => void;
  loading?: boolean;
}

const { Option } = Select;

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({ open, onClose, user, onSubmit, onUpdate, onDelete, loading }) => {
  const [form] = Form.useForm();
  const isEdit = !!user;

  useEffect(() => {
    if (isEdit && user) {
      form.setFieldsValue({
        email: user.email,
        username: user.username,
        roles: user.roles && user.roles.length > 0 ? user.roles[0] : 'User',
      });
    } else {
      form.resetFields();
    }
  }, [user, isEdit, form, open]);

  const handleFinish = (values: Record<string, unknown>) => {
    const submitValues = { ...values, roles: [values.roles as string] };
    if (isEdit && onUpdate) {
      onUpdate(submitValues as Partial<User>);
    } else {
      onSubmit(submitValues as Omit<User, 'id'>);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEdit ? 'Cập nhật người dùng' : 'Tạo mới người dùng'}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ roles: 'User' }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label="Username"
            name="username"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roles"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={isEdit ? [] : [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder={isEdit ? 'Để trống nếu không đổi mật khẩu' : 'Nhập mật khẩu'} />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? 'Cập nhật' : 'Tạo mới'}
            </Button>
            {isEdit && onDelete && (
              <Popconfirm title="Bạn có chắc muốn xóa người dùng này?" onConfirm={onDelete} okText="Xóa" cancelText="Hủy">
                <Button danger loading={loading}>Xóa</Button>
              </Popconfirm>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetailDialog;
