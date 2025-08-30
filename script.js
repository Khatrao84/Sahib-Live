let currentChannel = 0;
let currentStream = 0;
let allChannels = [
  { id: "UC3nqw1kd4AK1q9e68YUoLDQ", name: "Patna Sahib LIVE" },
  { id: "UCYn6UEtQ771a_OWSiNBoG8w", name: "Amritsar Sahib LIVE" },
  { id: "UCuerQ47I9Y2qxr4eIopxbYw", name: "Hazur Sahib LIVE" },
  { id: "UCA1Jqo-WXVuMgs4WcD5f5Yw", name: "Bangla Sahib LIVE" },
  { id: "UCudVHqnOekwcvpzNpY8_ERw", name: "Fatehgarh Sahib LIVE" },
];
let streams = []; // store live streams for current channel

async function loadChannel(index) {
  currentChannel = index;
  currentStream = 0;
  const channel = allChannels[index];
  const res = await fetch(`/api/live?channel=${channel.id}`);
  const data = await res.json();

  if (data.error) {
    document.getElementById("videoFrame").src = "";
    document.getElementById("channelName").innerText =
      channel.name + " (offline)";
    streams = [];
    return;
  }

  streams = data.videos;
  playStream(0);
}

function playStream(index) {
  if (!streams.length) return;
  currentStream = index % streams.length;
  const video = streams[currentStream];
  document.getElementById(
    "videoFrame"
  ).src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=0&controls=0`;
  document.getElementById("channelName").innerText =
    allChannels[currentChannel].name + " - " + video.title;
}

// when clicking video → next channel
document.getElementById("overlay").onclick = () => {
  loadChannel((currentChannel + 1) % allChannels.length);
};

// if you want a button for next stream inside same channel
document.getElementById("nextStreamBtn").onclick = () => {
  playStream(currentStream + 1);
};

// initial load
loadChannel(0);
