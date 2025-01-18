import { useParams } from "react-router-dom";

const StudentUpdate = () => {
  const { studentId } = useParams();

  return (
    <div>
      <h1> This is Student Details of {studentId} </h1>
    </div>
  );
};

export default StudentUpdate;
