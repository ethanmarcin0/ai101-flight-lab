# Reading & Alvernia Explorer

AI 101 Week 6 — Path A, CesiumJS **1.145**.

## Audience and pitch

I want to help cybersecurity students practice verifying software behavior using simulated position data. Before sharing, I will check coordinate units against Cesium documentation, compare predicted and actual behavior, and clearly label the teaching location and simulation limits.

This is a hypothetical teaching use in cybersecurity: careful observation, boundary testing, reproducibility and evidence before trust. It is not an attack detector or a real aircraft simulator.

## Run locally (no build step)

1. Extract the ZIP first. Open a terminal in the extracted project folder (the one containing index.html).
2. With Python 3 installed, run `python3 -m http.server 8000 --bind 127.0.0.1`. On Windows, `py -m http.server 8000 --bind 127.0.0.1` is an alternative.
3. Leave the terminal running. Open **http://127.0.0.1:8000/** in your browser.
4. Browse the sights guide, then use Jump to flight controls. Expect a mapped globe, a gold simulated marker, a white teaching-origin marker, and paused status. Initial longitude/latitude: -75.93000 / 40.33000, height 500 m, speed 70 m/s, heading 0 degrees.
5. Click Fly, then Pause. The coordinates change while flying and stop while paused.
6. Open **http://127.0.0.1:8000/tests.html** or click Run movement tests.
7. Stop the server with Ctrl+C when finished.

An editor's local web server is another option. Do not simply double-click index.html. Internet access and WebGL are required. CesiumJS 1.145 and matching CSS load from Cesium’s CDN. Land/roads tiles load from OpenStreetMap; Natural Earth imagery loads from the Cesium CDN. No token, paid imagery or account is required. Keep Cesium's credit visible.

If port 8000 is occupied, use 8001 in both the command and browser URL. A directory listing means you served the parent folder: open Flight_Lab/ or restart the server inside it. A Cesium load message points to internet/CDN access; a globe startup message points to WebGL/browser support.

## Globe and land settings — Config.js

The filename is **Config.js** (capital C), and index.html loads it before app.js. Upload it along with the other project files; filenames are case-sensitive on many hosts.

- `imagery: 'streets'`: land, roads and labels from OpenStreetMap on the Cesium globe.
- `imagery: 'naturalEarth'` (default): Cesium’s bundled low-resolution Natural Earth imagery. Best at world scale.
- `showTrainingGrid: false`: hides the old local white training lines. Set true only if needed.

Startup now uses `startView: 'earth'` to show the whole Earth immediately. Cesium asset paths are explicit CDN URLs, and local script/style URLs have a version query to refresh older cached copies.

You can switch maps using the Globe map dropdown without editing code. Whole globe pauses motion and shows Earth; Reset returns to the Reading teaching origin, and Fly resumes following the flight marker. The map remains a smooth ellipsoid: raised hills/terrain and 3D buildings are not enabled. Natural Earth will look blurry close up; use Land, roads & labels for Reading.

Keep map credits visible. OpenStreetMap tiles are fetched normally in the browser; do not bulk-download or prefetch. Policy: https://operations.osmfoundation.org/policies/tiles/

## Controls and the new feature

Fly starts motion; Pause stops it. Left/Right change heading by 10 degrees. North is 0, east is 90. Speed accepts 0–250 m/s. Height accepts 50–5000 m above the model ellipsoid and changes instantly.

**Slow Tour — 30 m/s** sets speed and its input to 30 and refreshes the readout. It preserves whether the app was paused or flying. Click Fly separately when paused. Reset restores the origin, height 500, speed 70, heading 0 and paused state. Switching tabs pauses flight; press Fly again when returning.

## Sights guide (added October 7, 2026)

Six sights: Reading Pagoda, GoggleWorks Center for the Arts, Santander Performing Arts Center, Francis Hall, Franco Library, and John R. Post Center. Filter to Reading history or Alvernia sights, then select a name to see its description, source, location link and checked date.

The three Reading landmarks have cyan globe markers. View on globe pauses flight and moves only the camera; the aircraft stays where it was. Fly follows the aircraft again, and Reset restores the teaching origin. Alvernia building coordinates are not verified, so those entries link to campus/location maps and their globe buttons are disabled. These are information cards, not invented map positions.

