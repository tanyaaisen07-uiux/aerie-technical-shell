import "./style.css";
import "./video.css";
import { assets } from "./content.js";

const root = document.documentElement;
const story = document.querySelector(".story");
const sceneNumber = document.querySelector("#sceneNumber");
const progressBar = document.querySelector("#progressBar");
const skip = document.querySelector("#skipStory");
const introVideo = document.querySelector(".intro-video");
const videoSources = {
  intro: "https://d8j0ntlcm91z4.cloudfront.net/user_3J2WwkuJwebtgTDRF5MXPny7c5x/hf_20260908_102936_4a33ab93-57e6-48f4-a8de-a964b7dc0cc7.mp4"
};
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const mobileQuery = matchMedia("(max-width: 680px)");

function loadVideo(video, source) {
  if (video.dataset.loaded) return;
  video.dataset.loaded = "true";
  // If the asset fails (offline, blocked host), fall back to the still poster
  // that's already on the element rather than leaving a broken video box.
  video.addEventListener("error", () => { video.style.display = "none"; }, { once: true });
  video.src = source;
  video.load();
}

// Background layers load progressively around scroll position instead of all
// three firing at once on page load — only "product" is needed for the first
// frame. Each load is verified with a real Image() before it's applied, so a
// failed fetch keeps the existing CSS placeholder instead of showing nothing.
const layerEls = {};
for (const key of Object.keys(assets)) layerEls[key] = document.querySelector(`.${key}-image`);
const loadedLayers = new Set();
function loadLayer(key) {
  if (loadedLayers.has(key) || !assets[key] || !layerEls[key]) return;
  loadedLayers.add(key);
  // The macro beat reuses the clean shell source; this removes pebble imagery while retaining a continuous product story.
  const src = key === "macro" ? assets.product : assets[key];
  const img = new Image();
  img.onload = () => {
    layerEls[key].style.backgroundImage = `url(${src})`;
    layerEls[key].classList.add("has-asset");
  };
  img.onerror = () => layerEls[key].classList.add("asset-failed");
  img.src = src;
}

if (reducedMotion.matches) {
  // Reduced motion shows the resolved summit still immediately; nothing else loads.
  loadLayer("summit");
} else {
  loadLayer("product");
}

function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
function within(value, start, end) { return clamp((value - start) / (end - start)); }
function smooth(t) { return t * t * (3 - 2 * t); }

// Scroll pacing is tuned independently per breakpoint: mobile gets a shorter
// opening hold and tighter beat boundaries so normal thumb scrolling moves
// the story along, rather than reusing the desktop timing at a smaller size.
function beats() {
  return mobileQuery.matches
    ? { diveStart: .09, diveEnd: .48, pebbleStart: .44, pebbleEnd: .60, revealStart: .62, revealEnd: .90, scene2At: .30, scene3At: .64 }
    : { diveStart: .18, diveEnd: .58, pebbleStart: .52, pebbleEnd: .72, revealStart: .70, revealEnd: .96, scene2At: .35, scene3At: .72 };
}

function render() {
  if (reducedMotion.matches) return; // static summit view is already set via CSS + loadLayer("summit") above
  const rect = story.getBoundingClientRect();
  const available = story.offsetHeight - innerHeight;
  if (available <= 0) return;
  const p = clamp(-rect.top / available);
  const b = beats();
  const dive = smooth(within(p, b.diveStart, b.diveEnd));
  const pebble = smooth(within(p, b.pebbleStart, b.pebbleEnd));
  const reveal = smooth(within(p, b.revealStart, b.revealEnd));
  root.style.setProperty("--p", p);
  root.style.setProperty("--dive", dive);
  root.style.setProperty("--pebble", pebble);
  root.style.setProperty("--reveal", reveal);
  if (p > .01) loadVideo(introVideo, videoSources.intro);
  const videoProgress = within(p, .04, .48);
  if (introVideo.readyState > 0 && Number.isFinite(introVideo.duration)) introVideo.currentTime = videoProgress * introVideo.duration;
  if (dive > .02) loadLayer("macro");
  if (reveal > .02) loadLayer("summit");
  sceneNumber.textContent = p < b.scene2At ? "01" : p < b.scene3At ? "02" : "03";
  progressBar.style.transform = `scaleX(${p})`;
}
addEventListener("scroll", render, { passive: true });
addEventListener("resize", render);
skip.addEventListener("click", () => document.querySelector("#specs").scrollIntoView({ behavior: "smooth" }));

// Final conversion CTA: no live store exists yet, so this is a realistic
// "notify me" prototype rather than a dead checkout link.
const shopCta = document.querySelector("#shopCta");
const shopNote = document.querySelector("#shopNote");
if (shopCta && shopNote) {
  shopCta.addEventListener("click", () => {
    const open = shopNote.classList.toggle("is-open");
    shopCta.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Mobile menu: accessible open/close with focus management, Escape-to-close,
// a basic focus trap while open, and close-on-link-selection.
const navToggle = document.querySelector("#navToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileMenuClose = document.querySelector("#mobileMenuClose");
if (navToggle && mobileMenu && mobileMenuClose) {
  const menuLinks = Array.from(mobileMenu.querySelectorAll("a"));
  const focusable = [mobileMenuClose, ...menuLinks];
  let lastFocused = null;

  function onMenuKeydown(e) {
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key !== "Tab") return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openMenu() {
    lastFocused = document.activeElement;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    mobileMenuClose.focus();
    document.addEventListener("keydown", onMenuKeydown);
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onMenuKeydown);
    if (lastFocused) lastFocused.focus();
  }

  navToggle.addEventListener("click", () => {
    mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  mobileMenuClose.addEventListener("click", closeMenu);
  menuLinks.forEach((a) => a.addEventListener("click", closeMenu));
}

render();
