const Total = ({parts}) => {
    const totalExercises = parts.reduce(function(sum,part){
        return sum + part.exercises
    },0)
    return(
      <p>Number of exercises {totalExercises}</p>
    )
};

export default Total