import Alert from "react-bootstrap/Alert";

function UpdateAlert() {
  return (
    <>
      <Alert
        variant="danger"
        className="mt-2"
        style={{
          margin: "50px",
        }}
      >
        <p>Item Updated Successfully!</p>
      </Alert>
    </>
  );
}

export default UpdateAlert;
