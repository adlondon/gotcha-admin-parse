// This is a presentational component that provides a card UI
// configurable props: borderRadius, boxShadow


import React from 'react';
import { X } from 'react-feather';
import { Colors, BorderRadius } from '../../config/styles';

const Header = ({ onClick, header, noHeaderBorder }) => (
  <div
    className="flex items-center tc flex-row relative justify-center pa2 brand-primary"
    style={{
      borderBottom: noHeaderBorder ? '0px' : `1px solid ${Colors.silver}`
    }}>
    {header}
    <div
      className="absolute pointer"
      onClick={onClick}
      style={{
        right: "-20px",
        top: "-20px"
      }}
      onKeyPress={onClick}
      role="button">
      <X color={Colors.silver} size={30} />
    </div>
  </div>
);

const ModalCard = ({
  header, onClick, children, borderRadius, boxShadow, noHeaderBorder
}) => (
  <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
    <div className="w-100 bg-white absolute z-2 mt4 mb4 mw6 pa4"
      style={{
          borderRadius: borderRadius ? BorderRadius[borderRadius].all : BorderRadius.medium.all,
          boxShadow: boxShadow ? `0 8px ${BorderRadius[borderRadius].all || BorderRadius.medium.all} rgba(0,0,0,0.5)` : 'none'
        }}>
      <Header onClick={onClick} header={header} noHeaderBorder={noHeaderBorder} />
      {children}
    </div>
    <div
      role="button"
      className="fixed top-0 bottom-0 right-0 left-0 z-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
      onClick={onClick}
       />
  </div>
);

export default ModalCard;
