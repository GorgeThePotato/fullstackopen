interface ResultValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (values:number[], t:number) : ResultValues =>{
    const periodLength = values.length;
    const trainingDays = values.filter(x => x != 0).length;
    const target = t;
    const average = values.reduce((a,b) => a + b,0)/ values.length;
    const success = average > target ? true : false
    const rating = Math.floor(Math.random() * 4)
    let ratingDescription = ""
    if(rating >= 0 && rating <= 1){
        ratingDescription = "Needs improvement!"
    }
    if(rating >= 1 && rating <= 2){
        ratingDescription = "Not too bad but could be better"
    }
    if(rating >= 2 && rating <= 3){
        ratingDescription = "Impressive!"
    }

    return {
        periodLength:periodLength,
        trainingDays:trainingDays,
        target:target,
        success:success,
        rating:rating,
        ratingDescription: ratingDescription,
        average:average
    }
}
const argValues: string[] = process.argv.slice(2,process.argv.length);
const numValues = argValues.map(i=>Number(i));
const target: number = Number(process.argv[2]);
console.log(calculateExercises(numValues,target));