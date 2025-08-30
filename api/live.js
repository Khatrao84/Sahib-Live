// api/live.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { channelId } = req.query;

  if (!channelId) {
    return res.status(400).json({ error: "Missing channelId" });
  }

  const apiKey = process.env.YT_API_KEY; // Store in Vercel env
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return res.status(200).json({ videoId });
    } else {
      return res.status(404).json({ error: "No live video found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
