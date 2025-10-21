
export default async function handler(req, res) {
  try {
    const path = req.url.replace(/^\/api/, ""); // يحذف /api
    const response = await fetch(`http://16.171.133.67:8080${path}`, {
      method: req.method,
      headers: req.headers
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      // لو السيرفر رجع HTML أو نص، نرجعه كما هو
      const text = await response.text();
      res.status(response.status).send(text);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from backend" });
  }
}
