import axios from 'axios'
export const api = import.meta.env.VITE_API_URL


export async function fetchArtisans() {
  const response = await axios.get(`${api}/api/artisans`)
  return response.data
}

export async function fetchContests() {
    const response = await axios.get(`${api}/api/contests`)
    return response.data
}

export async function fetchPlaza() {
  const response = await axios.get(`${api}/api/plaza/all`)
  return response.data
}

export async function fetchPlazaTop() {
    const response = await axios.get(`${api}/api/plaza/top`)
    return response.data
}

export async function fetchPlazaNew() {
    const response = await axios.get(`${api}/api/plaza/popular`)
    return response.data
}

export async function fetchSearch(type: string, query: string) {
    if (type === 'miis') {
        const response = await axios.post(`${api}/api/plaza/search`, {
            search: query
        })
        return response.data
    } else if (type === 'artisans') {
        const response = await axios.post(`${api}/api/artisans/search`, {
            wii_number: query
        })
        return response.data
    }
}
