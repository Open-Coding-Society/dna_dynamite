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
        const tbody = document.querySelector('#leaderboard tbody');

        // Sort by score, descending
        data.sort((a, b) => b.score - a.score);

        data.forEach(entry => {
          const row = document.createElement('tr');

          const userCell = document.createElement('td');
          userCell.textContent = entry.user_id;

          const scoreCell = document.createElement('td');
          scoreCell.textContent = entry.score;

          row.appendChild(userCell);
          row.appendChild(scoreCell);
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
      });
  </script>

</body>
</html>