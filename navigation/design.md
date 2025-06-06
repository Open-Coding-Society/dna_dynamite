---
layout: template
title: Design Documentation
description: Design Documentation
permalink: /design/
comments: True
categories: ['Documentation']
---

<section class="bg-white dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">Design Timeline</h2>
    <div class="relative border-l-2 border-blue-500 dark:border-blue-400 pl-6">
      <div class="mb-10 ml-4">
        <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Phase 1: Research</h3>
        <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">Initial brainstorming, used the illumina template to learn more about the company and what the project was intended. We deepdived into the goals of illumina to correctly create a game that reflected these values.</p>
      </div>
      <div class="mb-10 ml-4">
        <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Phase 2: Prototyping</h3>
        <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">Wireframing UI components, planning interactivity, and defining backend endpoints. We started off by drawing individual parts of the game on the whiteboard and then connecting them together to create one big final whiteboard design. As we progress on making the code for the game we chaged the desing and made a more professional prototype of the game on canva. As we wrapped up making the game there were a few changed but our intial ideas were still leading and present.</p>
      </div>
      <div class="mb-10 ml-4">
        <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Phase 3: Development</h3>
        <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">Implementing the game loop, animation logic, and backend API integration. Each person in the team worked together but on indiviual parts, broken up, to create various features and aspects of the game. When each part was created, like the trivia quiz, hearts, DNA strands, and leaderbaords were working on their own; they were then connected and merged. After sucessfully making sure the game worked together we added each part to create one big "featutre" that a user could play as the DNA dynamite game. </p>
      </div>
      <div class="ml-4">
        <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Phase 4: Testing & Launch</h3>
        <p class="mt-2 text-sm text-slate-700 dark:text-slate-300">QA testing, fixing visual bugs, final documentation, and public release. The team spent around 2 weeks + working out kinks and bugs that they ran into. After a few weeks of fixing up errors and small design changes the game was much more polished and ready to be deployed and presented.</p>
      </div>
    </div>
  </div>
</section>


[Research Document](https://docs.google.com/document/d/1oyEFSuPFLYM3J4kuFYy8XcNMKZlOs_P2U3g7teWJG_U/edit?tab=t.0)

---

# Original UI Design:

<img src="{{site.baseurl}}/images/dna-dynamite/gamedesign.png" width="200" height="300">


# Updated UI Design (Post Stand-Up Meeting):

<img src="{{site.baseurl}}/images/dna-dynamite/updatedesign.png" width="300" height="400">

---

# Overall Design Changes:

Over time, our design evolved to become more practical and space-efficient. Key changes included:


 - Relocating the hearts (lives) indicator to the side of the screen to maximize gameplay area.


    - Enlarging the game display to fill most of the screen.


    - Adding **Instructions**, **Start**, **Stop**, and **Pause** buttons to improve user accessibility and gameplay experience.

---

# Current Design: 

<img src="{{site.baseurl}}/images/dna-dynamite/dnadynamite.png" width="100%">

- Hearts were moved and enlarged as well as an implemented breaking glass sound with each life lost

- Leaderboard was added with stored logins and scores, changing each time a high score is reached

- Typing functionality instead of a drag and drop

- More sound effects and popups added for highscore, quiz, and instructions


<style>
    p {
        color: black
    }
    li {
        color: black
    }
</style>
