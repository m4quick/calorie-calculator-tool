# GLP-1 Protein Calculator - Feature Brainstorm

**Date:** 2026-05-03
**Status:** Draft for review

---

## Executive Summary

7 daily-use feature ideas to make the GLP-1 protein calculator a habit-forming tool that users check daily. Focus on retention, engagement, and addressing specific GLP-1 patient psychology.

---

## Feature 1: "Muscle Guardian" Daily Snapshot ⚡

**Concept:** A morning "check-in" showing protein status at a glance with a visual muscle health meter.

**Why it works:**
- Reduced appetite means patients often don't "feel" hungry cues—this creates an external trigger
- The muscle visualization counters anxiety about muscle loss (major concern on GLP-1s)
- Takes under 15 seconds to view and close

**Implementation:**
- Large circular progress indicator showing protein vs. daily goal
- Color-coded muscle status: Green (on track), Yellow (need 20g+), Red (urgent)
- One-tap logging from the dashboard
- Morning notification: "Your muscles need 90g today 💪"

**Tech Stack:**
- LocalStorage for daily tracking
- CSS animations for muscle meter
- Service Worker for morning notifications

**Effort:** Low
**Daily Engagement:** High
**GLP-1 Specificity:** High

---

## Feature 2: "Snap & Score" Photo Tracking 📸

**Concept:** Take a photo of your meal, AI estimates protein instantly. No manual entry.

**Why it works:**
- GLP-1 patients eat smaller portions—manual weighing/logging feels like overkill
- Photo logging removes the "work" barrier to tracking
- Visual food diary helps spot patterns

**Implementation:**
- One-tap camera button on main screen
- AI recognizes common foods and estimates protein content
  - Can use browser-based TensorFlow.js or API to vision service
- User confirms or adjusts with slider (±5g, ±10g)
- Auto-saves to daily log with timestamp
- Privacy option: photos auto-delete after 24 hours, only protein data retained

**AI Options:**
1. **TensorFlow.js** - Free, runs in browser, pre-trained food models available
2. **Clarifai API** - Paid, food recognition API
3. **AWS Rekognition** - Paid, good accuracy
4. **Manual fallback** - If AI fails, user picks from food database

**Tech Stack:**
- Camera API (getUserMedia)
- TensorFlow.js or API endpoint
- IndexedDB for local storage
- Image compression before processing

**Effort:** Medium
**Daily Engagement:** Very High
**GLP-1 Specificity:** Medium

**Cost Estimate:**
- TensorFlow.js: Free (client-side)
- API approach: ~$0.001-0.005 per image

---

## Feature 3: "Nausea Navigator" Smart Suggestions 🤢→😊

**Concept:** Context-aware protein suggestions that change based on how the user is feeling.

**Why it works:**
- Nausea is a major GLP-1 side effect that kills motivation
- Instead of forcing protein when sick, the app adapts to reality
- Shows empathy, builds trust

**Implementation:**
- Optional mood/feeling check-in with emoji buttons (😊😐🤢)
- When "🤢" selected: suggests gentle options (protein smoothies, bone broth, cottage cheese)
- When "😊" selected: suggests higher-density options (meat, fish, Greek yogurt)
- Tracks patterns: "You often feel 🤢 on Tuesdays—try lighter protein that day"

**Tech Stack:**
- Simple emoji button UI
- Conditional logic for suggestions
- Pattern detection (track day-of-week nausea correlation)
- LocalStorage for history

**Effort:** Medium
**Daily Engagement:** Medium
**GLP-1 Specificity:** Very High

---

## Feature 4: "Protein Bingo" Mini-Game 🎯

**Concept:** A daily 3×3 bingo board with protein-related challenges that resets every 24 hours.

**Why it works:**
- GLP-1 patients struggle with reduced portions—this gamifies quality over quantity
- Small, achievable squares feel doable even with low appetite
- Social share option for completed bingos creates accountability

