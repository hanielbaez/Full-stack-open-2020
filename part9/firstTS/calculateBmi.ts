interface resultParse {
    weight: number,
    height: number
}

const parseArguments = (weight: any, height: any): resultParse => {
    const value1 = Number(weight);
    const value2 = Number(height);

    if (isNaN(value1) || isNaN(value2)) {
        throw new Error('Error arguments are not type number');
    }
    return { weight: value1, height: value2 }
}

interface bmiResult {
    weight: number,
    height: number,
    bmi: string
}

function calculateBMI(weight: string, height: string): bmiResult {

    const parse = parseArguments(weight, height);

    let result = {
        weight: parse.weight,
        height: parse.height,
        bmi: 'n/a'
    };

    const bmi = parse.weight / Math.sqrt(parse.height);
    if (bmi < 18.5) {
        result.bmi = 'Underweight (unhealthy weight)';
    } else if (bmi >= 18.5 && bmi <= 25) {
        result.bmi = 'Normal (healthy weight)'
    } else if (bmi > 25 && bmi < 30) {
        result.bmi = 'Overweight (unhealthy weight)';
    } else {
        result.bmi = 'Obesity (unhealthy weight)';
    }
    return result;
}

export default calculateBMI;

// const { weight, height } = parseArguments(process.argv)
// console.log(calculateBmi(weight, height))