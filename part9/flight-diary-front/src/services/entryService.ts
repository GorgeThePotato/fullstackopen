import axios from "axios";
import { Entry, ValidationError } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
    const response = await axios.get<Entry[]>(baseUrl)
    return response.data
}

export const createEntry = async (object: Entry) => {
    try {
        const entry = object;
        const response = await axios.post<Entry>(baseUrl,entry)
        return response.data      
    } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
          return error.response;
        } else {
          console.error(error);
        }
    }
}