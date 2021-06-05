import axios from "axios";

async function getExamples() {
    const response = await axios.get("examples");
    return response.data;
}

async function getExampleData(exampleName) {
    const response = await axios.get(`examples/${exampleName}`);
    return response.data;
}

async function runDemystifyOnInput(eprime, param) {
    const response = await axios.post("run", {
        eprime: eprime,
        param: param
    })
    return
}

export { getExamples, getExampleData, runDemystifyOnInput};

