# AI collaboration excerpts

These are actual short excerpts from this chat, not invented student prompts. Implementation decisions below describe Codex's choices; the student must add their own review before submitting.

## 1. Planning

User: “can you do the flight lab for me?”

Codex: “What is your major? I’ll use it to tailor the Flight Lab’s audience and purpose.”

User: “Cybersecurity”

Codex: “I’ll frame this for cybersecurity students learning to verify software behavior, and add a ‘Slow Tour — 30 m/s’ button so they can inspect changing coordinates more easily.”

Implemented choice: a hypothetical cybersecurity teaching use with clearly simulated data, preserving the supplied origin.

Student review — what I accepted/rejected and why: [complete after reviewing]

## 2. Coding

Codex: “The new button preserves both paused and flying states, and Reset restores the original settings.”

The implemented handler in app.js is:
```js
$('slow').onclick=()=>{state.speed=30;$('speed').value=state.speed;paint();};
```

Implemented choice: a small speed-only change; no new dependency or service. See evidence/Changes.diff for the code actually added.

Student review — explain why preserving paused state matters and what you accepted/rejected: [complete]

## 3. Debugging

Codex: “Removing `* dt` caused the expected duration-consistency failure; restoring it made all seven pass again.”

Implemented choice: restore the elapsed-time multiplier in the exercise copy, keeping speed in meters per second and elapsed time in seconds. The failed test was retained as evidence, rather than weakened to hide the bug.

Student review — explain the failure and what you accepted/rejected: [complete]

No personal review or partner conversation has been fabricated. If the instructor expects three separate two-way exchanges, discuss these three points with the AI and replace the excerpts with those exchanges.

## Follow-up: sights expansion (October 7)

User: “Wait can you update the project, I want more of reading historical sites and Alvernia University Sights too!”

Codex added six source-backed sight descriptions, category filters and three Reading map-reference markers. Precise Alvernia building coordinates were left unverified rather than guessed. Source records and current checks are in Sights_Sources.md and evidence/Sights_Update_Checks.md.

Student review — what I accepted/rejected and why: [complete]
