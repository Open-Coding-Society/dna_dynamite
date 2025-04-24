export async function submitHighScore(score, fetchOptions, pythonURI) {
  try {
    const response = await fetch(`${pythonURI}/api/score`, {
      ...fetchOptions,
      method: "PUT",
      headers: {
        ...fetchOptions.headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ score: score })
    });

    if (!response.ok) {
      console.error("Failed to update high score");
    } else {
      const data = await response.json();
      console.log("High score updated:", data);
    }
  } catch (err) {
    console.error("Error submitting high score:", err);
  }
}
