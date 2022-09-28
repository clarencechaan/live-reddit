import { fetchToken } from "./auth";

async function fetchThread(threadId) {
  const token = await fetchToken();
  const url = `https://oauth.reddit.com/comments/${threadId}/?sort=new`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const thread = await res.json();
    return thread;
  } catch (error) {
    console.log("error", error);
  }
}

export { fetchThread };
