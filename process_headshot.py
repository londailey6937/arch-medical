#!/usr/bin/env python3
"""Crop headshot, remove background with AI, replace with brand gradient."""

from PIL import Image, ImageFilter, ImageDraw
from rembg import remove
import numpy as np
import io

INPUT = "/Users/londailey/Desktop/Lon.jpeg"
OUTPUT = "public/headshot.jpg"

img = Image.open(INPUT)
w, h = img.size
print(f"Original: {w}x{h}")

# Step 1: Crop square centred on face
face_cx, face_cy = 1050, 680
crop_size = 1500
half = crop_size // 2
left = max(0, face_cx - half)
top = max(0, face_cy - half)
right = left + crop_size
bottom = top + crop_size
if bottom > h:
    top -= (bottom - h)
    bottom = h
if right > w:
    left -= (right - w)
    right = w

img = img.crop((left, top, right, bottom))
cw, ch = img.size
print(f"Cropped: {cw}x{ch}")

# Step 2: Remove background using AI
print("Removing background...")
img_rgba = remove(img)  # returns RGBA with transparent background
print("Background removed.")

# Step 3: Create professional navy gradient background
bg_arr = np.zeros((ch, cw, 3), dtype=np.float64)
center_x, center_y = cw // 2, int(ch * 0.42)
for y in range(ch):
    for x in range(cw):
        dx = (x - center_x) / (cw * 0.5)
        dy = (y - center_y) / (ch * 0.5)
        dist = (dx**2 + dy**2) ** 0.5
        t = min(dist / 0.9, 1.0)
        # Lighter navy center → darker navy edge
        r = 30 + (11 - 30) * t
        g = 60 + (35 - 60) * t
        b = 90 + (58 - 90) * t
        bg_arr[y, x] = [r, g, b]
gradient_bg = Image.fromarray(bg_arr.astype(np.uint8)).convert("RGBA")
gradient_bg.putalpha(255)

# Step 4: Composite person over gradient
result = Image.alpha_composite(gradient_bg, img_rgba).convert("RGB")

# Step 5: Resize
result = result.resize((800, 800), Image.LANCZOS)
result.save(OUTPUT, "JPEG", quality=92)
print(f"Saved: {OUTPUT} (800x800)")
