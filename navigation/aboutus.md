---
layout: aboutustemplate
title: About Us 
description: Connect with the Developers!
permalink: /team/
toc: false
---

<div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeSlideIn">
  {% assign people = site.data.people %}
  {% for person in people %}
  <div class="border border-red-300 rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 bg-white dark:bg-slate-800">
    <h2 class="text-xl font-bold text-center text-red-600 mb-4">{{ person.name }}</h2>
    <ul class="text-sm space-y-2 text-slate-800 dark:text-slate-200">
      <li><strong>School:</strong> {{ person.school }}</li>
      <li><strong>Email:</strong> <a href="mailto:{{ person.email }}" class="text-blue-500 hover:underline">{{ person.email }}</a></li>
      <li>
        <a href="{{ person.linkedin }}" class="flex items-center text-blue-600 hover:underline" target="_blank" rel="noopener">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="{{ person.github }}" class="flex items-center text-gray-700 hover:underline" target="_blank" rel="noopener">
          GitHub
        </a>
      </li>
    </ul>
  </div>
  {% endfor %}
</div>
