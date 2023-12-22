const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[];
    kind: "special";
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part: React.FC<CoursePart> = ({ name, exerciseCount, ...rest }) => {
    switch (rest.kind) {
      case "basic":
        return (
          <div>
            <h3>
              {name} ({exerciseCount} exercises)
            </h3>
            <p>{rest.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>
              {name} ({exerciseCount} exercises)
            </h3>
            <p>Group project count: {rest.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>
              {name} ({exerciseCount} exercises)
            </h3>
            <p>{rest.description}</p>
            <p>Background material: {rest.backgroundMaterial}</p>
          </div>
        );
        case "special":
          return(
            <div>
              <h3>
                {name} ({exerciseCount} exercises)
              </h3>
              <p>{rest.description}</p>
              <p>requiered skills: {rest.requirements.join(", ")}</p>
            </div>
          );
      default:
        return assertNever(rest);
    }
  };

  interface ContentProps {
    courseParts: CoursePart[];
  }
  
  const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map((part, index) => (
          <Part key={index} {...part} />
        ))}
      </div>
    );
  };
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface HeaderProps {
    header: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.header}</h1>
  }

  interface TotalNumber {
    totalExercises: number;
  }

  const Total = (props: TotalNumber) => {
    return <p>Number of exercises {props.totalExercises} </p>
  }

  return (
    <div>
      <Header header={courseName}/>
      <Content courseParts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;