**Implementation:**
- Squares include:
  - "Add protein to breakfast"
  - "Drink a protein shake"
  - "Try Greek yogurt"
  - "Hit 30g before lunch"
  - "Include eggs today"
  - "Try a new protein source"
  - "Eat protein within 30 min of waking"
  - "Log all meals today"
  - "Hit 80% of protein goal"
- Tap to mark complete; diagonal/horizontal lines earn badges
- Weekly "Blackout Bingo" (all 9 squares) = special achievement
- Adapts squares based on user's food preferences and allergies

**Tech Stack:**
- CSS Grid for bingo board
- LocalStorage for daily state
- Confetti animation on completion
- Social sharing API for badges

**Effort:** Medium
**Daily Engagement:** Medium
**GLP-1 Specificity:** High

---

## Feature 5: "Protein Streaks" with Grace Periods 🔥

**Concept:** Streak counting for hitting protein goals, BUT with smart "rest days" to prevent streak anxiety.

**Why it works:**
- Traditional streaks create anxiety—miss one day and you lose everything
- GLP-1 patients have genuinely hard days (increased nausea, dosage changes)
- "Save streaks" feel forgiving while still motivating

**Implementation:**
- Weekly streak count (not daily—less pressure)
- "Rest days" allowed: 1 per week without breaking streak
- "Ice breakers": If streak breaks, next day offers bonus challenge to restart
- Visual fire icon grows larger with longer streaks
- Shareable "streak card" for social media (optional)

**Tech Stack:**
- LocalStorage for streak history
- Date calculations for week boundaries
- CSS animations for fire icon
- html2canvas for shareable cards

**Effort:** Low
**Daily Engagement:** High
**GLP-1 Specificity:** Medium

---

## Feature 6: "Weekly Win" Muscle Preservation Report 🏆

**Concept:** A personalized Sunday summary showing protein trends and muscle health score.

**Why it works:**
- GLP-1 patients need reassurance they're preserving muscle, not just losing weight
- Weekly cadence matches medication injection schedules (most GLP-1s are weekly)
- Data-driven feedback loop reinforces behavior

**Implementation:**
- Weekly protein average vs. goal
- Estimated muscle preservation score (based on protein intake + weight data if synced)
- Highlighted "Protein Hero" meal of the week
- Comparison to previous week ("You averaged 95g/day, up from 82g! 🔥")
- "Next week challenge": Gentle suggestion (e.g., "Try adding 10g to breakfast")

**Tech Stack:**
- Data aggregation from daily logs
- Charts (Chart.js or similar)
- Email/push notification delivery
- PDF generation (optional for download)

**Effort:** Low
**Daily Engagement:** Medium
**GLP-1 Specificity:** High

---

## Feature 7: "Protein Pal" Accountability Matching 👥

**Concept:** Optional matching with 1-2 other GLP-1 users at similar stages for light accountability.

**Why it works:**
- Social connection combats isolation in weight loss journeys
- GLP-1 patients often don't want to discuss medication with everyone—these are "safe" peers
- Low-pressure: optional high-fives, not competitive leaderboards

**Implementation:**
- Optional opt-in during onboarding
- Match based on:
  - GLP-1 medication type
  - Dosage timeline
  - Protein goals
  - Age range
- Daily "nudge" button: sends encouragement notification to match ("Sarah hit her goal! 🎉")
- Group chat limited to 3 people (small, intimate)
- Weekly "group wins" summary (anonymized)
- Easy opt-out anytime (no guilt)

**Tech Stack:**
- User matching algorithm (simple SQL queries)
- Real-time chat (WebSockets or Firebase)
- Push notifications
- Privacy controls (what data is shared)

**Effort:** High
**Daily Engagement:** Low
**GLP-1 Specificity:** High

---

## iPhone App vs. PWA Decision Matrix

