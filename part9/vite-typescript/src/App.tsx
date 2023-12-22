const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Part[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface HeaderProps {
    header: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.header}</h1>
  }

  interface Part {
    name: string;
    exerciseCount: number;
  }

  interface PartProps {
    part: Part;
  }

  const Part: React.FC<PartProps> = ({ part }) => {
    return (
      <p>{part.name} {part.exerciseCount}</p>
    );
  };

  const Content: React.FC = () => {
    return (
      <div>
        {courseParts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </div>
    );
  };

  interface TotalNumber {
    totalExercises: number;
  }

  const Total = (props: TotalNumber) => {
    return <p>Number of exercises {props.totalExercises} </p>
  }

  return (
    <div>
      <Header header={courseName}/>
      <Content/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;