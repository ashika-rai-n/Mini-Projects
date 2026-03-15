# 🗓️ Daily Focus Planner

A simple and clean **Daily Focus Planner** built using **HTML, CSS, and Vanilla JavaScript**.  
This mini project helps users plan daily tasks, track completion progress visually, and stay focused throughout the day.

---

## Features

- Add daily tasks with optional time
- Mark tasks as completed (toggle on/off)
- Re-activate completed tasks when needed
- Dynamic progress bar with completion percentage
- Color-coded progress indicator
- Delete individual tasks
- Clear all tasks at once
- Persistent data using browser `localStorage`
- Clean and responsive UI

---

## Progress Bar Logic

The progress bar automatically updates based on task completion:

| Completion Range | Color |
|------------------|-------|
| 0–25% | 🔴 Red |
| 25–50% | 🟠 Orange |
| 50–80% | 🟡 Yellow |
| 80–100% | 🟢 Green |

---

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla)
- Browser LocalStorage

> No frameworks, libraries, or backend required.

---

## Project Structure

```text
daily-focus-planner/
├── index.html
├── style.css
├── script.js
└── README.md

```
---

## How to Run

1. Clone the repository
2. Navigate to the `daily-focus-planner` folder
3. Open `index.html` in a web browser

No additional setup required.

---

## How It Works

- Tasks are stored locally using `localStorage`
- Clicking a task toggles its completed state
- Progress bar updates in real-time
- All data persists after page refresh

---

## License

This project follows the same license as the main repository.
