import React from 'react';

const RenderError = ({ touched, error, position }) => (
  <div>{touched && error && <div className="red absolute" style={position}>*</div>}</div>
);
export default RenderError;
