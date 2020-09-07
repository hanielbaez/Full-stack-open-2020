import patienstData from '../../data/patients';
import uniqid from 'uniqid';
import { NoSensitiveDiaryEntry, NewPatient } from '../../types';

const getAll = (): NoSensitiveDiaryEntry[] => {
    return patienstData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
};

const add = (patient: NewPatient): NoSensitiveDiaryEntry => {
    const newPatient = {
        id: uniqid(),
        ...patient
    };
    patienstData.push(newPatient);
    return newPatient;
};

export default {
    getAll,
    add
};