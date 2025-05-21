---
layout: post 
title: Leaderboard
search_exclude: true
permalink: /leaderboard/
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Leaderboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      background-color: #f4f4f4;
    }
    h1 {
      text-align: center;
    }
    table {
      width: 50%;
      margin: 0 auto;
      border-collapse: collapse;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background-color: white;
    }
    th, td {
      padding: 12px 16px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
    th {
      background-color: #007BFF;
      color: white;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
  </style>
</head>
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