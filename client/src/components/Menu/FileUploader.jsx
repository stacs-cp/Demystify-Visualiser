import React from "react";

/**
 * Wrapper class for a standard HTML file input - for uploading JSON and eprime
 * files. 
 */
class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Allow other components to reset this to "No file selected"
    if (this.props !== prevProps) {
      if (this.props.noFile) {
        this.fileInput.current.value = "";
      }
    }
  }

  uploadFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        this.props.onUpload(text, this.fileInput.current.files[0].name);
      } catch {
        this.props.onError();
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  render() {
    return (
      <input
        disabled={this.props.disabled}
        type="file"
        ref={this.fileInput}
        onChange={(e) => this.uploadFile(e)}
      />
    );
  }
}

export default FileUploader;
