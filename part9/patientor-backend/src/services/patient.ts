import patienstData from '../../data/patients';
import uniqid from 'uniqid';
import { PublicPatient, NewPatient, NewEntry } from '../../types';

const getAll = (): PublicPatient[] => {
    return patienstData.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
    }));
};

const get = (id: string) => {
    const patientFound = patienstData.find(patient => patient.id === id);
    if (patienstData) {
        return patientFound;
    } else {
        return `Patient with id ${id} no founded`;
    }
}

const add = (patient: any): NewPatient => {
    const newPatient = {
        id: uniqid(),
        ...patient
    };
    patienstData.push(newPatient);
    return newPatient;
};

const addEntry = (entry: any, patientId: string): NewEntry => {
    const newEntry = {
        id: uniqid(),
        ...entry
    }
    patienstData.map(patient => {
        if (patient.id === patientId) {
            patient.entries.push(newEntry);
        }
        return patient;
    });
    return newEntry;
}

export default {
    getAll,
    add,
    get,
    addEntry
};