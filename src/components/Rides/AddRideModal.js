import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { CompactPicker } from 'react-color';
import Car from './Car';
import { InputText, InputDropDown, Button, InputPhoto } from '../common';


class AddRideModal extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#f2f2f2" };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleFormSubmit(values) {
    const ride = {
      name: values.name,
      serviceArea: values.serviceArea,
      image: values.image[0],
      color: this.state.color,
    };
    this.props.onClick(ride);
  }


  mappedAreas(areas) {
    return areas.map(area => area.attributes.name);
  }

  handleColorChange(color) {
    this.setState({ color: color.hex });
  }

  render() {
    const { handleSubmit, options } = this.props;
    return (
      <div className="flex flex-wrap justify-around mw9 center">
        <form className="w-100" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputPhoto name="image" />
          <div className="flex justify-between" id="picker-wrapper">
            <CompactPicker
              color={this.state.color}
              onChangeComplete={this.handleColorChange} />
            <div style={{ margin: 'auto' }}><Car myColor={this.state.color} /></div>
          </div>
          <InputText placeholder="Ride Name" name="name" />
          <InputDropDown placeholder="Service Area" name="serviceArea" options={this.mappedAreas(options)} />
          <div className="flex justify-center"><Button>+ Add Ride </Button></div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = '*required';
  if (!values.serviceArea) errors.serviceArea = '*required';
  if (!values.image) errors.image = '*required';
  return errors;
};

export default reduxForm({
  form: 'addDriver',
  validate
})(AddRideModal);
