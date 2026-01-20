# STUDYIT - Smart Study & Focus Tracker
StudyIt is a simple and minimal web app that helps you manage study goals, track focused study time, and stay motivated without unnecessary complexity.

Built using HTML, CSS, and Vanilla JavaScript, this app runs completely in the browser and stores data locally (no backend needed).

Live Demo - https://aayushi262005.github.io/STUDYIT/

# Features
## Goal Management 

* Add multiple study goals with target time
* Select one active goal at a time
* Delete goals easily
* Active goal is visually highlighted

## Focus Timer

* Countdown timer linked to the selected goal
* Focus mode after timer started to avoid any distraction
* Start / Stop controls
* Beep sound when time completes
* Automatically tracks studied time per goal and update the progress

## Progress Tracking

* Individual progress bars for each goal
* Percentage based comparison  
* Total studied time calculated in real time
* Completed goals are visually dimmed

## Dark/Light Mode

* Toggle between dark and light mode
* Users preference is stored in local storage
* Implemented using css variables

## Daily Motivation Quote

* Fetches one random motivational quote on every reload
* 10 quotes are stored locally 

## Persistent Storage
* Goals, progress , and theme are saved in local storage until the reset button is pressed
* Data remains after refresh
* No backend required

## Responsive Design
* Fully responsive layout
* Opimized for mobile and desktop screens

# Tech Stack
HTML, CSS, JAVASCRIPT(ES6), GITHUB PAGES(for Deployment)

# Architecture Highlights
* Central goals[] state for managing goals
* Single active goal to enforce focus mode
* Timer logic seperated from UI rendering
* Utility functions for time formatting
* Daily-quotes stored in quotes[]

# How to Use

1. Enter a goal name

2. Set hours and minutes

3. Click Add Goal

4. Select a goal from the list

5. Click Start to begin studying

6. Track progress in real time

7. Reset anytime to clear all goals or clear goals individually  

All data is saved automatically in your browser.

# Key Learnings
* Timer and interval management
* DOM manipulation & event handling
* State handling with LocalStorage
* UI/UX improvements with animations
* Debugging GitHub Pages & caching issues

# Future Enhancements
* Pomodoro / break mode
* Daily & weekly analytics
* Custom notification sounds
* Cloud sync support
* Mobile-first UI improvements

## Author

**Aayushi**  
B.Tech – Computer Science & Engineering (AI) 














