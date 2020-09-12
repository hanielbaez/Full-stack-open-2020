import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnose';
import patientRouter from './routers/patient';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_request, response) => {
    response.status(200).send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}`);
});