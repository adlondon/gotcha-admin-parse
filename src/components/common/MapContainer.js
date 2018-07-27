import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = () => (
  <Map
    id="google-map-vendor"
    className="google-map"
    clickableIcons={false}
    google={window.google}
    zoom={5} />
);

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(MapContainer);
