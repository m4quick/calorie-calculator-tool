# Bariatric Surgery Feature Documentation

## Current Implementation (as of 2026-05-02 00:14)

### Location
`/Users/mirzaie/.openclaw/workspace/calculator-sites/calorie-calculator-tool/index.html`

### Components Added

#### 1. HTML Structure
- **Bariatric Surgery Status dropdown** (lines ~409-416)
  - Options: none, recent (0-6 months), recovery (6-12 months), longterm (1+ years)

- **Organization selector dropdown** (lines ~419-430)
  - Default: "-- Compare both guidelines --" (value="")
  - ASMBS option
  - AND option
  - Links to official guidelines below dropdown

- **Guidelines panel** (lines ~433+) with three views:
  - `guidelines-comparison`: Side-by-side ASMBS + AND (default view)
  - `guidelines-asmbs`: Detailed ASMBS-only view
  - `guidelines-and`: Detailed AND-only view

#### 2. JavaScript Functions
- `toggleBariatric()`: Handles showing/hiding organization dropdown and switching between comparison/asmbs/and views
- `updateBariatricCalculation()`: Re-runs toggleBariatric when org selection changes
- `calculateCalories()`: Auto-selects ASMBS if org is blank when Calculate is clicked

#### 3. View Switching Logic
- **No bariatric selected**: Hide all
- **Bariatric selected, org=""**: Show comparison view (both guidelines)
- **Bariatric selected, org="asmbs"**: Show ASMBS-only detailed view
- **Bariatric selected, org="and"**: Show AND-only detailed view

#### 4. Detailed Content Per Phase

**ASMBS Recent (0-6 months):**
- Calories: 800-1,200/day
- Protein: 60-80g (women), 80-100g (men)
- Phase: Clear liquids → Full liquids → Pureed → Soft
- Fluids: 64+ oz/day
- Vitamin supplementation: Multivitamin, B12, Iron, Calcium
- Meal pattern: 3 small meals + 2 protein snacks
- Hydration: Sip fluids between meals, not with meals

**ASMBS Recovery (6-12 months):**
- Calories: 1,000-1,400/day
- Protein: 60-80g (women), 80-100g (men)
- Diet progression: Soft foods → Regular textures
- Expected weight loss: 1-2 lbs/week
- Food tolerance: Test new foods one at a time
- Portion sizes: ½-1 cup per meal
- Chewing: 20-30 chews per bite

**ASMBS Long-term (1+ years):**
- Calories: 1,200-1,800/day (maintenance)
- Protein: 60-80g minimum daily
- Diet: Regular balanced diet with portion control
- Monitoring: Annual labs (CBC, CMP, B12, Iron, Vitamin D)
- Exercise: 150 minutes moderate activity per week
- Follow-up: Annual visits with bariatric team
- Goal weight: Maintain within 10 lbs of target

**AND Recent (0-6 months):**
- Calories: 900-1,000/day
- Protein: 60-80g (60-75% from supplements)
- Focus: Protein-first eating at every meal
- Supplements: Complete multivitamin + B12 sublingual
- Meal pattern: 3 small meals + 2 protein shakes
- Fluid goals: 48-64 oz daily, sip slowly
- Avoid: Straws, carbonation, dumping trigger foods

**AND Recovery (6-12 months):**
- Calories: 1,000-1,200/day
- Protein: 60-80g (50% from whole food sources)
- Focus: Transition to whole foods
- Supplements: Continue B12, add Iron if deficient
- Food introduction: Add one new food every 2-3 days
- Intolerance signs: Nausea, vomiting, diarrhea, foamies
- Mindful eating: No distractions, stop at first fullness

**AND Long-term (1+ years):**
- Calories: Based on TDEE - 500 for maintenance
- Protein: 60-80g (whole food sources preferred)
- Focus: Sustainable eating patterns for life
- Supplements: Lifelong multivitamin + B12 required
- Behavioral health: Ongoing support for food relationships
- Physical activity: Regular exercise as lifestyle
- Community: Support groups and peer connections

### Git History
- Started at commit c04d32b (ASMBS/AND organization selector)
- Added blank option at commit 80aa1b1
- Implemented detailed single-org views at commit 1de32d1

### Testing Notes
- Local server runs on port 8080 via test-server.py
- Test flow: select phase → see comparison → select org → see detailed view

### Known Issues / TODO
- May need visual polish on the detailed views
- Consider adding calculation adjustments based on selected guidelines
- Could add links to official guidelines within the detailed views

### References
- ASMBS Guidelines: https://asmbs.org/resources/guidelines
- AND (formerly ADA): https://www.eatright.org
