import React from 'react';
import { Colors } from '../../../config/styles';
import InputUI from './InputUI';

const renderTextInput = (fieldProps) => {
  const {
    input,
    type,
    placeholder,
    borderColor,
    meta: { touched, error }
  } = fieldProps;

  const fieldStateColor = () => {
    if (error && touched) {
      return "red";
    } else if (borderColor) {
      return borderColor;
    }
    return Colors.inputBorderColor;
  };

  return (
    <div className="flex items-center pa2 ba mb3"
      style={{
        borderColor: fieldStateColor()
      }}>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="w-100 pa2 flex items-center bn"
      />
    </div>
  );
};

const InputText = props => (
  <InputUI component={renderTextInput} {...props} />
);

export default InputText;
