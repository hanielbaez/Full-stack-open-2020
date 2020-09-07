import express from 'express';
const router = express.Router();
import diagnoseService from '../services/diagnose';

router.get('/', (_request, response) => {
    response.send(diagnoseService.getAll());
});

export default router;