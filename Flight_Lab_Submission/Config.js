/* Public browser settings. No account or token is needed for the default map. */
window.FLIGHT_CONFIG = Object.freeze({
  // "streets" shows detailed land, roads and place labels; "naturalEarth" shows
  // Cesium's bundled low-resolution land/ocean imagery (best viewed zoomed out).
  imagery: 'naturalEarth',
  // Optional Google Maps Tile API browser key. Read GOOGLE_3D_SETUP.md first.
  // Keep empty for free maps. Google mode is selected manually, never on startup.
  googleMapsApiKey: '',
  // Preferred for Cesium ion users: public assets:read token, restricted to your site.
  // If both credentials are set, Cesium ion takes priority.
  cesiumIonAccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IlZjSFpIRGd2N1ZoT1N6Q28iLCJqdGkiOiJjN2RhNmZiOS0yMzRiLTRlMjQtOTFmOC0xOGQ2ZmRhNGMwNWUiLCJpZCI6NTA2Njk1LCJzdWIiOiJldGhhbm1hcmNpbiIsImlzcyI6Imh0dHBzOi8vYXBpLmNlc2l1bS5jb20iLCJhdWQiOiJSZWFkaW5nICIsImlhdCI6MTc5MTM4MjkzNX0.0Orm5_IB0h_gMSpwtXeE37adyBPaVoNfrMUTLHXMC10',
  startView: 'earth',
  showTrainingGrid: false
});