The guide remains readable if Cesium fails to load. The globe now offers OpenStreetMap and Cesium Natural Earth imagery. No building models, imagery subscriptions or new packages were added. See Sights_Sources.md for provenance and evidence/Sights_Update_Checks.md for this version's tests.

## Exactly what changed

- index.html: Reading & Alvernia title, sights guide, filters, detail panel, and the Slow Tour control.
- sights.js: six source-backed descriptions and three city-sourced map positions.
- sights-ui.js: filtering, selection, source/map links, and globe-view callback.
- style.css: responsive guide layout and selection styles.
- app.js: after the Fly handler, a Slow Tour click handler sets `state.speed=30`, updates the speed input and calls `paint()`.
- app.js also adds three sight markers and a camera-only sight view. Paused frames no longer overwrite the sight-view status.
- Movement math remains as supplied; the map now also requests OpenStreetMap tiles.
- evidence/Changes.diff contains the exact application changes.

Plain explanation: HTML adds the button; JavaScript tells it what to do. The state is the current collection of flight values. Only its speed changes, so pause and position are preserved. Reset creates the original state again.

## Tests and evidence

Codex ran the six required browser checks on September 30 and the seven supplied movement checks again on October 7. The new guide, camera view, Slow Tour/Fly and Reset were checked on October 7; earlier results remain dated evidence of the earlier version. See Test_Log.csv, evidence/Browser_Observations.md and evidence/final.txt. The tests establish these particular behaviors, not real flight accuracy or accessibility compliance.

Three feature checks to repeat yourself:
1. Reset; Slow Tour: speed input/readout become 30 and position remains paused.
2. Fly; Slow Tour: movement continues at 30; Pause then holds coordinates for five seconds.
3. Change height and heading; Reset: all original values return, including speed 70.

Break_and_Repair.md explains the required deliberately broken copy, actual failure and successful restoration. No broken runtime file is in this ZIP.

## Geography, API verification and limits

The original approximate Reading-area teaching origin (-75.93, 40.33) is retained. It is not a verified campus pin or airport. Sight descriptions now cite official university and venue sources; precise Alvernia building pins are not claimed. On 2026-09-30, Codex checked the official Cartesian3 documentation: fromDegrees takes longitude first, latitude second (both degrees), then height in meters above the ellipsoid. This matches the call in app.js. The app itself was exercised with its pinned 1.145 CDN dependency; the linked online documentation may evolve.

Sources:
- https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html#fromDegrees
- https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html

Movement uses a sphere of radius 6,371,000 m displayed on an ellipsoid globe. It omits lift, drag, banking, collision, real terrain and real flight data. The frame-time cap of 0.1 seconds can slow simulated time during severe rendering stalls. The street map is cartographic imagery; Natural Earth is low-resolution land/ocean imagery. Neither supplies terrain elevations or 3D buildings. It is unsuitable for real navigation.

## Before submitting

- Complete the supplied Web_Warmup exercises; those are not claimed as completed by this project.
- Review the change and rerun the demonstration yourself.
- Have a partner follow this README uncoached for three minutes. Complete Partner_Check.md, make an actual improvement and update the pending test-log row.
- Read AI_Excerpts.md and add your own acceptance/rejection explanations.
- Personalize Reflection_Draft.md while keeping it 150–250 words and accurately attributing your contribution.
- Re-ZIP the updated Flight_Lab folder after these edits. The original supplied files are backed up separately in Original_Flight_Lab, outside this submission.

Publishing is optional unless the instructor requires it. No public site has been deployed. Submit by the Canvas due date.

## Optional Google 3D update
The map selector includes Google Photorealistic 3D. Read [GOOGLE_3D_SETUP.md](GOOGLE_3D_SETUP.md) for your own restricted browser key and billing setup. The ZIP ships with an empty key; free maps remain default. Live Google scans have not been verified without credentials.

### Cesium ion connection
Google 3D now accepts `cesiumIonAccessToken` in Config.js, with priority over the direct Google key. See GOOGLE_3D_SETUP.md. A token restricted to Google tiles and the site URL is recommended. No credentials are bundled; live account access remains untested.
