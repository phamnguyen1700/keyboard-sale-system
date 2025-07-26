import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Popconfirm } from 'antd';
import { User } from '@/types/user';
import { useAssignRoleMutation } from '@/tanstack/user';
import { useQueryClient } from '@tanstack/react-query';
import { put } from '@/utils/Http'; // Added put import
import { useAuthStore } from '@/zustand/store/userAuth';
import { toast } from 'react-toastify';

interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  onSubmit?: (values: Omit<User, 'id'>) => void;
  onUpdate?: (values: Partial<User>) => void;
  onDelete?: () => void;
  loading?: boolean;
  isProfileMode?: boolean;
}

const { Option } = Select;

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({ open, onClose, user, onSubmit, onUpdate, onDelete, loading, isProfileMode }) => {
  const [form] = Form.useForm();
  const isEdit = !!user;
  const assignRoleMutation = useAssignRoleMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      if (isEdit && user) {
        form.setFieldsValue({
          email: user.email,
          username: user.username,
          roles: user.roles && user.roles.length > 0 ? user.roles[0] : 'User',
          password: '', // Luôn reset password về rỗng khi edit
        });
      } else {
        form.resetFields();
      }
    }
  }, [user, isEdit, form, open]);

  // Đóng dialog khi cập nhật thành công
  useEffect(() => {
    if (assignRoleMutation.isSuccess && isEdit) {
      onClose();
    }
  }, [assignRoleMutation.isSuccess, isEdit, onClose]);

  const handleFinish = (values: Record<string, unknown>) => {
    const submitValues = { ...values, roles: [values.roles as string] } as Record<string, unknown>;
    console.log('Submit values:', submitValues);
    console.log('Password value:', values.password);
    
    if (isEdit && onUpdate) {
      // Nếu password là rỗng hoặc undefined thì không gửi lên
      if (!values.password) {
        delete submitValues.password;
      }
      // Nếu role thay đổi thì gọi assignRole
      if (user?.roles && user.roles[0] !== values.roles) {
        assignRoleMutation.mutate({
          email: String(values.email),
          roleName: String(values.roles),
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
          }
        });
      }
      onUpdate(submitValues as Partial<User>);
    } else if (onSubmit) {
      onSubmit(submitValues as Omit<User, 'id'>);
    }
  };

  const isAdmin = user?.roles?.includes('Admin');
  const isUserProfile = isProfileMode && !isAdmin;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEdit ? (isUserProfile ? 'Thông tin cá nhân' : 'Cập nhật người dùng') : 'Tạo mới người dùng'}
      footer={null}
      destroyOnHidden
      centered
    >
      {isUserProfile ? (
        <ChangePasswordSection onSuccess={onClose} />
      ) : (
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
              <Input placeholder="Username" disabled={isUserProfile} />
            </Form.Item>
            <Form.Item
              label="Role"
              name="roles"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
            >
              <Select disabled={isUserProfile}>
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
            <Input placeholder="Email" disabled={isUserProfile} />
          </Form.Item>
          {/* Nếu là user thường, chỉ cho đổi mật khẩu */}
          {isUserProfile ? (
            <ChangePasswordSection onSuccess={onClose} />
          ) : (
            <Form.Item
              label="Password"
              name="password"
              rules={isEdit ? [] : [
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
                  message: 'Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!',
                },
              ]}
            >
              <Input.Password placeholder={isEdit ? 'Để trống nếu không đổi mật khẩu' : 'Nhập mật khẩu'} />
            </Form.Item>
          )}
          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            {!isUserProfile && (
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            )}
            {isEdit && onDelete && !isUserProfile && (
              <Popconfirm title="Bạn có chắc muốn xóa người dùng này?" onConfirm={() => onDelete && onDelete()} okText="Xóa" cancelText="Hủy">
                <Button danger loading={loading}>Xóa</Button>
              </Popconfirm>
            )}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default UserDetailDialog;

// Thêm component đổi mật khẩu
const ChangePasswordSection: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const { clearAuth } = useAuthStore();
  
  const handleChangePassword = async (values: { currentPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      await put('/Users/me/password', values);
      toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại trong 3 giây');
      
      // Bắt đầu countdown
      setCountdown(3);
      
      // Sau 3 giây tự động logout
      setTimeout(() => {
        clearAuth();
        toast.success('Đã đăng xuất! Vui lòng đăng nhập lại với mật khẩu mới.');
        onSuccess();
      }, 3000);
      
    } catch {
      toast.error('Đổi mật khẩu thất bại!');
    } finally {
      setLoading(false);
    }
  };

  // Countdown effect
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Form form={form} layout="vertical" onFinish={handleChangePassword} style={{ marginTop: 16 }}>
      <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true, message: 'Nhập mật khẩu hiện tại!' }]}>
        <Input.Password placeholder="Nhập mật khẩu hiện tại" />
      </Form.Item>
      <Form.Item label="Mật khẩu mới" name="newPassword" rules={[
        { required: true, message: 'Nhập mật khẩu mới!' },
        { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
          message: 'Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!',
        },
      ]}>
        <Input.Password placeholder="Nhập mật khẩu mới" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" loading={loading}>Đổi mật khẩu</Button>
      </Form.Item>
      {countdown > 0 && (
        <div style={{ textAlign: 'center', marginTop: 16, color: '#1677ff', fontWeight: 'bold' }}>
          Tự động đăng xuất sau: {countdown} giây
        </div>
      )}
    </Form>
  );
};
