# Predictions recorded before modified-app testing

All browser checks are performed by Codex, not claimed as student or partner observations.

- Pause: fly, pause, wait at least five seconds; coordinates and height remain unchanged.
- Turn: reset, click Right nine times; heading 90 degrees, eastbound longitude increases.
- Speed: compare roughly equal measured wall durations at 30 and 60 m/s, fixed north heading; roughly twice the distance at 60. Timing and frame cap may affect results.
- Reset: after changes, restores -75.93/40.33, 500 m, 70 m/s, heading 0, paused.
- Limits: enter 0 then 6000 m and commit; height clamps to 50 then 5000.
- Feature: Slow Tour sets input and readout to 30; preserves pause; while flying preserves motion; Reset returns speed to 70.
- Automated baseline/final: all seven supplied checks pass.
- Broken copy: remove * dt; duration consistency should fail; restore it and all seven should pass.
