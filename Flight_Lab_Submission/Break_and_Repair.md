# Deliberate timing bug and repair

Codex performed this exercise in a separate copy, leaving the final application intact.

1. Original: `const distance = state.speed * dt;`
2. Deliberately broken: `const distance = state.speed;`
3. Opened the copy's tests.html: six checks passed and duration consistency failed.
4. Restored `* dt`, reloaded tests.html: all seven passed.
5. Opened the final application's tests.html: all seven passed.

Speed is meters per second; dt is elapsed seconds. Their product is meters traveled during this update. Without dt, each update travels a full second's distance. At 70 m/s, ten 0.1-second updates incorrectly travel about 700 m while one 1-second update travels 70 m. Restoring dt makes both about 70 m. Faster drawing should not itself create greater distance.

See evidence/broken-copy.txt and evidence/restored-copy.txt. These are actual browser observations transcribed by Codex. The broken code is not included in the submission.
