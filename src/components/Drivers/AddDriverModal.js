import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { InputDropDown, InputText, Button } from '../common';
import generatePassword from '../../helpers/generatePassword';

class AddDriverModal extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  mappedAreas(areas) {
    return areas.map(area => area.attributes.name);
  }

  handleFormSubmit(values) {
    const driver = {
      name: values.name,
      email: values.email,
      username: values.email,
      serviceArea: values.serviceArea,
      password: generatePassword()
    };
    this.props.onClick(driver);
  }

  render() {
    const { handleSubmit, options } = this.props;
    return (
      <div className="flex flex-wrap justify-around mw9 center">
        <form className="w-100" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputText placeholder="Driver Name" name="name" />
          <InputText placeholder="Email Address" name="email" />
          <InputDropDown placeholder="Service Area" name="serviceArea" options={this.mappedAreas(options)} />
          <div className="flex justify-center"><Button>+ Add Driver </Button></div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = '*required';
  if (!values.email) errors.email = '*required';
  if (!values.serviceArea) errors.serviceArea = '*required';
  return errors;
};

export default reduxForm({
  form: 'addDriver',
  validate
})(AddDriverModal);