| Factor | PWA (Progressive Web App) | Native iPhone App |
|--------|---------------------------|-------------------|
| **Cost to Build** | $0 (same codebase) | High (separate development) |
| **App Store Approval** | Not needed | Required (7-14 days, rules) |
| **Annual Cost** | $0 | $99 Apple Developer fee |
| **Install Process** | "Add to Home Screen" | App Store download |
| **Offline Capability** | ✅ Yes (Service Workers) | ✅ Yes (native) |
| **Push Notifications** | ✅ Yes | ✅ Yes (better) |
| **Camera Access** | ✅ Yes | ✅ Yes (better) |
| **HealthKit Integration** | ❌ No | ✅ Yes (big advantage) |
| **Background Sync** | Limited | ✅ Full |
| **Performance** | Good | Better |
| **App Store Discoverability** | ❌ No | ✅ Yes |
| **Update Speed** | Instant | Review process |

**Recommendation:** Start with PWA. If traction justifies it ($5000+ MRR), build native app.

### PWA Features to Implement:
1. **Web App Manifest** - Enables "Add to Home Screen"
2. **Service Worker** - Offline functionality
3. **Push Notifications** - Daily reminders
4. **Camera API** - Snap & Score feature
5. **Background Sync** - Queue tracking when offline

### When to Go Native:
- 10,000+ active users
- Users asking for HealthKit integration
- Revenue justifies $25-50k development cost
- Need advanced ML (on-device food recognition)

---

## Implementation Priority (MVP → Full)

### Phase 1: MVP (2-3 weeks)
1. ✅ Muscle Guardian (daily snapshot)
2. ✅ Snap & Score (basic photo logging)
3. ✅ PWA basics (manifest + service worker)

**Goal:** Get users opening the app daily

### Phase 2: Engagement (2-3 weeks)
4. ✅ Nausea Navigator (smart suggestions)
5. ✅ Protein Streaks (gamification)

**Goal:** Increase time-on-site and retention

### Phase 3: Advanced (4-6 weeks)
6. ✅ Protein Bingo (full game)
7. ✅ Weekly Win (reports)
8. ✅ Protein Pal (matching)

**Goal:** Build community and long-term value

---

## Revenue Opportunities

### Current:
- ✅ AdSense ads
- ✅ Amazon affiliate links

### Future:
- **Premium tier** ($4.99/month):
  - AI meal planning
  - Unlimited photo logging
  - Advanced analytics
  - Priority support
  - No ads
- **Health coach integration** - Connect with nutritionists
- **Sponsored recipes** - Protein brands pay for placement
- **White-label** - License to weight loss clinics

---

## Technical Architecture Notes

### Data Model:
```javascript
// Daily Log
{
  date: "2026-05-03",
  proteinGoal: 120,
  proteinConsumed: 95,
  meals: [
    { time: "08:00", food: "Eggs", protein: 18, photo: "blob..." },
    { time: "12:30", food: "Chicken", protein: 35, photo: "blob..." },
    { time: "18:00", food: "Greek yogurt", protein: 20, photo: null }
  ],
  mood: "😐", // nausea level
  streakDay: 12,
  bingoProgress: [true, false, true, ...]
}
```

### Storage Strategy:
- **LocalStorage/IndexedDB** - Primary (offline-first)
- **Sync to Cloud** - Optional (for backup + cross-device)
- **Privacy** - All data stays local unless user opts into cloud

### AI Strategy:
- **Phase 1:** Rule-based food recognition (simpler)
- **Phase 2:** TensorFlow.js on-device (privacy-friendly)
- **Phase 3:** API-based (more accurate, costs money)

---

## Next Steps

**Immediate:**
1. Review and prioritize features
2. Decide on PWA vs Native (recommend PWA first)
3. Create feature roadmap
4. Estimate development timeline

**This Week:**
1. Implement Muscle Guardian
2. Add PWA capabilities
3. Deploy for beta testing

**Questions to Answer:**
- Do you want user accounts (for cloud sync)?
- Should we integrate with Apple HealthKit eventually?
- What's the budget for AI features (API costs)?
- Timeline for first public release?

---

**Document Status:** Draft - Ready for review
**Last Updated:** 2026-05-03
