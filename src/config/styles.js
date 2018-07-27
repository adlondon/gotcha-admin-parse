/* eslint-disable */

var Colors = {
  // Brand
  brandPrimary: '#2c3a91',
  brandPurple: '#553982',
  brandDeepGray: '#233744',

  // Basic Tachyon
  black: '#000000',
  white: '#ffffff',
  darkRed: '#D0021B',
  nearWhite: '#f2f2f2',
  moonGray: '#CCCCCC',
  silver: '#999999',
};
Colors.inputFontColor = Colors.black;
Colors.inputBorderColor = Colors.silver;

var Fonts = {
  iosFont: 'Helvetica Neue',
  androidFont: 'sans-serif'
};

var Icons = {
  home: 'home',
  profile: 'user',
  map: 'map',
  calendar: 'calendar-o'
};

var BorderRadius = {
  small: {
    all: '4px',
    top: '4px 4px 0px 0px',
    bottom: '0px 0px 4px 4px',
  },
  medium: {
    all: '0px',
    top: '0px 0px 0px 0px',
    bottom: '0px 0px 0px 0px',
  },
  none: 'none'
};

var MaxWidth = {
  mobile: '504px'
};

module.exports = {
  Colors,
  Icons,
  Fonts,
  BorderRadius,
  MaxWidth
}
