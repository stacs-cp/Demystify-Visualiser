import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';

import * as API from "../API";

class JobWait extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "pending", 
            pollDelay: 1000, 
            pollCount: 0,
            error: null}
    }
    componentDidMount() {
        this.timer = setInterval(()=> this.checkStatus(), this.state.pollDelay);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pollDelay !== this.state.pollDelay) {
            clearInterval(this.timer)
            this.timer = setInterval(() => this.checkStatus(), this.state.pollDelay)
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    checkStatus() {
        API.getJob(this.props.jobId)
            .then(res => res.status === "finished" && 
                API.getJobOutput(this.props.jobId)
                    .then(output => {
                            clearInterval(this.timer)
                            this.props.setInput(output, this.props.mode)
                        }).catch(error => {
                            clearInterval(this.timer)
                            this.setState({error: error.response.data})
                        })) 
        this.setState({pollCount: this.state.pollCount + 1})
        if(this.state.pollCount === 10) {
            this.setState({pollDelay: 10000})
        }
    }
    render() {
        console.log(this.state.error)
        return (
        <div>
        {this.state.error !== null ? (
            <>
                <h4>demystify job failed</h4> 

                <p><b>Job ID:</b> {this.props.jobId}</p>
                <Alert variant="warning" className="m-4"><b>Error message: </b>{this.state.error}</Alert>

            </>
            ) :
            (
            <>
                <Spinner animation="border"/>
                <h4>demystify is running... </h4> 
                <p><b>Job ID:</b> {this.props.jobId}</p>
                <p>If you don't want to wait here for the job to complete you can check its progress later
                    at: <br /> <a href={window.location + "api/job/" + this.props.jobId}>{window.location + "api/job/" + this.props.jobId}</a>
                    <br /> and then save the result when it's ready from: 
                    <br /> <a href={window.location + "api/job/" + this.props.jobId + "/output"}>{window.location + "api/job/" + this.props.jobId + "/output"}</a>
                    </p>
            </>
            )
        }
        </div>
        )
    }
}

export default JobWait;