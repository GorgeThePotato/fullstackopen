import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/api/patients`
  );

  return data;
};

const getPatient = async (id:string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/api/patients/${id}`)
  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/api/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getPatient
};

