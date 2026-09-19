# Precious Angel Lopez — Artist Portfolio

## Goal
Build a premium, editorial one-page portfolio that presents Precious as an emerging professional artist, showcases the supplied portraits and artwork, and makes commission inquiries easy.

## Visual Direction
- Warm ivory, deep charcoal, soft stone, muted sage, and a restrained coral highlight.
- Editorial serif display type paired with a precise modern sans-serif.
- Asymmetric art-gallery compositions, oversized type, generous whitespace, fine rules, subtle paper texture, and restrained shadows.
- Tasteful cat references appear as tiny line details and one hidden interaction, never as a childish motif.
- Light and dark themes with smooth transitions; motion remains subtle and respects reduced-motion preferences.

## Pages and Sections
- Sticky, compact-on-scroll navigation with desktop and mobile menus.
- Full-viewport opening composition using Precious’s portrait and layered artwork, plus Artwork and Commission calls to action.
- Curated masonry-style gallery with categories, captions, hover reveals, and an accessible lightbox.
- Commission offerings and an editorial four-step process.
- Services presentation for portraits, character work, pet art, and custom commissions.
- Personal story section using the supplied artist photo and biography details.
- Commission inquiry form with all requested fields, client-side validation, upload feedback, loading state, and a clear local success state.
- Final contact statement and distinctive signature-style footer with placeholder social links clearly marked for later replacement.

## Imagery
- Preserve and feature all four supplied images: the artist portrait plus three examples of commissioned portrait work.
- Generate a small cohesive supporting set of original artistic images for missing categories, such as character illustration, pet portrait, and expressive digital artwork.
- Keep supplied work labeled as Precious’s artwork; label generated pieces as concept studies so authorship is not misrepresented.
- Store uploaded media through the project’s asset system and keep artwork metadata centralized for easy future replacement.

## Interaction and Accessibility
- Smooth anchored navigation, scroll reveals, image movement, modal transitions, keyboard-accessible lightbox, visible focus states, and body-scroll locking for overlays.
- Mobile-specific gallery rhythm, touch-friendly controls, readable form layout, and no overlapping content.
- Semantic landmarks, descriptive image text, clear form labels and errors, sufficient contrast, and reduced-motion behavior.

## Technical Details
- Build with the existing React/TanStack Start and Tailwind setup; keep the home experience at `/`.
- Split the interface into focused reusable components and a central artwork data module.
- Define all colors, typography, shadows, spacing, and motion as semantic design tokens in the global design system.
- Use the existing icon library for controls; no new backend or database is required, so submission will be an honest front-end inquiry confirmation rather than pretending to send data.
- Add unique home-page title, description, Open Graph metadata, and social card metadata.
- Verify the finished experience at desktop and mobile widths, including navigation, theme switching, gallery filtering/lightbox, and form validation.

## Assumptions
- The supplied celebration portrait is the artist/profile image; the other three images are portfolio artwork.
- No real email address, social profile URLs, commission prices, or delivery service were provided, so the site will not invent them.
