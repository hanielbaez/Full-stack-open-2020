import express from 'express';
import patientService from '../services/patient';
const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientService.getAll());
})

export default router;