# GitHub Copilot Beginner Demo: Classic Pong

This repo is a lightweight React demo for teaching the basics of GitHub Copilot, VS Code, and agent-assisted coding. The app starts as a playable modern take on classic Pong, with a few intentional gaps left in comments so an instructor can demonstrate Copilot in the editor.

## What Learners Will See

- A React app built with JavaScript, HTML, and CSS.
- A playable Pong game rendered on an HTML canvas.
- Beginner-friendly places to ask Copilot for help.
- A natural path from small editor assistance to larger agent-mode changes.

## Run The Demo

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Teaching Flow

1. Open [src/App.jsx](src/App.jsx) and explain the rough shape of the app: constants, game state, keyboard input, canvas drawing, and React controls.
2. Start with inline assistance. Use the `Demo TODO` comments to add a speed adjustment slider manually with Copilot suggestions.
3. Use Copilot Chat to ask for a small explanation of how collision detection works.
4. Switch to agent mode and ask Copilot to change the ball into a GitHub Copilot-themed mark or logo treatment.
5. Continue in agent mode and ask for polished visual animations, such as paddle hit sparks, score transitions, or a countdown after each point.
6. Review the diff with the class and discuss what changed, what to verify, and how to keep generated code understandable.

## Suggested Prompts

Use these as live examples, editing them to match the class pace:

```text
Explain this React component to someone new to JavaScript and React.
```

```text
Add React state for a Pong speed slider from 3 to 12 with a default of 6.
```

```text
Create an accessible slider labeled Ball speed and wire it to the speed state.
```

```text
In agent mode, replace the simple Pong ball with a GitHub Copilot-inspired logo treatment while keeping the game playable.
```

```text
In agent mode, add tasteful arcade animations when the ball hits a paddle or a player scores. Keep the app lightweight.
```

## Files To Highlight

- [src/App.jsx](src/App.jsx): main game logic and intentional demo TODO comments.
- [src/styles.css](src/styles.css): responsive layout and visual styling.
- [docs/instructor-guide.md](docs/instructor-guide.md): step-by-step teaching script.

## Notes For Sharing

This project intentionally keeps dependencies small: React, React DOM, Vite, and the Vite React plugin. It is meant to be readable for beginners and easy to reset between class runs.
