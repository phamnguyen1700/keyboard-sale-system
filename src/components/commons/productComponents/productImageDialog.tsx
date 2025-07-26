import React from 'react';
import { Modal, Upload, Button } from 'antd';
import { useProductImages, useUploadProductImage, useDeleteProductImage } from '@/tanstack/product';
import { uploadProductImage } from '@/zustand/services/product/product'; // import thêm
import type { UploadRequestOption, RcFile } from 'rc-upload/lib/interface';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";
import { IImage } from '@/types/product';

interface RcFileWithOrigin extends RcFile {
  originFileObj?: File;
}

const ProductImageDialog: React.FC<{ open: boolean; onClose: () => void; productId: number | null }> = ({ open, onClose, productId }) => {
  const { data: images = [] } = useProductImages(productId ?? 0);
  const uploadMutation = useUploadProductImage(productId ?? 0);
  const deleteImageMutation = useDeleteProductImage();
  const queryClient = useQueryClient();

  // Debug: log images mỗi lần render
  console.log('ProductImageDialog images:', images);

  // Render 3 ô ảnh theo displayOrder 0,1,2
  const renderImageSlots = () => {
    // Ép kiểu images về any[] để tránh lỗi linter
    const imgArr = images as IImage[];
    return [0, 1, 2].map((order) => {
      const img = imgArr.find((img) => img.displayOrder === order);
      if (img) {
        const handleDelete = () => {
          if (!productId || !img.id) return;
          deleteImageMutation.mutate(
            { productId, imageId: img.id },
            {
              onSuccess: () => {
                toast.success('Xóa ảnh thành công!');
              },
              onError: () => {
                toast.error('Xóa ảnh thất bại!');
              },
            }
          );
        };
        return (
          <div key={order} style={{ display: 'inline-block', marginRight: 16, position: 'relative' }}>
            <img
              src={img.imageUrl}
              alt={img.altText || `image-${order}`}
              style={{ width: 104, height: 104, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
            />
            <Button
              danger
              size="small"
              style={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
              loading={deleteImageMutation.isPending}
              onClick={handleDelete}
            >
              Xóa
            </Button>
            <div style={{ textAlign: 'center', marginTop: 4 }}>Ảnh {order + 1}</div>
          </div>
        );
      } else {
        // Xử lý upload ảnh cho từng displayOrder
        const handleUpload = async (options: UploadRequestOption) => {
          const { file, onSuccess, onError } = options;

          if (!productId) {
            toast.error('Thiếu thông tin sản phẩm!');
            return;
          }

          const realFile = (file as RcFileWithOrigin).originFileObj || file;

          console.log('realFile instanceof File:', realFile instanceof File);
          console.log('realFile =', realFile);

          if (!(realFile instanceof File)) {
            toast.error('File không hợp lệ!');
            return;
          }

          try {
            const displayOrder = order;
            const isPrimary = displayOrder === 0;

            await uploadProductImage(productId, realFile, displayOrder, realFile.name, isPrimary);

            // Refetch lại danh sách ảnh
            queryClient.invalidateQueries({ queryKey: ['product-images', productId] });

            console.log('Upload thành công!'); // Thêm log để kiểm tra
            toast.success('Upload thành công!');
            onSuccess?.({}, realFile);
          } catch (err) {
            console.error('Upload error:', err);
            toast.error('Upload thất bại!');
            onError?.(err as Error);
          }
        };

        return (
          <div key={order} style={{ display: 'inline-block', marginRight: 16 }}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              customRequest={handleUpload}
              accept="image/*"
            >
              <div style={{ width: 104, height: 104, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #aaa', borderRadius: 8 }}>
                {uploadMutation.isPending ? 'Uploading...' : '+ Upload'}
              </div>
            </Upload>
            <div style={{ textAlign: 'center', marginTop: 4 }}>Ảnh {order + 1}</div>
          </div>
        );
      }
    });
  };

  return (
    <Modal open={open} onCancel={onClose} title="Product Images" footer={null} centered>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {renderImageSlots()}
      </div>
    </Modal>
  );
};

export default ProductImageDialog;
