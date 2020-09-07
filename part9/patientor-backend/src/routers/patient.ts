import express from 'express';
import patientService from '../services/patient';
import { toNewPatient } from '../utilities/patient';
const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getAll());
});

router.post('/', (request, response) => {
    try {
        const newPatient = toNewPatient(request.body);
        const addedPatient = patientService.add(newPatient);
        response.send(addedPatient);
    } catch (error) {
        console.log(error);
    }
})

export default router;