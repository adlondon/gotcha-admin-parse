// This is a presentational component that provides a card UI
// configurable props: borderRadius, bottomContent, maxWidth, bottomColor

import React from 'react';
import { BorderRadius, MaxWidth, Colors } from '../../config/styles';

const Card = (props) => {
  if (!props.bottomContent) {
    return (
      <div className={`w-100 pa4 bg-white pl5 pr5 ${props.classOverrides}`}
        style={{
          borderRadius: props.borderRadius ? BorderRadius[props.borderRadius].all : BorderRadius.medium.all,
          maxWidth: props.maxWidth ? MaxWidth[props.maxWidth] : '',
          boxShadow: props.boxShadow ? `0 8px ${BorderRadius[props.borderRadius].all || BorderRadius.medium.all} rgba(0,0,0,0.5)` : 'none'
        }}>
        {props.children}
      </div>
    );
  }
  return (
    <div className={`w-100 ${props.classOverrides}`}
      style={{
        boxShadow: props.boxShadow ? `0 8px ${BorderRadius[props.borderRadius].all || BorderRadius.medium.all} rgba(0,0,0,0.5)` : 'none',
        borderRadius: BorderRadius[props.borderRadius].all || BorderRadius.medium.all
      }}>
      <div className="w-100 pa4 pl5 pr5 bg-white"
        style={{
          borderRadius: props.borderRadius ? BorderRadius[props.borderRadius].top : BorderRadius.medium.top,
        }}>
        {props.children}
      </div>
      <div className="w-100 pa4 pl5 pr5"
        style={{
          borderTop: `1px solid ${Colors.moonGray}`,
          backgroundColor: Colors[props.bottomColor] || Colors.white,
          borderRadius: props.borderRadius ? BorderRadius[props.borderRadius].bottom : BorderRadius.medium.bottom,
        }}>
        {props.bottomContent}
      </div>
    </div>
  );
};

export default Card;
