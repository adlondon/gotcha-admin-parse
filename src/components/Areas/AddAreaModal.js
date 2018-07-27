import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';
import { reduxForm } from 'redux-form';
import { InputText, Button } from '../common';
import { Colors } from '../../config/styles';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYWRsb25kb24iLCJhIjoiY2podGg2dm5pMGRudDNxbDYwcXZqazc0dyJ9.86vPr3H6aT0itqTAZRACWw"
});

class AddAreaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-97.380979, 42.877742], polygonPoints: [], hasDrawn: true
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit() {
    this.mapRef.props.zoom[0] = this.mapRef.getChildContext().map._easeOptions.zoom;
    this.setState({ center: this.mapRef.calcCenter(this.state.polygonPoints) });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="flex flex-wrap justify-around mw9 center">
        <form className="w-100" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputText placeholder="Area Name" name="name" />
          <Map
            ref={r => this.mapRef = r}
            style="mapbox://styles/mapbox/streets-v9"
            center={this.state.center}
            type="polygon"
            zoom={[1.75]}
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

export default reduxForm({
  form: 'addArea',
})(AddAreaModal);
