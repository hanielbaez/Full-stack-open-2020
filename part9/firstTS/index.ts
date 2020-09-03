import express = require('express');
import bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

import calculateBMI from './calculateBmi';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack');
})

app.get('/bmi', (request, response) => {
    const { weight, height } = request.query;
    let bmi;
    try {
        bmi = calculateBMI(String(weight), String(height))
    } catch (error) {
        response.status(400).json({ error: "malformatted parameters" })
    }
    response.send(bmi)
})

app.post('/exercises', (request, response) => {
    const body = request.body;
    let result;
    try {
        result = calculateExercises(body.daily_exercises, body.target);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
    return response.json(result);
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`🚀 App ready on port ${PORT}`)
})