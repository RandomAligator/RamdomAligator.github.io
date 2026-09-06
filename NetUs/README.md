# Us. — a Netflix-style romantic site

Three files, fully editable, no build step: `index.html`, `style.css`, `script.js`.
Open `index.html` in a browser (or just double-click it) to view.

## 1. Add your intro/background video
Drop your video at:
```
assets/background.mp4
```
It plays once, full-screen, the moment the page opens — muted (browsers
block autoplay with sound), with just an unmute button in the corner. The
moment it ends, that same video keeps playing as the quiet looping
background behind the profile picker — no double-loading.

If it's missing, the site automatically falls back to an animated gradient
for the profile screen — nothing breaks.

## 2. Add profile icons (optional)
Drop an image per category at:
```
assets/icons/kisses.jpg
assets/icons/fishface.jpg
assets/icons/funny.jpg
assets/icons/outfit-check.jpg
assets/icons/photobooth.jpg
assets/icons/screenshots.jpg
```
No icon? A colored circle with an emoji shows instead automatically — also nothing breaks.

## 3. Add your photos & videos
Put files into the matching folder:
```
assets/kisses/
assets/fishface/
assets/funny/
assets/outfit-check/
assets/photobooth/
assets/screenshots/
```
Then open `script.js` and find the `CATEGORIES` array near the top. For each
category, list the files inside `media: [ ... ]`, for example:

```js
media: [
  { type: "photo", src: "assets/kisses/photo1.jpg" },
  { type: "photo", src: "assets/kisses/photo2.jpg" },
  { type: "video", src: "assets/kisses/video1.mp4", poster: "assets/kisses/poster1.jpg" },
]
```

- `type` is `"photo"` or `"video"`.
- `poster` (video only, optional) is a thumbnail image shown in the row —
  skip it and the browser will just show the video's first frame.

That's it — the profile grid, the browse rows, the hero banner, and the
lightbox viewer are all generated automatically from this one list.

## 3b. Using Google Drive instead of local files (optional)

You can paste a Google Drive share link straight into `src` for **photos**
and it'll just work:

```js
{ type: "photo", src: "https://drive.google.com/file/d/FILE_ID/view" }
```

Requirements: the file's sharing setting must be **"Anyone with the link"**
(Viewer is enough). The site auto-converts the link behind the scenes.

**Videos are a different story.** Google Drive actively throttles/blocks
hotlinked video streaming, so a `<video>` tag pointed at a Drive file often
just fails to load, especially once more than a couple of people open the
page. If you give a video a Drive link anyway, the site falls back to
embedding Drive's own player (works, but you lose the custom viewer/zoom —
you just get Drive's default player in a frame).

**Recommendation, especially for GitHub Pages:** commit video files directly
into the `assets/<category>/` folders in your repo and use a normal local
`src` path. GitHub Pages serves video/image files natively for free — no
Drive quota or throttling issues — as long as no single file is over 100MB
(compress with HandBrake or similar if needed, e.g. 1080p → ~15–25 Mbps down
to a few Mbps is usually plenty for a phone-viewed page). Photos can go
either way; Drive is fine for those if you'd rather not bloat the repo.

## 4. Add / remove / rename categories
Add, delete, or reorder objects inside `CATEGORIES` in `script.js`. Everything
else on the site updates itself — no HTML or CSS editing needed.

## What's built in
- Your own `background.mp4` playing full-screen the instant the page loads,
  then seamlessly becoming the ambient loop behind the profile picker.
- Netflix-style profile-select intro with a personalized wordmark ("Us.")
  instead of Netflix's actual logo/branding (kept out on purpose — that
  part's trademarked).
- Google Drive support for photos (see section 3b above).
- Ambient floating hearts on the intro screen.
- A "browse" screen per category: hero banner, a horizontal-scrolling row of
  that category's media, and a "More Moments" row to jump between categories
  without going back to the intro.
- A fullscreen lightbox viewer: videos play with controls; photos support
  scroll-wheel / pinch zoom and drag-to-pan (double-click to reset), plus
  prev/next arrows and arrow-key navigation.
- Fully responsive down to mobile, and safe fallbacks everywhere so a missing
  file never breaks the layout.
