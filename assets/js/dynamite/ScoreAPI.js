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

    const data = await response.json(); // ✅ only call this once

    if (!response.ok) {
      console.error("Failed to update high score:", data);
      return { high_score_updated: false };
    }

    console.log("High score updated:", data);
    return data; // expect { high_score_updated: true }
  } catch (err) {
    console.error("Error submitting high score:", err);
    return { high_score_updated: false };
  }
}
  