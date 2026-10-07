# Map update — October 7, 2026

Checked by Codex in the browser:
- OpenStreetMap land, roads and labels visibly rendered around Reading.
- Switching to Cesium Natural Earth loaded land/ocean imagery.
- Whole globe showed the Americas on the globe and preserved the paused aircraft state.
- Switching back to streets, Reset, Slow Tour and Fly showed speed 30 and changing latitude (40.33005).
- Pause and Reset restored origin, 500 m, heading 0, 70 m/s, paused.
- All seven supplied tests passed again.

See cesium-globe.png. Raised elevation terrain and 3D buildings were not added. Imagery requires an internet connection. Earlier grid screenshots are historical evidence of the previous version.

APIs checked:
https://cesium.com/learn/cesiumjs/ref-doc/OpenStreetMapImageryProvider.html
https://cesium.com/learn/cesiumjs/ref-doc/TileMapServiceImageryProvider.html

Startup follow-up: after a fresh reload, Cesium Natural Earth and the whole-Earth camera loaded without pressing Whole globe. Visually confirmed in earth-startup.png. The user-reported failing copy was not identified, so its specific cause remains unconfirmed.
