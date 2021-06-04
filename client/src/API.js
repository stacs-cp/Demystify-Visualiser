import axios from "axios";

async function getExamples() {
    const response = await axios.get("examples");
    return response.data;
}

async function getExampleData(exampleName) {
    const response = await axios.get(`examples/${exampleName}`);
    return response.data;
}

export { getExamples, getExampleData};

