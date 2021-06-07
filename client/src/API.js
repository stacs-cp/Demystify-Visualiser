import axios from "axios";

async function getExamples() {
    const response = await axios.get("examples");
    return response.data;
}

async function getExampleData(exampleName) {
    const response = await axios.get(`examples/${exampleName}`);
    return response.data;
}

async function runDemystifyOnInput(eprimename, eprime, paramname, param) {
    const response = await axios.post("run", {
        eprimename: eprimename,
        eprime: eprime,
        paramname: paramname,
        param: param
    })
    return response.data
}

export { getExamples, getExampleData, runDemystifyOnInput};

