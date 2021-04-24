import React from 'react';
import { Card, Row } from 'react-bootstrap'
class FileLoader extends React.Component {
    readFile = async (e) => {
        e.preventDefault()


        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                const text = (e.target.result)
                this.props.setInput(JSON.parse(text));
            } catch {
                this.props.setError();
            }
        };
        reader.readAsText(e.target.files[0])

    }

    render() {
        return (
            <Card className="mt-3 p-4">
                <Row className="d-flex justify-content-center">
                    <p className="mx-4">  Load Demystify output from JSON file:</p>
                    <input type="file" onChange={(e) => this.readFile(e)} />
                </Row>

            </Card>
        )
    }
}

export default FileLoader;