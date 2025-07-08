import { Image as AntImage } from 'antd';
import React from 'react';

interface CustomImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
  preview?: boolean;
  onClick?: () => void;
}

const Image: React.FC<CustomImageProps> & { PreviewGroup: typeof AntImage.PreviewGroup } = (props) => {
  const { src, alt, width, height, style, className, preview = true, onClick } = props;
  return (
    <AntImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      preview={preview}
      onClick={onClick}
    />
  );
};

Image.PreviewGroup = AntImage.PreviewGroup;

export default Image;
