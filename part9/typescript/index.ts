import express from "express";
import bodyParser from "body-parser";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/hello',(_req,res) => {
    res.send('Hello FullStack!');
});

app.get('/bmi',(req,res) => {
    if(!req.query.weight || !req.query.height){
        return res.status(400).json({error: "malformatted parameters"});
    }
    if(isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))){
        return res.status(400).json({error: "malformatted parameters"});
    }
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(weight,height);
    return res.status(200).json({weight: `${weight}`, height: `${height}`, bmi: `${bmi}`});
});

app.post('/exercises', (req,res) => {
    if(!req.body.target || !req.body.daily_exercises){
        return res.status(400).json({error: "missing parameters"});
    }
    if(isNaN(Number(req.body.target))){
        return res.status(400).json({error: "malformatted parameters"});
    }
    const target = req.body.target;
    const values = req.body.daily_exercises;
    const exercises = calculateExercises(values,target);
    return res.status(200).json(
        {
            periodLenght:`${exercises.periodLength}`,
            trainingDays: `${exercises.trainingDays}`,
            success: `${exercises.success}`,
            rating: `${exercises.rating}`,
            ratingDescription: `${exercises.ratingDescription}`,
            target: `${exercises.target}`,
            average: `${exercises.average}`
        });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});