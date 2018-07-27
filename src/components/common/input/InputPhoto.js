import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import { Image, X } from 'react-feather';
import { Colors } from '../../../config/styles';

class renderPhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoDragging: false,
    };
  }

  fieldStateColor(error, touched) {
    if (error && touched) {
      return "red";
    }
    return Colors.inputBorderColor;
  }

  render() {
    const {
      input,
      name,
      displayText,
      editText,
      meta: { touched, error }
    } = this.props;
    const files = input.value;
    let dropzoneStyle = { zIndex: 20000 };
    let backgroundHolder;
    if (files._url) {
      backgroundHolder = files._url;
      dropzoneStyle = {
        backgroundImage: `url(${backgroundHolder})`, backgroundPosition: 'center', backgroundSize: 'cover', zIndex: 1000,
      };
    } else if (files[0] && files[0].preview) {
      backgroundHolder = files[0].preview;
      dropzoneStyle = {
        backgroundImage: `url(${backgroundHolder})`, backgroundPosition: 'center', backgroundSize: 'cover', zIndex: 1000,
      };
    } else if (files && typeof (files) === 'string') {
      backgroundHolder = files;
      dropzoneStyle = {
        backgroundImage: `url(${backgroundHolder})`, backgroundPosition: 'center', backgroundSize: 'cover', zIndex: 1000,
      };
    }
    return (
      <div className="p-3">
        <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: this.fieldStateColor(error, touched) }} className="square-image relative">
          <Dropzone
            name={name}
            accept="image/jpeg, image/png, image/jpg"
            style={dropzoneStyle}
            className={`${this.state.photoDragging === true ? "bg-brand-primary" : "hov-image-uploader"} pointer w-100 h-100 `}
            onDrop={filesToUpload => input.onChange(filesToUpload)}
            dropClass={this.state.photoDragging === true ? "bg-brand-primary" : "bg-moon-grey"}
            onDragOver={() => this.setState({ photoDragging: true })}
            onDragLeave={() => this.setState({ photoDragging: false })}>
            {!files.url && !files[0] && (<Image className="abs-center pointer" color="white" strokeWidth={1} size={100} />)}
          </Dropzone>
          {((files[0] && files[0].preview) || files._url) &&
            (
              <X className="red pointer absolute"
                size={20}
                style={{ left: -20, top: -20 }}
                onClick={() => { input.onChange(null); }}
              />
            )
          }
        </div>
        {!files[0] && displayText && <div className="mt2 mb2 brand-primary">{displayText}</div>}
        {files[0] && editText && <div className="mt2 mb2 brand-primary">{editText}</div>}
      </div>
    );
  }
}

const InputPhoto = props => (
  <div className="w-100 tc">
    <Field {...props} component={renderPhotoUpload} />
  </div>
);

export default InputPhoto;
