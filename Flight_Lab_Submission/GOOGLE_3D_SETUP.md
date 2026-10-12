# Optional Google Photorealistic 3D

The Map / terrain view selector now includes Google Photorealistic 3D. It streams buildings and ground surfaces as 3D Tiles, rather than a Cesium terrain provider. Free maps remain the startup default. No tile requests to Google or ion are made until you select Google with a configured credential.

## Connect through Cesium ion (preferred if already enabled)
1. Open https://ion.cesium.com/tokens and create a token named Flight Lab.
2. Give it the public `assets:read` permission and access to **Google Photorealistic 3D Tiles** (asset 2275207). This app has no search geocoder, so it does not require geocode permission.
3. Restrict allowed URLs to the sites you use, such as `http://127.0.0.1:8000/`, `http://localhost:8000/`, and your actual GitHub Pages URL. Follow ion's URL restrictions guidance.
4. In `Config.js`, paste the token between the quotes in `cesiumIonAccessToken: ''`. Leave `googleMapsApiKey` empty.
5. Save, reload your running site, and select **Google Photorealistic 3D** from **Map / terrain view**. If publishing, upload the updated project files, including Config.js, to your existing website.

Ion takes priority if both fields are populated. You do not need a separate Google API key for the ion route. Use a dedicated public read token, not an account-management or upload token. Tokens in browser files are visible to site visitors. Review your ion usage and plan limits. No token is included in this ZIP.

[Cesium ion token guide](https://cesium.com/learn/ion/cesium-ion-access-tokens/)

## Set up your own browser key
1. In Google Cloud, select a project, enable billing and enable the **Map Tiles API**. Review current pricing and quotas before use: this service can incur charges.
2. Create an API key. Apply **Websites / HTTP referrer** application restrictions and restrict the key to **Map Tiles API**.
3. Allow your actual website, for example `https://YOUR-USERNAME.github.io/*`. For local testing, also allow `http://127.0.0.1:8000/*` and/or `http://localhost:8000/*` as appropriate.
4. Edit `Config.js`, setting `googleMapsApiKey` to your restricted browser key. A browser key is visible in published JavaScript and requests: never use an unrestricted key or a server credential here.
5. Run through localhost or GitHub Pages, reload, then choose **Google Photorealistic 3D**. The view pauses flight and moves near the flight marker. Use the sights guide or mouse controls to explore.

No account, billing, key, or GitHub deployment was created for you. The provided ZIP has an empty key. Keep that empty copy for sharing unless you intend recipients to use your restricted key and quota.

## Behavior and limitations
- Missing key: the current free map stays visible and setup instructions appear.
- Root request failure: the previous view remains. Tile streaming failure: the last free map is restored.
- Switching back to either free map removes the Google tileset and restores the globe.
- Google and data-provider credits remain visible through Cesium's on-screen credit system. Do not hide or crop them.
- Coverage and detail vary. Reading and Alvernia scan quality has not been verified with a live key. Scans are not live imagery or proof of current venue conditions.
- Flight uses its existing ellipsoid heights, not height above scanned ground. Buildings do not provide collision detection.
- Google data streams online and is not included in the ZIP. This optional enhancement goes beyond the assignment's no-token starter; the assignment can still be completed with free maps.

## Sources
- [Google setup and API keys](https://developers.google.com/maps/documentation/tile/get-api-key)
- [Google Cesium renderer guidance and attribution](https://developers.google.com/maps/documentation/tile/use-renderer)
- [Cesium3DTileset.fromUrl](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#fromUrl)

## Verification still needed with your key
Select Google, verify visible 3D detail and credits, explore a Reading sight, switch to each free map, and check your Google usage dashboard. Record your actual result. Live authenticated rendering was not tested during implementation because no key was supplied.
