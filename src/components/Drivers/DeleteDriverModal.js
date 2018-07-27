import React from 'react';
import { Button } from '../common';

const DeleteDriverModal = props => (
  <div className="mw9">
    <div className="tc">Are you sure you want to delete {props.driver.attributes.name}?</div>
    <div className="flex mt4 justify-around">
      <Button onClick={() => props.onClick()}>Cancel</Button>
      <Button fontColor="black" backgroundColor="nearWhite" onClick={() => props.onClick(props.driver.id)}>Delete</Button>
    </div>
  </div>
);


export default DeleteDriverModal;
