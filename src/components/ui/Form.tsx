import { Form as AntForm, FormProps } from 'antd';

const Form = ({ children, ...rest }: FormProps & { children?: React.ReactNode }) => {
  return <AntForm {...rest}>{children}</AntForm>;
};

Form.Item = AntForm.Item;

export default Form;