interface traininResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface parceResult {
    trainingDays: Array<number>,
    target: number
}

function parseArgumentsExercises(args: Array<string>): parceResult {
    const trainingDays = args.slice(3).map(day => Number(day));
    const target = Number(args[2]);

    if (!isNaN(target) && trainingDays.every(day => !isNaN(day))) {
        return { trainingDays: trainingDays, target: Number(target) }
    } else {
        throw new Error('Error arguments are no type number')
    }
}

function calculateExercises(arr: Array<number>, target: number): traininResult {

    const averageTraining = arr.reduce((a, b) => a + b) / arr.length;
    let rating;
    if (averageTraining < target / 2) {
        rating = 1;
    } else if (averageTraining === target / 2) {
        rating = 2;
    } else {
        rating = 3;
    }

    return {
        periodLength: arr.length,
        trainingDays: arr.filter(training => training != 0).length,
        success: arr.every(training => training >= target),
        rating,
        ratingDescription: rating === 1 ? 'poor performace' :
            rating === 2 ? 'not too bad but could be better' : 'good job, hard work always pays off',
        target: target,
        average: averageTraining
    }
}

const { trainingDays, target } = parseArgumentsExercises(process.argv)
console.log(calculateExercises(trainingDays, target))