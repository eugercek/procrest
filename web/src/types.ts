export interface ProcEntity {
  pid: number;
  command: string;
  argument: string;
  start: Date;
  duration: string;
  userName: string;
  alive: boolean;
}

export interface SnapshotEntity {
  id: number;
  name: string;
  description: string;
  procs: Array<ProcEntity>;
}
