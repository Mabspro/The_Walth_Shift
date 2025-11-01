# Hero Background Image Investigation Report

**Date:** November 1, 2025  
**Issue:** Hero background image not displaying despite proper setup

---

## Investigation Findings

### 1. File Structure ✅
```
public/images/bg_image.png EXISTS
```
- File is present in the correct location
- Path should be accessible via `/images/bg_image.png`

### 2. Hero Component Current Setup

**File:** `src/components/Hero.tsx`

```typescript
<div 
  className="hero-section relative min-h-[100vh] flex items-center"
  style={{
    backgroundImage: 'url(/images/bg_image.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Overlay Layer 1: Black 20% */}
  <div className="absolute inset-0 bg-black/20 z-0"></div>
  
  {/* Overlay Layer 2: Green gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-rich-green/30 to-transparent z-0"></div>
  
  {/* Content Layer */}
  <div className="container mx-auto px-6 relative z-20">
    {/* Content here */}
  </div>
</div>
```

**Analysis:**
- Inline styles have highest specificity
- Background properties are correctly set
- Two overlay layers with z-0 (should be BEHIND content)
- Content has z-20 (should be ABOVE overlays and background)

### 3. Page Wrapper Analysis

**File:** `src/app/page.tsx`

```typescript
<section className="hero-section relative">
  <Hero {...props} />
</section>
```

**Issue Found:** The `<section>` wrapper also has class `hero-section`!

### 4. CSS Rules Investigation

**File:** `src/app/globals.css`

Current rule:
```css
/* Hero component - allow background image to show */
.hero-section {
  /* Background image set via inline styles in component */
}
```

**Problem:** Empty CSS rule, but there could be inheritance issues.

### 5. Parent Container Analysis

**File:** `src/app/page.tsx` - Root div

```typescript
<div className="flex flex-col min-h-screen bg-rich-green">
  <main className="flex-grow">
    <section className="hero-section relative">
      <Hero />
    </section>
  </main>
</div>
```

**Issue Found:** 
- Root div has `bg-rich-green` class
- Main has `flex-grow` 
- Section wrapper adds another layer

### 6. Z-Index Layer Stack

**Current Stack (bottom to top):**
```
1. Root div (bg-rich-green) ← This shows green!
2. Main element
3. Section element (hero-section)
4. Hero div (should have background image)
   - Overlay 1 (z-0)
   - Overlay 2 (z-0)
5. Content (z-20)
```

### 7. Potential Issues Identified

**Issue #1: Double hero-section class**
- Both `<section>` wrapper AND Hero `<div>` have `hero-section` class
- This could cause CSS conflicts

**Issue #2: Background Color Inheritance**
- Parent div has `bg-rich-green` 
- This green might be showing through if image fails to load

**Issue #3: Overlay Coverage**
- Two overlay layers at z-0 might be covering the background
- Overlays use `absolute inset-0` which covers entire parent

**Issue #4: No Background Color Fallback**
- If image fails to load, there's no fallback color
- This makes it hard to diagnose if image is loading

**Issue #5: Image Path**
- Using `/images/bg_image.png` (absolute path)
- In Next.js, this should work, but...
- Public folder serves from root, so path is correct

### 8. Browser Network Check Needed

**Questions to verify:**
1. Is `/images/bg_image.png` returning 200 or 404?
2. Is the image file corrupt or invalid?
3. Are there CORS issues?
4. Is the file size appropriate?

### 9. CSS Specificity Analysis

**Inline styles** (Hero component):
```
specificity = 1,0,0,0 (highest except !important)
```

**No competing CSS rules found** that would override inline styles.

## Root Cause Hypothesis

**Most Likely Issue:** The overlays are COVERING the background image!

**Why:**
```css
.absolute.inset-0  /* covers entire parent */
.bg-black/20       /* semi-transparent black */
.bg-gradient-to-r  /* gradient overlay */
```

Both overlays use `absolute inset-0` which means they cover 0,0 to 100%,100% of the parent. Even though they're semi-transparent, if the background image isn't loading, they're covering a transparent/green background.

**Secondary Issue:** No visual confirmation that image is loading or failed.

## Recommended Fixes

### Fix 1: Remove duplicate hero-section class
The section wrapper doesn't need the `hero-section` class.

### Fix 2: Add background color fallback
Add a fallback color to diagnose if image is loading:
```typescript
style={{
  backgroundColor: '#ff0000', // RED - will show if image doesn't load
  backgroundImage: 'url(/images/bg_image.png)',
  // ... rest
}}
```

### Fix 3: Verify image loads in browser
Open DevTools → Network → Check if `/images/bg_image.png` loads with 200 status

### Fix 4: Test with absolute URL
Try using the full URL to rule out path issues:
```typescript
backgroundImage: `url(${window.location.origin}/images/bg_image.png)`
```

### Fix 5: Check image file
- Is the file actually a valid PNG?
- Is it too large (> 5MB)?
- Does it have the correct permissions?

## Testing Steps

1. **Add red fallback background** - if you see red, image isn't loading
2. **Check browser console** - look for 404 or CORS errors
3. **Check Network tab** - verify image request and response
4. **Remove overlays temporarily** - see if image appears without overlays
5. **Test with different image** - use a known working image URL

## Conclusion

The setup is technically correct, but the image likely isn't loading. The green you're seeing is probably from the parent `bg-rich-green` class, not the hero background.

**Next Action:** Add diagnostic fallback color to confirm whether image loads or not.
