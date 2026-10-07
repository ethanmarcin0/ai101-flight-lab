# Browser evidence — 2026-09-30

Performed by Codex using the actual local app and native browser controls, not a student or partner. Test predictions are in Test_Plan.md. Results are in ../Test_Log.csv. Automated result text is transcribed from the visible browser output.

The original globe rendered a blue grid, gold simulated-flight marker, white teaching-origin marker, and Cesium credit. Initial state was paused at longitude -75.93000, latitude 40.33000, height 500 m, speed 70 m/s, heading 0.

Speed comparison: the final successful trials each used a 5000-ms wait between Fly and Pause. Starting latitude was 40.33000. At 30 m/s final latitude was 40.33136 (about 151 m north); at 60 m/s it was 40.33272 (about 302 m north). These are approximate UI measurements, with action overhead and five-decimal rounding. Earlier exploratory runs had unequal durations and were excluded from the equal-duration comparison. An intermediate browser automation attempt did not activate the controls; its unchanged readings were not counted. A fresh tab resolved that interaction issue.

Pause remained at longitude -75.93000, latitude 40.33137 and height 500 m across observations more than five seconds apart. Right nine times gave heading 90, then Fly increased longitude to -75.92986. Height inputs 0 and 6000 committed to 50 and 5000. Reset restored all defaults after changing position, heading, height and speed.

Slow Tour displayed 30 in both input and readout while retaining pause. During flight it retained flying status and movement. Reset returned speed to 70.

This does not establish accessibility compliance, real aircraft accuracy, or student/partner completion.
