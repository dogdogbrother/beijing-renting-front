import axios from 'axios'

export async function getGaodeSite(keywords) {
  const { data } = await axios.get("https://restapi.amap.com/v3/assistant/inputtips", {params: {
    key: "4fb4ccdb42fc6d32764e91a17b805776",
    keywords,
    city: "010",
    citylimit: true
  }})
  return data?.tips || []
}