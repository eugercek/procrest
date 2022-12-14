import { SnapshotEntity } from "../types";

const BASE = "http://localhost:8080"; // Vite is weird with origin:

export async function getCurrentProcs() {
  const procs = await fetch(`${BASE}/procs`).then((r) => r.json());

  procs.sort((a, b) => a.pid - b.pid);

  return procs;
}

export async function getSnapshots() {
  let sns = await fetch(`${BASE}/snapshots`).then((r) => r.json());

  for (let sn of sns) {
    sn.procs.sort((a, b) => a.pid - b.pid);
  }

  return sns;
}

export async function getSnapshot(id: number) {
  return fetch(`${BASE}/snapshots/${id}`).then((r) => r.json());
}

export async function postSnapshot(name: string, desc: string) {
  return fetch(`${BASE}/snapshots`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description: desc,
    }),
  }).then((r) => r.json());
}

export async function deleteSnapshot(id: number) {
  return fetch(`${BASE}/snapshots/${id}`, {
    method: "DELETE",
  });
}
