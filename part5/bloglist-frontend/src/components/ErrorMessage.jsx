import { useSelector } from "react-redux";

const Error = () => {
  const error = useSelector((state) => state.error);
  if (error === null) {
    return null;
  }

  return <div className="error">{error}</div>;
};

export default Error;
