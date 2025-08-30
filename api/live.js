export default async function handler(req, res) {
  const { channelId } = req.query;
  const API_KEY = process.env.YT_API_KEY; // add in Vercel dashboard

  if (!channelId) {
    return res.status(400).json({ error: 'Missing channelId' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${API_KEY}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'No live video found' });
    }

    // Pick the first live video
    const videoId = data.items[0].id.videoId;
    return res.status(200).json({ videoId });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch live video' });
  }
}
