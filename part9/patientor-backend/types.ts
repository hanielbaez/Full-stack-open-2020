export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export enum Gender { 
    Male = 'male',
    Female = 'female'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: "male" | "female",
    ssn: string,
    occupation?: string
}

export type NoSensitiveDiaryEntry = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;