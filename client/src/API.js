import axios from "axios";

async function getExamples() {
    const response = await axios.get("examples");
    return response.data;
}

async function getExampleData(exampleName) {
    const response = await axios.get(`examples/${exampleName}`);
    return response.data;
}

async function createJob(options) {
    const response = await axios.post("api/job", options)
    return response.data
}

async function getJob(jobId) {
    const response = await axios.get(`api/job/${jobId}`);
    return response.data
}

async function getJobOutput(jobId) {
    const response = await axios.get(`api/job/${jobId}/output`);
    return response.data
}


export { getExamples, getExampleData, createJob, getJob, getJobOutput};

