import { Button as AntButton, ButtonProps } from 'antd';

const Button = ({ children, ...rest }: ButtonProps & { children?: React.ReactNode }) => {
    return <AntButton {...rest}>{children}</AntButton>;
};

export default Button;