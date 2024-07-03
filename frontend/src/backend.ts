import axios from 'axios'
export const api = import.meta.env.VITE_API_URL


export async function fetchArtisans(page: number) {
  const response = await axios.get(`${api}/api/artisans?page=${page}`)
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

export async function fetchPlazaNew(page: number) {
    const response = await axios.get(`${api}/api/plaza/popular?page=${page}`)
    return response.data
}

export async function fetchSearch(type: string, query: string, page: number) {
    if (type === 'miis') {
        const response = await axios.post(`${api}/api/plaza/search?page=${page}`, {
            search: query
        })
        return response.data
    } else if (type === 'artisans') {
        const response = await axios.post(`${api}/api/artisans/search?page=${page}`, {
            search: query
        })
        return response.data
    }
}

export async function fetchArtisan(artisan_id: string, page: number) {
    const response = await axios.post(`${api}/api/artisans/artisan?page=${page}`, {
        artisan_id: artisan_id
    })
    return response.data
}

export async function fetchContest(contest_id: number, page: number) {
    const response = await axios.post(`${api}/api/contests/contest?page=${page}`, {
        contest_id: contest_id
    })
    return response.data
}

export async function fetchMii(entry_id: number) {
    const response = await axios.post(`${api}/api/plaza/mii`, {
        entry_id: entry_id
    })
    return response.data
}


export function renderMii(base64String: string) {
  // Decode base64 string
  const binaryString = atob(base64String)
  const binaryLen = binaryString.length
  // Create binary array from base64 decoded string
  const bytes = new Uint8Array(binaryLen)
  // Fill the binary array
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }

  // Create a blob object
  const blob = new Blob([bytes], { type: 'application/octet-stream' })

  // Create a file object from the blob
  const file = new File([blob], 'file.miigx')

  // Send the file to the server
  const formData = new FormData()
  formData.append('platform', 'wii')
  formData.append('data', file)

  // Use larsen's funky studio.cgi to get the data needed to render the mii
  return fetch('https://miicontestp.wii.rc24.xyz/cgi-bin/studio.cgi', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      const mii = data.mii

      // Render the mii using Nintendo's servers
      const src =
        'https://studio.mii.nintendo.com/miis/image.png?data=' +
        mii +
        '&type=face_only&expression=normal&width=270&bgColor=FFFFFF00'

      // Return the mii image
      return src
    })
}

export function downloadMii(name: string | [number, number], mii_data: any) {
      const blob = new Blob([mii_data], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      if (typeof name === 'string') {
        a.download = `${name}.mii`;
      } else if (Array.isArray(name) && name.length === 2) {
        a.download = `Contest_${name[0]}_${name[1]}.mii`;
      }
      
      document.body.appendChild(a)
      a.click()

      window.URL.revokeObjectURL(url)
      a.remove()
    }

export function formatWiiNumber(wii_number: number) {
  return wii_number.toString().padStart(15, '0').replace(/(\d{4})(?=\d)/g, '$1-');
}