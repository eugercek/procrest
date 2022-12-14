import { v4 as uuidv4 } from "uuid";
import { ProcEntity } from "./types";

export function Proc(proc: ProcEntity) {
  const commandStyle = {
    maxWidth: "300px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  return (
    <tr key={uuidv4()}>
      <td>{proc.pid}</td>
      <td style={commandStyle}>{proc.command}</td>
      <td>{proc.userName}</td>
    </tr>
  );
}
