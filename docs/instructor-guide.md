# Instructor Guide

Use this guide to teach a beginner-friendly GitHub Copilot workflow with a small React game. The repo starts with a working app, then leaves clear places to demonstrate how Copilot can help in the editor and in agent mode.

## Setup Before Class

1. Open this folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev` and confirm the game opens in the browser.
4. Keep [src/App.jsx](../src/App.jsx) open before learners arrive.
5. Optional: reset any live demo edits before class by restoring your prepared starting point.

## Demo Arc

### 1. Orient Learners

Show the app first so learners have context. Then open [src/App.jsx](../src/App.jsx) and point out these sections:

- Constants that define board size, paddle size, and score limit.
- `drawBoard`, which renders the canvas.
- `useEffect` blocks, which handle input and the game loop.
- The `Demo TODO` comments that mark the live coding opportunities.

Keep the explanation high level. The goal is to make the file feel navigable, not to teach every line.

### 2. Inline Copilot: Speed Slider

Use the comments in [src/App.jsx](../src/App.jsx) to demonstrate inline completion or Copilot Chat. Suggested pacing:

1. Place the cursor near `Demo TODO 1`.
2. Ask Copilot to add state for a ball speed slider.
3. Move to `Demo TODO 2` and ask how to use that state in the game loop.
4. Move to `Demo TODO 3` and ask Copilot to add the accessible slider UI.
5. Run the game and test slow, medium, and fast settings.

Suggested prompt:

```text
Add React state for a Pong speed slider from 3 to 12 with a default of 6, then wire it to the ball movement.
```

Teaching point: Copilot can help with small, local changes when you provide comments, nearby code, and a clear expected behavior.

### 3. Chat: Explain The Code

Highlight the collision logic and ask Copilot Chat:

```text
Explain this collision detection code to someone who is new to game loops.
```

Teaching point: Copilot is useful for reading code, not only writing code.

### 4. Agent Mode: Copilot-Themed Ball

Ask agent mode for a scoped visual change:

```text
Replace the yellow Pong ball with a GitHub Copilot-inspired logo treatment while keeping the game playable and lightweight.
```

Review the generated changes with learners. Ask what files changed and whether the behavior still matches the goal.

Teaching point: Agent mode is useful when a change crosses multiple parts of the app.

### 5. Agent Mode: Animations

Ask for a second agent-mode pass:

```text
Add tasteful arcade animations when the ball hits a paddle or a player scores. Keep the app lightweight and avoid new dependencies.
```

Then verify:

- The app still runs.
- Animations do not make the controls harder to use.
- The code remains understandable enough to maintain.

## Wrap-Up Questions

Use these prompts to help learners reflect:

- What made the best prompt more specific than the first attempt?
- What did Copilot infer from the existing code?
- What would you always test after generated changes?
- When would you use inline suggestions, chat, or agent mode?

## Reset Tips

For repeat classes, keep this starting repo unchanged and make live demo edits in a branch or disposable copy. The TODO comments are intentionally part of the template.
