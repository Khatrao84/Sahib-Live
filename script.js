async function loadChannel(channelId) {
  const res = await fetch(`/api/live?channel=${channelId}`);
  const data = await res.json();
  if (data.videoId) {
    IFRAME.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1&controls=0&fs=1`;
  } else {
    IFRAME.src = ""; // or show error
  }
}
