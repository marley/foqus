# Foqus Marketing Website — Build Spec

## Goal

A single-page marketing site that explains Foqus, builds trust, and drives Chrome Web Store installs.

## Tech

Static site (Astro, Next.js static export, or plain HTML/Tailwind — builder's choice). Should be fast, lightweight, SEO-friendly. No tracking, no cookies, no analytics.

## Brand

- **Voice:** Warm, playful, supportive — like a friend who's been there. Never clinical, never guilt-driven.
- **Typography:** Monospace accents (Noto Sans Mono), clean sans-serif body
- **Colors:** Parchment/linen base, orange (#F15A22) accent, teal (#2f6f64) secondary
- **Dark mode:** Supported (matches the extension)

---

## Sections

### 1. Hero

- **Headline:** Position around "intention-first browsing" — not another blocker
- **Subline:** "Take back your browsing habits — gently, without shame"
- **CTA:** "Add to Chrome" → Chrome Web Store link
- **Visual:** Screenshot or animation of the overlay in action (3D gradient + personality quote)

### 2. The Problem

Speak to the feeling, not the feature gap:

> "You've tried blockers. You turned them off. That's not a failure — that's a design flaw."

Address:
- Brute-force blocking doesn't work long-term
- It feels punishing — users just circumvent it
- The problem isn't willpower, it's the approach

### 3. How Foqus is Different (3 pillars)

| Pillar | Message |
|---|---|
| **Intention, not restriction** | You choose sites to be mindful about. When you visit one, Foqus asks why — not "no." |
| **Personality, not productivity** | The overlay speaks like a friend: "Come here often?", "Captain, we're drifting off course!" — warm, not clinical |
| **Privacy-first** | All data stays on your device. No accounts, no servers, no tracking. Period. |

### 4. How It Works (3-step)

1. **Add sites** you want to be mindful about
2. **A gentle overlay appears** when you visit one, showing your positive alternatives
3. **You always have the final say** — unblock anytime, no guilt

Visual: step-by-step screenshots or illustrated flow.

### 5. Who It's For — Persona Cards

Three relatable cards — keep them human, not marketing-speak:

| Card | Quote | Context |
|---|---|---|
| **The Student** | "I need to finish my thesis but I keep ending up on Instagram" | First time managing own schedule. Tried a blocker, turned it off after a hard day. |
| **The Professional** | "My wife told me I might have a phone problem" | All his stories are about TikTok reels. Has tools in the garage gathering dust. |
| **The Job Seeker** | "I block one site and find three more to procrastinate on" | Knows he needs to upskill. Anxiety-driven procrastination cycle. |

### 6. Features

Show what's live and what's coming:

**Live now:**
- Site intention list — declare sites to be mindful about
- Positive alternatives list — sites you want to visit more
- Personality-driven overlay with 3D gradient — warm, playful nudges
- Configurable unblock timer — you always have the final say
- Settings: dark mode, custom messages, reduced motion
- Privacy-first — all data stays local, always

**Coming soon:**
- Streak tracking — consecutive days sticking to intentions
- Intentions kept counter — every time you resist, it counts
- Trend lines — "You visited Reddit 30% less this week"
- Weekly reflection summaries — warm, progress-oriented
- Graceful unblock tracking — unblocking isn't failure, it's data
- Data export — CSV/JSON, your data is yours

### 7. Pricing

```
┌─────────────────────────────────┬─────────────────────────────────┐
│          FREE FOREVER           │       PREMIUM (coming soon)     │
├─────────────────────────────────┼─────────────────────────────────┤
│ Full experience                 │ Everything in Free              │
│ All features                    │ Cross-device sync               │
│ Local storage                   │ Cloud backup                    │
│ No account needed               │ Account required                │
│ No limits                       │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```

Key message: "Premium exists to cover sync costs, not to hold features hostage."

### 8. Trust / Privacy Section

- "Foqus literally cannot see your data"
- No analytics, no telemetry, no server calls
- All storage is chrome.storage.local — never leaves your machine
- No cookie banners needed because there's nothing to consent to
- Contrast with competitors who collect browsing data

### 9. Competitor Comparison (subtle)

Small, honest comparison table:

| | Foqus | BlockSite | Cold Turkey | Freedom |
|---|---|---|---|---|
| Approach | Intention-first | Block-first | Block-first | Block-first |
| Tone | Warm, playful | Neutral | Strict | Neutral |
| Privacy | 100% local | Cloud/account | Local | Cloud/account |
| Unblock | Always available | Varies | Locked out | Varies |
| Price | Free | Freemium | Paid | Paid |

### 10. Footer

- Chrome Web Store CTA (repeated)
- Ko-fi link — "Support the project" (https://ko-fi.com/foqus)
- GitHub link if/when open sourced
- Tagline: "Built with care by humans who've been there"

---

## Design Notes

- Mobile-responsive (Bob is mobile-first — ironic but necessary)
- Dark mode toggle or system-preference detection
- Smooth scroll, minimal animations
- Respect `prefers-reduced-motion`
- No cookie banners (no tracking!)
- Favicon + OG image for social sharing
- Fast — aim for 100 Lighthouse performance

## Assets Needed

- 2-3 screenshots: popup UI, overlay experience, settings panel
- Demo GIF of the overlay (visit blocked site → overlay appears → suggestions shown)
- Chrome Web Store URL (when published)
- OG image (1200x630) for social sharing
- Favicon (reuse extension icon)

## Tone Guide for Copy

- Use "you" not "users"
- Use "mindful" not "blocked"
- Use "intention" not "restriction"
- Never shame — even when describing the problem
- Short sentences. Conversational. Like texting a friend who gets it.
- OK to be funny: "Come here often?" is the vibe
- Avoid: "productivity", "optimize", "hack", "grind"
