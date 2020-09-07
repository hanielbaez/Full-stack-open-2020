/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from '../../types';

const isString = (param: string): boolean => {
    return typeof param === 'string';
};

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isSsn = (param: string) => {
    return isString(param);
};

const isOccupation = (param: string) => {
    return isString(param);
}

const parseName = (text: string): string => {
    if (!isString(text)) {
        throw new Error('Wrong or missing name: ' + text);
    } else {
        return text;
    }
};

const parseDate = (date: string): string => {
    if (!isDate(date)) {
        throw new Error('Wrong or missing date: ' + date);
    } else {
        return date;
    }
};

const parseGender = (gender: string) => {
    if (!isGender(gender)) {
        throw new Error('Wrong or missing gender: ' + gender);
    } else {
        return gender;
    }
};

const parseSsn = (ssn: string) => {
    if (!isSsn) {
        throw new Error('Wrong or missing SSN: ' + ssn);
    } else {
        return ssn;
    }
};

const parseOccupation = (occupation: string) => {
    if (!isOccupation(occupation)) {
        throw new Error('Wrong or missing Occupation: ' + occupation);
    } else {
        return occupation;
    }
}

export const toNewPatient = (object: any) => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation)
    }
    return newPatient;
}