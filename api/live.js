export default async function handler(req, res) {
  const { channel } = req.query;
  const API_KEY = process.env.YT_API_KEY;

  if (!channel) {
    return res.status(400).json({ error: "Channel ID required" });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&eventType=live&type=video&key=${API_KEY}`;
    const response = await fetch(url);   // ✅ Works in Vercel
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      res.status(200).json({ videoId: data.items[0].id.videoId });
    } else {
      res.status(404).json({ error: "No live video found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
