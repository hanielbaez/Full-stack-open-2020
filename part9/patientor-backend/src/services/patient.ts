import patienstData from '../../data/patients';
import { NoSensitiveDiaryEntry } from '../../types';

const getAll = (): NoSensitiveDiaryEntry [] => {
    return patienstData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export default {
    getAll
}