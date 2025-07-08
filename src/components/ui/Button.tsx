import { Button as AntButton, ButtonProps } from 'antd';

const Button = ({ children, ...rest }: ButtonProps & { children?: any }) => {
    return <AntButton {...rest}>{children}</AntButton>;
};

export default Button;