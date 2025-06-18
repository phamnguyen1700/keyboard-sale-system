import React from 'react';
import { Input as AntInput, InputProps } from 'antd';
import { InputRef } from 'antd/es/input';

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => (
  <AntInput ref={ref} {...props} /> 
));   

Input.displayName = "Input";

export default Input;       