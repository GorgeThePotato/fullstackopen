import axios from "axios";

const baseUrl = '/api/persons';

const getAllPersons = () =>{
    const request = axios.get(baseUrl);
    return request.then(response =>response.data);
};

const createPerson = newPerson => {
    const request = axios.post(baseUrl,newPerson);
    return request.then(response =>response.data);
};

const deletePerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`);
}

const updatePerson = (id, newObject) =>{
    return axios.put(`${baseUrl}/${id}`,newObject);
}

export default {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePerson
}