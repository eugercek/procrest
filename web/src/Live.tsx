import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Proc } from "./Proc";
import { ProcEntity } from "./types";
import { getCurrentProcs } from "./service/service";

const topStyle = {
  position: "absolute",
  top: "50px",
  right: "100px",
  fontSize: 32,
};

const INTERVAL_TIME = 3000;

export default function Live() {
  const [procs, setProcs] = useState<Array<ProcEntity>>();
  const [count, setCounter] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fn = () => {
      getCurrentProcs()
        .then((ps) => setProcs(ps))
        .catch((err) => console.error(err));
      setCounter((prev, prop) => prev + INTERVAL_TIME / 1000);
    };

    fn();
    const interval = setInterval(fn, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, []);

  function queryEngine(proc: ProcEntity): boolean {
    const map = {
      user: "userName",
    };

    if (query == "") {
      return true;
    } else if (!query.includes("=")) {
      return proc.command.includes(query);
    } else if (query[query.length - 1] == "=") {
      // Not finished
      return true;
    }

    let elems = query.split(" ");

    for (let elem of elems) {
      if (elem.includes("=")) {
        const [type, val, ...r] = elem.split("=");

        if (proc[type] != val && proc[map[type]] != val) {
          console.log(type, val);
          return false;
        }
      }
    }

    let index = query.lastIndexOf("=");
    let after = query.substring(index + 1);
    let es = query.split(" ");

    // no command query is given
    if (es.length == 1) {
      return true;
    }

    return proc.command.includes(es[1]);
  }

  const trs = procs?.filter(queryEngine).map((p) => <Proc {...p} />);

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <div style={topStyle}>{count}</div>
      <h4>Total {procs?.length} processes</h4>
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
    </>
  );
}
