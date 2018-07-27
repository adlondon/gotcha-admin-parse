import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import { reduxForm } from 'redux-form';
import { InputText, Button } from '../common';
import { Colors } from '../../config/styles';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYWRsb25kb24iLCJhIjoiY2podGg2dm5pMGRudDNxbDYwcXZqazc0dyJ9.86vPr3H6aT0itqTAZRACWw"
});

class EditAreaModal extends Component {
  constructor(props) {
    super(props);
    this.state = { polygonPoints: props.initialValues.polygon.attributes, hasDrawn: true, zoom: 1.75 };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    const area = {
      name: values.name,
      polygonPoints: this.state.polygonPoints
    };
    if (this.state.polygonPoints.length < 1) {
      this.setState({ hasDrawn: false });
    } else {
      this.props.onClick(area);
    }
  }

  render() {
    const { handleSubmit, change } = this.props;
    return (
      <div className="flex flex-wrap justify-around mw9 center">
        <form className="w-100" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputText placeholder="Area Name" name="name" />
          <Map
            ref={r => this.mapRef = r}
            style="mapbox://styles/mapbox/streets-v9"
            center={[-97.380979, 42.877742]}
            zoom={[this.state.zoom]}
            type="polygon"
            containerStyle={{
              height: "400px",
              width: "100%",
              marginTop: '1rem',
              marginBottom: '1rem',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: this.state.hasDrawn ? Colors.inputBorderColor : "red"
            }}>
            <DrawControl
              displayControlsDefault={false}
              controls={{ trash: true, polygon: true }}
              onDrawDelete={() => this.setState({ polygonPoints: [] })}
              onDrawCreate={polygon => this.setState({ polygonPoints: polygon.features[0].geometry.coordinates[0] })}
              onDrawUpdate={polygon => this.setState({ polygonPoints: polygon.features[0].geometry.coordinates[0] })}
              ref={(drawControl) => { this.drawControl = drawControl; }} />
          </Map>

          <div className="flex justify-center"><Button>+ Add Area </Button></div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = '*required';
  if (!values.radius) errors.radius = '*required';
  return errors;
};

const mapStateToProps = ({ AreaReducer }) => {
  const { selectedArea } = AreaReducer;
  return { initialValues: selectedArea.original.attributes, serviceAreaId: selectedArea.original.id };
};

const EditAreaModalForm = reduxForm({
  form: 'editArea',
  enableReinitialize: true,
  validate
})(EditAreaModal);

export default connect(mapStateToProps)(EditAreaModalForm);
