interface BMIValues {
    height: number;
    weight: number;
}
const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[3]),
        weight: Number(args[2])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (w: number, h: number) : string => {
    const bmiHeight = h/100;
    const bmi: number = w / Math.pow(bmiHeight,2);
    if(bmi < 16){
        return "Underweight (Severe thinness)";
    }
    if(bmi > 18.5 && bmi <= 24.9){
        return "Normal (healthy weight)";
    }
    if(bmi >= 25 && bmi <= 29.9){
        return "Obese (unhealthy weight)";
    }
    if(bmi >= 30 && bmi <= 34.9){
        return "Obese (unhealthy weight)";
    }
    return "Can't calculate BMI";
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height,weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

