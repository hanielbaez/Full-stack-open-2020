import patienstData from '../../data/patients';
import uniqid from 'uniqid';
import { PublicPatient, NewPatient } from '../../types';

const getAll = (): PublicPatient[] => {
    return patienstData.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
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

export default {
    getAll,
    add,
    get
};