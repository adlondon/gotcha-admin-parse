import React from 'react';
import Select from 'react-select';
import { BorderRadius, Colors } from '../../../config/styles';
import InputUI from './InputUI';

const fieldStateColor = (error, touched) => {
  if (error && touched) {
    return "red";
  }
  return Colors.inputBorderColor;
};

const renderDropDown = (fieldProps) => {
  const {
    options,
    input,
    fontColor,
    borderRadius,
    placeholder,
    meta: { error, touched }
  } = fieldProps;
  return (
    <div
      className="ba mt2 mb3 f5 pa2 relative flex items-center bg-white"
      style={{
        color: fontColor || Colors.inputFontColor,
        borderRadius: borderRadius
          ? BorderRadius[borderRadius].all
          : BorderRadius.medium.all,
        borderColor: fieldStateColor(error, touched)
      }}
    >

      <div className="absolute right-0 mr2">
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `5px solid ${Colors.inputBorderColor}`
          }}
        />
      </div>
      <select {...input} className="w-100 bn f5 bg-white input-reset pa2">
        <option value="" defaultValue disabled>
          -{placeholder}-
        </option>
        {options &&
          options.map(option => (
            <option value={option.value || option} key={option.id || option} className="f3">
              {option.display || option}
            </option>
          ))}
      </select>
    </div>
  );
};

const InputDropDown = props => (
  <InputUI component={renderDropDown} {...props} />
);

export default InputDropDown;
