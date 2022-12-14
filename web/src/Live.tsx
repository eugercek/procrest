import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Proc } from "./Proc";
import { ProcEntity } from "./types";
import { getCurrentProcs } from "./service/service";

export default function Live() {
  const [procs, setProcs] = useState<Array<ProcEntity>>();

  useEffect(() => {
    const fn = () => {
      getCurrentProcs()
        .then((ps) => setProcs(ps))
        .catch((err) => console.error(err));
    };

    fn();
    const interval = setInterval(fn, 1000);

    return () => clearInterval(interval);
  }, []);

  const trs = procs?.map((p) => <Proc {...p} />);

  return (
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
  );
}
