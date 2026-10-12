/* UI + Cesium rendering. Movement rules live in flight-core.js. */
(() => {
 const $ = id => document.getElementById(id);
 if (typeof Cesium === 'undefined') { $('message').textContent='Cesium did not load. Check your internet connection or CDN access.'; return; }
 let state = Flight.initial();
 try {
 const viewer = new Cesium.Viewer('globe', {
   baseLayer:false, baseLayerPicker:false, geocoder:false, animation:false,
   timeline:false, homeButton:false, sceneModePicker:false, navigationHelpButton:false,
   fullscreenButton:false, infoBox:false, selectionIndicator:false,
   terrainProvider:new Cesium.EllipsoidTerrainProvider()
 });
 const config = window.FLIGHT_CONFIG || {imagery:'streets',showTrainingGrid:false};
 let mapRequest = 0;
 let activeMap = config.imagery==='naturalEarth'?'naturalEarth':'streets';
 let googleTiles = null;
 function removeGoogle(){
  if(googleTiles){viewer.scene.primitives.remove(googleTiles);googleTiles=null;}
  viewer.scene.globe.show=true;
 }
 async function setMap(kind){
  const key = String(config.googleMapsApiKey || '').trim();
  const ionToken = String(config.cesiumIonAccessToken || '').trim();
  // An unconfigured option must not cancel an in-progress free map load.
  if(kind==='google3d' && !key && !ionToken){
   $('map-style').value=activeMap;
   $('map-status').textContent='Google 3D needs a Cesium ion token or Google API key in Config.js. See GOOGLE_3D_SETUP.md. Your current map is unchanged.';
   return;
  }
  const request = ++mapRequest;
  $('map-status').textContent='Loading '+(kind==='google3d'?'Google 3D scans…':'map imagery…');
  try {
   if(kind==='google3d'){
    // Google's ion asset ID matches CesiumJS 1.145's Google tiles helper.
    // Geocoding is disabled; no non-Google geocoder is combined with these tiles.
    const resource = ionToken
     ? await Cesium.IonResource.fromAssetId(2275207, {accessToken:ionToken})
     : new Cesium.Resource({url:'https://tile.googleapis.com/v1/3dtiles/root.json',queryParameters:{key}});
    if(request!==mapRequest)return;
    const tiles = await Cesium.Cesium3DTileset.fromUrl(resource, {showCreditsOnScreen:true});
    if(request!==mapRequest){tiles.destroy();return;}
    removeGoogle();
    googleTiles=viewer.scene.primitives.add(tiles);
    viewer.scene.globe.show=false;
    activeMap=kind;
    tiles.tileFailed.addEventListener(()=>{
     if(googleTiles!==tiles)return;
     // Defer removal until Cesium finishes processing the current tile event.
     Promise.resolve().then(()=>{
      if(googleTiles!==tiles)return;
      ++mapRequest;
      removeGoogle();
      activeMap=$('map-style').value=lastFreeMap;
      $('map-status').textContent='Google 3D tiles failed to load. The free map is restored. Check your token/key, allowed website and enabled tile access.';
     });
    });
    state.paused=true;paint();follow();
    $('map-status').textContent='Google Photorealistic 3D — streaming buildings and terrain. Detail depends on coverage; flight has no collision detection.';
    return;
   }
   const provider = kind==='naturalEarth'
    ? await Cesium.TileMapServiceImageryProvider.fromUrl('https://cesium.com/downloads/cesiumjs/releases/1.145/Build/Cesium/Assets/Textures/NaturalEarthII/')
    : new Cesium.OpenStreetMapImageryProvider({url:'https://tile.openstreetmap.org/'});
   if(request!==mapRequest)return;
   provider.errorEvent.addEventListener(()=>{
    if(activeMap===kind)$('map-status').textContent='Some map tiles could not load. Check internet access or try the other globe map.';
   });
   viewer.imageryLayers.removeAll();
   viewer.imageryLayers.addImageryProvider(provider);
   removeGoogle();
   activeMap=lastFreeMap=kind;
   $('map-style').value=kind;
   $('map-status').textContent=kind==='naturalEarth'?'Cesium Natural Earth — low-resolution land/ocean imagery; use Whole globe.':'OpenStreetMap — land, roads and labels on the Cesium globe.';
  } catch(error){
   if(request!==mapRequest)return;
   $('map-style').value=activeMap;
   $('map-status').textContent=kind==='google3d'
    ? 'Google 3D could not load. Your current map is unchanged. Check the token/key, website restrictions and enabled tile access; see GOOGLE_3D_SETUP.md.'
    : 'Map imagery could not load. Try the other globe map; flight controls remain available.';
   // Avoid logging service URLs, which may contain a browser API key.
  }
 }
 let lastFreeMap=activeMap;
 $('map-style').value=config.imagery==='naturalEarth'?'naturalEarth':'streets';
 $('map-style').onchange=()=>setMap($('map-style').value);
 setMap($('map-style').value);
 const position = () => Cesium.Cartesian3.fromDegrees(state.lon, state.lat, state.height);
 const plane = viewer.entities.add({
   position: new Cesium.CallbackProperty(position, false),
   point:{pixelSize:16,color:Cesium.Color.GOLD,outlineColor:Cesium.Color.BLACK,outlineWidth:2},
   label:{distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0,200000),text:'SIMULATED FLIGHT',font:'14px sans-serif',pixelOffset:new Cesium.Cartesian2(0,-28),showBackground:true}
 });
 viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(-75.93,40.33,0),
   point:{pixelSize:10,color:Cesium.Color.WHITE},
   label:{distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0,200000),text:'Reading-area teaching origin',font:'14px sans-serif',pixelOffset:new Cesium.Cartesian2(0,22),showBackground:true}});
 // Nearby training grid gives visible scale without remote imagery.
 for(let i=-5;config.showTrainingGrid && i<=5;i++){
   const d=i*0.01;
   viewer.entities.add({polyline:{positions:Cesium.Cartesian3.fromDegreesArray([-76.00,40.33+d,-75.86,40.33+d]),width:1,material:Cesium.Color.WHITE.withAlpha(0.35)}});
   viewer.entities.add({polyline:{positions:Cesium.Cartesian3.fromDegreesArray([-75.93+d,40.27,-75.93+d,40.39]),width:1,material:Cesium.Color.WHITE.withAlpha(0.35)}});
 }
 function paint(){
   $('message').textContent=state.paused?'Paused — ready to inspect':'Flying — simulated movement';
   $('readout').textContent=`Heading ${state.heading.toFixed(0)}° · Longitude ${state.lon.toFixed(5)} · Latitude ${state.lat.toFixed(5)} · Height ${state.height.toFixed(0)} m · Speed ${state.speed.toFixed(0)} m/s`;
 }
 function follow(){viewer.camera.lookAt(position(),new Cesium.HeadingPitchRange(Cesium.Math.toRadians(state.heading),Cesium.Math.toRadians(-30),2500));}
 function showEarth(){state.paused=true;paint();viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);viewer.camera.setView({destination:Cesium.Cartesian3.fromDegrees(-75.93,20,22000000),orientation:{heading:0,pitch:Cesium.Math.toRadians(-90),roll:0}});}
 $('earth').onclick=showEarth;
 $('fly').onclick=()=>{state.paused=false;paint();};
 // Speed preset changes only speed; the current paused/flying state is preserved.
 $('slow').onclick=()=>{state.speed=30;$('speed').value=state.speed;paint();};
 $('pause').onclick=()=>{state.paused=true;paint();};
 $('left').onclick=()=>{state.heading=Flight.wrap(state.heading-10);paint();follow();};
 $('right').onclick=()=>{state.heading=Flight.wrap(state.heading+10);paint();follow();};
 $('reset').onclick=()=>{state=Flight.initial();$('speed').value=state.speed;$('height').value=state.height;paint();follow();};
 for(const [id,min,max] of [['speed',0,250],['height',50,5000]]){
   $(id).onchange=()=>{const n=Number($(id).value);if(Number.isFinite(n))state[id]=Flight.clamp(n,min,max);$(id).value=state[id];paint();follow();};
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden){state.paused=true;paint();}});
 let last=performance.now(),lastPaint=0;
 viewer.scene.preRender.addEventListener(()=>{
   const now=performance.now(), dt=Math.min((now-last)/1000,0.1);last=now;
   state=Flight.step(state,dt);
   if(!state.paused)follow();
   if(!state.paused && now-lastPaint>150){paint();lastPaint=now;}
 });
 // Establish a useful view before optional guide setup.
 paint();
 if(config.startView==='earth')showEarth();else follow();
 // Sight viewing pauses flight and moves only the camera, not the aircraft.
 for(const sight of (window.SIGHTS || []).filter(s=>Number.isFinite(s.lon)&&Number.isFinite(s.lat))){
  viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(sight.lon,sight.lat,0),
   point:{pixelSize:11,color:Cesium.Color.CYAN,outlineColor:Cesium.Color.BLACK,outlineWidth:2},
   label:{distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0,200000),text:sight.name,font:'13px sans-serif',pixelOffset:new Cesium.Cartesian2(0,-22),showBackground:true}});
 }
 if(window.SightsGuide)SightsGuide.connect(sight=>{
  state.paused=true;paint();
  viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(sight.lon,sight.lat,0),
   new Cesium.HeadingPitchRange(0,Cesium.Math.toRadians(-55),1800));
  $('message').textContent='Paused — viewing '+sight.name+'. Fly resumes at the flight marker; Reset returns to the teaching origin.';
 });

 }catch(error){$('message').textContent='The globe could not start. Check WebGL support and the browser console.';console.error(error);}
})();
