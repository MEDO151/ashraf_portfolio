export default async function handler(req, res) {
  try {
    // هنجيب المسار اللي المستخدم طلبه
    const path = req.url.replace(/^\/api/, ""); // يحذف /api من الطلب
    const response = await fetch(`http://16.171.133.67:8080${path}`, {
      method: req.method, // GET, POST, PUT ...الخ
      headers: req.headers // لو في headers
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from backend" });
  }
}