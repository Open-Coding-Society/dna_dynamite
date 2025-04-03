---
layout: base
title: Login
permalink: /login
search_exclude: true
show_reading_time: false 
hide: true
---

<div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
    
    <!-- Login Card -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-6">User Login (Python/Flask)</h2>
      <form id="pythonForm" onsubmit="pythonLogin(); return false;" class="space-y-5">
        <div>
          <label for="uid" class="block text-gray-700 font-semibold mb-1">GitHub ID</label>
          <input type="text" id="uid" name="uid" required class="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-semibold mb-1">Password</label>
          <input type="password" id="password" name="password" required class="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Login</button>
        <p id="message" class="text-red-600 text-sm font-medium"></p>
      </form>
    </div>

    <!-- Signup Card -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold mb-6">Sign Up</h2>
      <form id="signupForm" onsubmit="signup(); return false;" class="space-y-5">
        <div>
          <label for="name" class="block text-gray-700 font-semibold mb-1">Name</label>
          <input type="text" id="name" name="name" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300">
        </div>
        <div>
          <label for="signupUid" class="block text-gray-700 font-semibold mb-1">GitHub ID</label>
          <input type="text" id="signupUid" name="signupUid" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300">
        </div>
        <div>
          <label for="signupPassword" class="block text-gray-700 font-semibold mb-1">Password</label>
          <input type="password" id="signupPassword" name="signupPassword" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300">
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">Sign Up</button>
        <p id="signupMessage" class="text-green-600 text-sm font-medium"></p>
      </form>
    </div>
    <!-- Return Home Button -->
    <div class="w-full text-center mt-8">
    <a href="{{ site.baseurl }}/" class="inline-block bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
        ⬅️ Return to Home
    </a>
    </div>

  </div>
</div>


<script type="module">
    import { login, pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    // Function to handle Python login
    window.pythonLogin = function() {
        const options = {
            URL: `${pythonURI}/api/authenticate`,
            callback: pythonDatabase,
            message: "message",
            method: "POST",
            cache: "no-cache",
            body: {
                uid: document.getElementById("uid").value,
                password: document.getElementById("password").value,
            }
        };
        login(options);
    }

    // Function to handle signup
    window.signup = function() {
    const signupButton = document.querySelector(".signup-card button");

    // Disable the button and change its color
    signupButton.disabled = true;
    signupButton.style.backgroundColor = '#d3d3d3'; // Light gray to indicate disabled state

    const signupOptions = {
        URL: `${pythonURI}/api/user`,
        method: "POST",
        cache: "no-cache",
        body: {
            name: document.getElementById("name").value,
            uid: document.getElementById("signupUid").value,
            password: document.getElementById("signupPassword").value,
        }
    };

    fetch(signupOptions.URL, {
        method: signupOptions.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupOptions.body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Signup failed: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("signupMessage").textContent = "Signup successful!";
        // Optionally redirect to login page or handle as needed
        // window.location.href = '{{site.baseurl}}/';
    })
    .catch(error => {
        console.error("Signup Error:", error);
        document.getElementById("signupMessage").textContent = `Signup Error: ${error.message}`;
        // Re-enable the button if there is an error
        signupButton.disabled = false;
        signupButton.style.backgroundColor = ''; // Reset to default color
    });
}


    // Function to fetch and display Python data
    function pythonDatabase() {
        const URL = `${pythonURI}/api/id`;

        fetch(URL, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Flask server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = '{{site.baseurl}}/';
            })
            .catch(error => {
                console.error("Python Database Error:", error);
                const errorMsg = `Python Database Error: ${error.message}`;
            });
    }

    // Call relevant database functions on the page load
    window.onload = function() {
         pythonDatabase();
    };
</script>
