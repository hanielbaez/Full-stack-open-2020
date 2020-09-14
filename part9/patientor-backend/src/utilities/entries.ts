import { BaseEntry, HealthCheckRating } from '../../types';

const isString = (param: string): boolean => {
    return typeof param === 'string';
};

const parseDescription = (description: string) => {
    if (isString(description)) {
        return description;
    } else {
        throw new Error('Wrong or missing description: ' + description);
    }
};

const parseDate = (date: string) => {
    if (isString(date)) {
        return date;
    } else {
        throw new Error('Wrong or missing date: ' + date);
    }
};

const parseSpecialist = (specialist: string) => {
    if (isString(specialist)) {
        return specialist;
    } else {
        throw new Error('Wrong or missing specialist: ' + specialist);
    }
};

const parseDiagnosisCode = (diagnosis: string[]) => {
    return diagnosis;
}

const parseHealthRating = (healthRating: any): HealthCheckRating => {
    if (healthRating >= 0 && healthRating <= 3) {
        return healthRating;
    } else {
        throw new Error('Wrong or missing Health Rating: ' + healthRating);
    }
}

const parseDischarge = (discharge: { date: string, criteria: string }) => {
    if (isString(discharge.date) && isString(discharge.criteria)) {
        return discharge;
    } else {
        throw new Error('Wrong or missing Discharge: ' + discharge);
    }
}

const parseEmployerName = (name: string) => {
    if (isString(name)) {
        return name;
    } else {
        throw new Error('Wrong or missing name: ' + name);
    }
}

const baseEntryParse = (object: any): Omit<BaseEntry, 'id'> => {
    return {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
    }
};

export const toNewEntry = (object: any) => {
    switch (object.type) {
        case "HealthCheck":
            return {
                ...baseEntryParse(object),
                type: "HealthCheck",
                healthCheckRating: parseHealthRating(object.healthCheckRating)
            };
        case "Hospital":
            return {
                ...baseEntryParse(object),
                type: "Hospital",
                discharge: parseDischarge(object.discharge)
            };
        case "OccupationalHealthcare":
            return {
                ...baseEntryParse(object),
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(object.employerName),
                sickLeave: object.sickLeave
            }
        default:
            throw new Error('Wrong or missing entry: ' + object);
    }
};