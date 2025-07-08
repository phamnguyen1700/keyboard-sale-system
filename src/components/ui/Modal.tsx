import { Modal as AntModal, ModalProps } from 'antd';

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
    return <AntModal {...props}>{children}</AntModal>;
};

export default Modal;