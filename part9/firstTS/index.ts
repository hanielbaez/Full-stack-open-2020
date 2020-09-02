import express = require('express');
const app = express();

import calculateBMI from './calculateBmi';

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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`🚀 App ready on port ${PORT}`)
})