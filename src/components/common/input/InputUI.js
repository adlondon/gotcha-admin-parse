import React from 'react';
import { Field } from 'redux-form';
import Label from './Label';

const InputUI = (props) => {
  const {
    name,
    label,
    classOverrides,
    component
  } = props;
  return (
    <div className={`w-100 input-height ${classOverrides}`}>
      <div className="">
        <Label name={name} label={label} />
        <Field component={component} {...props} />
      </div>
    </div>
  );
};

export default InputUI;
