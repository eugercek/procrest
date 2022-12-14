import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { AddSnapshot } from "./AddSnapshot";
import { deleteSnapshot, getSnapshots, postSnapshot } from "./service/service";
import { SnapshotView } from "./SnapshotView";
import { SnapshotEntity } from "./types";

const style = {
  display: "flex",
  gap: "10px",
};

const center = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  marginTop: "100px",
};

enum State {
  welcome,
  added,
  removed,
  view,
}

const Welcome = () => (
  <div>
    <h1>Snapshot Viewer</h1>
    <h3>There are three functionality you can do</h3>
    <ul>
      <li>Add new snapshot: Create a snapshot of your system and save it</li>
      <li>Delete snapshot: Delete a previously added snapshot</li>
      <li>View snapshot: View a previously saved snapshot</li>
    </ul>
  </div>
);

export default function Snapshot() {
  const [snapshots, setSnapshots] = useState<Array<SnapshotEntity>>();
  const [state, setState] = useState<State>(State.welcome);
  const [cur, setCur] = useState<SnapshotEntity>();

  useEffect(() => {
    getSnapshots()
      .then((sns) => setSnapshots(sns))
      .catch((err) => console.error(err));
  }, []);

  async function addWrap(name: string, desc: string) {
    let obj = await postSnapshot(name, desc);
    obj.procs.sort((a, b) => a.pid - b.pid);

    const sns = await getSnapshots();

    setCur(obj);
    setSnapshots(sns);
    setState(State.view);
  }

  async function deleteWrap(id: number) {
    await deleteSnapshot(id);
    const sns = await getSnapshots();

    setSnapshots(sns);
    setState(State.removed);
  }

  return (
    <div>
      <div style={style}>
        <Button variant="success" onClick={() => setState(State.added)}>
          Add Snapshot
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic">
            Delete snapshot
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {snapshots?.map((s) => (
              <Dropdown.Item onClick={() => deleteWrap(s.id)}>
                {s.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            View Snapshot
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {snapshots?.map((s) => (
              <Dropdown.Item
                onClick={() => {
                  setState(State.view);
                  setCur(s);
                }}
              >
                {s.name}{" "}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {state == State.welcome && (
        <div style={center}>
          <Welcome />
        </div>
      )}

      {state == State.added && <AddSnapshot save={addWrap} />}
      {/* {state == State.removed && <AddSnapshot save={addWrap} />} */}
      {state == State.view && (
        <SnapshotView
          name={cur?.name}
          desc={cur?.description}
          procs={cur?.procs}
        />
      )}
      {state == State.removed && <Alert variant="alert">Deleted!</Alert>}
    </div>
  );
}
