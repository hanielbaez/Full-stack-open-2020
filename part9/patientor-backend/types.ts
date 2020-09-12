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
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn: string;
    occupation?: string;
    entries: Entry[]
}

export interface BaseEntry {
    id: string;
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        data: string,
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NoSensitiveDiaryEntry = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

