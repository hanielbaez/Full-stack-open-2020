import diagnosestData from '../../data/diagnoses';
import { Diagnose } from '../../types';

const getAll = (): Diagnose[] => {
    return diagnosestData;
};

export default {
    getAll
};