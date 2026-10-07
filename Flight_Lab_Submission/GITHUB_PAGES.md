# Publish on GitHub Pages

1. Extract Flight_Lab_Submission.zip.
2. Upload the extracted contents to your GitHub repository; do not upload only the ZIP. Keep index.html, Config.js, app.js and all other project files at the top level, plus the evidence folder. Include .nojekyll if your uploader shows hidden files.
3. Commit the files.
4. Open Settings → Pages. Under Build and deployment select Deploy from a branch, choose main and /(root), then Save.
5. Wait for deployment and open the published Pages URL shown by GitHub. It is different from the repository URL.
6. Refresh the page. The globe defaults to Cesium Natural Earth with the whole Earth in view. For Reading street detail select Land, roads & labels, then Reset or a sight’s View on globe.

This project requires internet and WebGL, but no Cesium token. All project paths are relative so a repository subpath works. The ZIP is for extraction/submission, not the Pages startup file. Local testing remains documented in README.

If you still see only space, record the published URL and both messages above the flight controls so the actual failing deployment can be inspected. No GitHub deployment has been performed by Codex.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
