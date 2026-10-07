/* This guide works even when Cesium cannot load. */
(() => {
 const $ = id => document.getElementById(id);
 let active = SIGHTS[0], category = 'All', viewOnGlobe = null;
 const mapped = s => Number.isFinite(s.lon) && Number.isFinite(s.lat);
 function show(s) {
  active=s;
  $('sight-tag').textContent=s.tag; $('sight-name').textContent=s.name;
  $('sight-description').textContent=s.description; $('sight-location').textContent=s.location;
  $('sight-source').href=s.source; $('sight-map').href=s.map;
  $('sight-date').textContent='Sources checked '+s.checked;
  $('sight-verification').textContent=mapped(s)?'Map position comes from the City of Reading’s linked place coordinates. It is a reference point, not a surveyed entrance.':'Exact building coordinates have not been verified for this lab. Use the linked location map; no guessed pin is shown.';
  $('view-sight').disabled=!mapped(s)||!viewOnGlobe;
  $('view-sight').textContent=!mapped(s)?'Campus/location map only':viewOnGlobe?'View on globe':'Globe unavailable';
  document.querySelectorAll('[data-sight]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sight===s.id)));
 }
 function render(){
  const visible=SIGHTS.filter(s=>category==='All'||s.category===category);
  $('sight-list').replaceChildren();
  visible.forEach(s=>{
   const b=document.createElement('button'); b.dataset.sight=s.id;
   const label=document.createElement('strong');label.textContent=s.name;
   const meta=document.createElement('span');meta.textContent=s.category;
   b.append(label,meta); b.onclick=()=>show(s); $('sight-list').append(b);
  });
  $('sight-count').textContent=visible.length+' sights';
  show(visible.includes(active)?active:visible[0]);
 }
 document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{
  category=b.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  render();
 });
 $('view-sight').onclick=()=>{if(viewOnGlobe&&mapped(active)){viewOnGlobe(active);$('flight-controls').scrollIntoView({behavior:'smooth'});}};
 window.SightsGuide={connect(fn){viewOnGlobe=fn;show(active);}};
 render();
})();
