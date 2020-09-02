interface resultParse {
    weight: number,
    height: number
}

const parseArguments = (args: Array<string>): resultParse => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments')

    const value1 = Number(args[2]);
    const value2 = Number(args[3]);

    if (isNaN(value1) && isNaN(value2)) {
        throw new Error('Error arguments are not type number');
    }
    return { weight: value1, height: value2 }
}

function calculateBmi(weight: number, height: number): string {
    const bmi = weight / Math.sqrt(height);
    if (bmi < 18.5) {
        return 'Underweight (unhealthy weight)';
    } else if (bmi >= 18.5 && bmi <= 25) {
        return 'Normal (healthy weight)'
    } else if (bmi > 25 && bmi < 30) {
        return 'Overweight (unhealthy weight)';
    } else {
        return 'Obesity (unhealthy weight)';
    }
}

const { weight, height } = parseArguments(process.argv)
console.log(calculateBmi(weight, height))