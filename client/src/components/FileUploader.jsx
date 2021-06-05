import React from 'react';

class FileUploader extends React.Component {
    uploadFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                const text = (e.target.result)
                //this.props.setInput(JSON.parse(text));
                this.props.onUpload(text);
            } catch {
                this.props.onError();
            }
        };
        reader.readAsText(e.target.files[0])
    }

    render() {
        return <input disabled={this.props.disabled} type="file" onChange={(e) => this.uploadFile(e)} />
    }
}

export default FileUploader;