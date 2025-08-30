export default async function handler(req, res) {
  const { channel } = req.query;
  const API_KEY = process.env.YT_API_KEY;

  if (!channel) {
    return res.status(400).json({ error: "Channel ID required" });
  }

  try {
    // Fetch ALL live videos from this channel
    const resp = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channel}&type=video&eventType=live&maxResults=5&key=${API_KEY}`
    );
    const data = await resp.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: "No live streams found" });
    }

    // Collect all video IDs
    const videoIds = data.items.map((item) => item.id.videoId);

    // Fetch details for all of them
    const videoResp = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds.join(",")}&key=${API_KEY}`
    );
    const videoData = await videoResp.json();

    const videos = videoData.items.map((v) => ({
      videoId: v.id,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
    }));

    res.status(200).json({ videos });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
