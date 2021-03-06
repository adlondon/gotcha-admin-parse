import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompactPicker } from 'react-color';
import { reduxForm } from 'redux-form';
import { InputText, InputPhoto, Button, InputDropDown } from '../common';
import Car from './Car';

class EditRideModal extends Component {
  constructor(props) {
    super(props);
    this.state = { color: props.initialValues.color };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }


  handleFormSubmit(values) {
    const ride = {
      name: values.name,
      serviceArea: typeof values.serviceArea === 'string' ? values.serviceArea : undefined,
      image: values.image[0],
      color: this.state.color,
      rideId: this.props.ride.id
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
          <InputPhoto initial={this.props.ride.attributes.image._url} name="image" />
          <div className="flex justify-between" id="picker-wrapper">
            <CompactPicker
              color={this.state.color}
              onChangeComplete={this.handleColorChange} />
            <div style={{ margin: 'auto' }}><Car myColor={this.state.color} /></div>
          </div>
          <InputText placeholder="Ride Name" name="name" />
          <InputDropDown placeholder="Service Area" name="serviceArea" options={this.mappedAreas(options)} />
          <div className="flex justify-center"><Button>+ Edit Ride </Button></div>
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

const mapStateToProps = ({ RideReducer }) => {
  const { selectedRide } = RideReducer;
  return { initialValues: { ...selectedRide.original.attributes, serviceArea: selectedRide.original.attributes.serviceArea.attributes.name }, serviceRideId: selectedRide.original.id };
};

const EditRideModalForm = reduxForm({
  form: 'editRide',
  enableReinitialize: true,
  validate
})(EditRideModal);

export default connect(mapStateToProps)(EditRideModalForm);
