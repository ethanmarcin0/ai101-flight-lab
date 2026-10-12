# Google 3D option checks — 2026-10-07

Performed by Codex, not a student or partner observation.

- Browser: startup showed Natural Earth status and paused flight. Selecting Google without a key showed the setup message and restored the Natural Earth selection.
- Browser: all seven supplied movement tests passed.
- Node VM with mocked Cesium responses: six scenarios passed — missing key causes zero Google requests; successful mocked activation hides ellipsoid; switching to free maps destroys Google tiles; root failure retains previous view; stale asynchronous result is destroyed; tile failure restores last free map.
- Reproduce the mocked checks from the directory containing Flight_Lab: `node Flight_Lab/evidence/google-mode-tests.cjs`.
- Live authenticated Google rendering, geographic coverage and attribution appearance are **not tested**; no API key supplied. Mock results do not prove real service rendering.

## Cesium ion update
Node VM mocked checks passed for token forwarding to asset 2275207, ion precedence over direct Google key, no ion access on startup, and ion authorization failure preserving the free map. Prior mock scenarios also passed. Live token access was not tested.
