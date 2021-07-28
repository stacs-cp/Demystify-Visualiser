import React from "react";
import { Spinner, Alert } from "react-bootstrap";

import * as API from "../API";

/**
 * This component represents a waiting screen for a Demystify job, polling its
 * progress at regular intervals and displaying status information.
 */
class JobWait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "pending",
      pollDelay: 1000, // How long to wait between polls.
      pollCount: 0, // How many polls have been made.
      error: null,

      log: null, // Logging output from Demystify.
      progress: null, // Description of what stage Demystify is on.
    };
  }

  // Start polling at regular intervals.
  componentDidMount() {
    this.timer = setInterval(() => this.checkStatus(), this.state.pollDelay);
  }

  // Update interval if pollDelay has changed.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.pollDelay !== this.state.pollDelay) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.checkStatus(), this.state.pollDelay);
    }
  }

  // End polling when JobWait unmounts.
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // Poll the status of a Demystify job
  checkStatus() {
    API.getJob(this.props.jobId).then((res) => {
      res.status === "finished"
        ? API.getJobOutput(this.props.jobId)
            .then((output) => {
              // Job succeeded
              clearInterval(this.timer);
              this.props.setInput(output, this.props.mode);
            })
            .catch((error) => {
              // Job errored
              clearInterval(this.timer);
              if (error.response) {
                this.setState({ error: error.response.data });
              } else {
                this.setState({ error: error });
              }
            })
        : // Store Demystify log and progress.
          this.setState({ log: res.log, progress: res.progress });
    });
    this.setState({ pollCount: this.state.pollCount + 1 });
    // Poll less frequently after the first 30 seconds
    if (this.state.pollCount === 30) {
      this.setState({ pollDelay: 10000 });
    }
  }

  render() {
    return (
      <div>
        {this.state.error !== null ? (
          <>
            <h4>Demystify job failed</h4>

            <p>
              <b>Job ID:</b> {this.props.jobId}
            </p>
            <Alert variant="warning" className="m-4">
              <b>Error message: </b>
              {this.state.error}
            </Alert>
          </>
        ) : (
          <>
            <Spinner animation="border" />
            <h4>Demystify is running... </h4>
            <p>
              <b>Job ID:</b> {this.props.jobId}
            </p>
            <p>
              If you don't want to wait here for the job to complete you can
              check its progress later at: <br />{" "}
              <a href={window.location + "api/job/" + this.props.jobId}>
                {window.location + "api/job/" + this.props.jobId}
              </a>
              <br /> and then save the result when it's ready from:
              <br />{" "}
              <a
                href={
                  window.location + "api/job/" + this.props.jobId + "/output"
                }
              >
                {window.location + "api/job/" + this.props.jobId + "/output"}
              </a>

              { // Show logging output in faux command output
                this.state.log && (
                <Alert className="m-4" variant="info">
                  {this.state.progress && <b>{this.state.progress}</b>}
                  <br />
                  <div
                    style={{
                      // Trick to ensure the box is always scrolled to the bottom
                      maxHeight: "8em",
                      overflowY: "scroll",
                      display: "flex",
                      flexDirection: "column-reverse",
                      size: "10pt",
                    }}
                  >
                    {this.state.log.reverse().map((l) => (
                      <p style={{ textAlign: "left" }}>{l}</p>
                    ))}
                  </div>
                </Alert>
              )}
            </p>
          </>
        )}
      </div>
    );
  }
}

export default JobWait;
