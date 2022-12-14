import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const style = {
  marginLeft: "50px",
  marginRight: "700px",
};

export function AddSnapshot({ save: cb }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div style={style}>
      <Form className="mt-3 ml-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Snapshot name</Form.Label>
          <Form.Control type="name" onChange={(t) => setName(t.target.value)} />

          <Form.Text className="text-muted">Use a descriptive name!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: "100px" }}
            onChange={(t) => setDesc(t.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit" onClick={() => cb(name, desc)}>
          Add
        </Button>
      </Form>
    </div>
  );
}
