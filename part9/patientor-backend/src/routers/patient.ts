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
});

router.get('/:id', (request, response) => {
    let patientFound = patientService.get(request.params.id);
    if (patientFound) {
        response.send(patientFound);
    } else {
        response.status(404).send({ error: patientFound });
    }
})

export default router;