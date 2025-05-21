---
layout: post 
title: Leaderboard
search_exclude: true
permalink: /leaderboard/
---

<html lang="en">
<body>

  <table id="leaderboard">
    <thead>
      <tr>
        <th>User ID</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <!-- Rows will be inserted here -->
    </tbody>
  </table>

  <script>
    fetch('http://127.0.0.1:3434/api/score/all_users')
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
      });
  </script>

</body>
</html>