export default async function handler(request, response) {
  try {
    const res = await fetch("http://16.171.133.67:8080/seo");
    const data = await res.json();
    response.status(200).json(data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch from backend" });
  }
}