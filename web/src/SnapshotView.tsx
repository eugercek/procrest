import { Table } from "react-bootstrap";
import { Proc } from "./Proc";
import { SnapshotEntity } from "./types";

export function SnapshotView({ name, desc, procs }) {
  const trs = procs?.map((p) => <Proc {...p} />);
  return (
    <div>
      <h1>{name}</h1>
      <p>{desc}</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>pid</th>
            <th>command</th>
            <th>user</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </Table>
    </div>
  );
}
