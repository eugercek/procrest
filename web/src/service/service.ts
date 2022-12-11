const BASE="http://localhost:8080"

export async function getAll(){
    return fetch(`${BASE}/proc`)
            .then(r => r.json())

}