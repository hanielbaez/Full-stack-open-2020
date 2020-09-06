import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnose';
import patientRouter from './routers/patient';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.get('/api/ping', (_request, response) => {
    console.log('hola');
    response.status(200).send('pong');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}`)
})