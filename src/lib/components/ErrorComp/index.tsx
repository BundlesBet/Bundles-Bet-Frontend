import { BiErrorAlt } from "react-icons/bi";

const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "30px",
        gap: "30px",
      }}
    >
      <BiErrorAlt size="100px" color="red" />
      <p>Some Error Encountered, Please Refresh Page</p>
    </div>
  );
};

export default Error;
