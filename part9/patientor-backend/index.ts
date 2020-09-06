import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());

app.get('/api/ping', (_request, response) => {
    console.log('hola');
    response.status(200).send('pong');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}`)
})