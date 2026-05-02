# Calorie Calculator Tool - Deployment Workflow

## Overview

**GitHub = Primary Source (Commercial Sites)**
**Gitea = Backup Mirror (On-Premises)**

This workflow ensures commercial sites have reliable cloud-based deployment with GitHub as the source of truth, while Gitea serves as a local backup for offline work or disaster recovery.

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Local     │────▶│    GitHub    │────▶│  CloudFlare  │
│   Dev       │     │   (Primary)  │     │  (Production)│
└─────────────┘     └──────────────┘     └──────────────┘
                           │
                           │  Mirror/Sync
                           ▼
                    ┌──────────────┐
                    │    Gitea     │
                    │   (Backup)   │
                    └──────────────┘
```

---

## Workflow Steps

### 1. Initial Setup (First Time)

```bash
# Clone from GitHub (source of truth)
git clone https://github.com/m4quick/calorie-calculator-tool.git
cd calorie-calculator-tool

# Add Gitea as backup remote
git remote add gitea http://10.0.0.254:3000/anu-sir/calorie-calculator-tool.git

# Configure GitHub credentials (token needed)
git remote set-url origin https://TOKEN@github.com/m4quick/calorie-calculator-tool.git
```

### 2. Daily Development Workflow

```bash
# Step 1: Pull latest from GitHub
git pull origin main

# Step 2: Make your changes
# Edit files, test locally...

# Step 3: Commit changes
git add .
git commit -m "Your commit message"

# Step 4: Push to GitHub (triggers CICD)
git push origin main

# Step 5: Sync to Gitea (backup)
git push gitea main
```

### 3. CICD Deployment

GitHub Actions automatically:
1. Validates HTML content (>5KB)
2. Checks for required policy files
3. Validates educational content sections
4. Deploys to production server
5. Verifies site is live

### 4. Rollback Process

If deployment has issues:

```bash
# Option 1: Revert via GitHub UI
# Go to: https://github.com/m4quick/calorie-calculator-tool
# Click "Revert" on the problematic commit

# Option 2: Revert locally and push
git revert HEAD  # Reverts last commit
git push origin main  # Triggers new deployment

# Option 3: Reset to previous commit
git reset --hard HEAD~1  # Go back 1 commit
git push origin main --force  # Force push (careful!)
```

### 5. Disaster Recovery

#### Scenario A: Gitea Disk Failure
- GitHub still has everything ✅
- CloudFlare still serves site ✅
- Continue working from GitHub ✅
- Restore Gitea later from GitHub

#### Scenario B: Internet Outage
- Work locally with last pulled version
- Commit changes locally
- Push to Gitea (if local network works)
- Push to GitHub once internet restored
- Resolve any merge conflicts

#### Scenario C: Complete Local Failure
- Clone fresh from GitHub: `git clone https://github.com/m4quick/calorie-calculator-tool.git`
- Add Gitea remote: `git remote add gitea http://10.0.0.254:3000/anu-sir/calorie-calculator-tool.git`
- Continue development

---

## Git Remote Configuration

| Remote | URL | Purpose |
|--------|-----|---------|
| `origin` | `https://github.com/m4quick/calorie-calculator-tool.git` | Primary - push triggers CICD |
| `gitea` | `http://10.0.0.254:3000/anu-sir/calorie-calculator-tool.git` | Backup - sync from GitHub |

---

## Required Secrets (GitHub)

Configure in: https://github.com/m4quick/calorie-calculator-tool/settings/secrets

| Secret | Purpose | Example |
|--------|---------|---------|
| `DEPLOY_SSH_KEY` | SSH key for server deployment | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_HOST` | Production server IP/hostname | `calorie-calculator-tool.com` |
| `SERVER_USER` | SSH username | `deploy` |

---

## File Structure

```
calorie-calculator-tool/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CICD
├── .gitea/
│   └── mirror-from-github.sh   # Gitea sync script (pull from GitHub)
├── index.html                  # Main calculator page
├── README.md                   # Project documentation
├── WORKFLOW.md                 # This file
├── sync-from-github.sh         # Manual sync script
├── privacy.html               # Required for AdSense
├── terms.html                 # Required for AdSense
├── cookies.html               # Required for AdSense
└── ads.txt                    # Required for AdSense
```

---

## Validation Rules (CICD)

The CICD pipeline validates:

1. **HTML Size**: >5KB (prevents thin content)
2. **Content Sections**:
   - "How It Works" section present
   - FAQ section present
3. **Policy Files**:
   - `privacy.html` exists
   - `terms.html` exists
   - `cookies.html` exists
   - `ads.txt` exists

---

## Commands Reference

```bash
# Pull latest from GitHub
git pull origin main

# Push to GitHub (triggers CICD)
git push origin main

# Sync to Gitea (backup)
git push gitea main

# Check remote configuration
git remote -v

# View commit history
git log --oneline -10

# Check status
git status
```

---

## Notes

- **Commercial sites** (like calorie-calculator-tool.com) use GitHub primary
- **Personal/internal projects** can use Gitea primary
- Always push to GitHub first for commercial sites
- Gitea sync is optional but recommended for backup
- CICD only triggers on GitHub pushes (not Gitea)

---

## Status

- [x] CICD workflow created
- [x] GitHub Actions configured
- [x] Gitea backup remote configured
- [x] Workflow documented
- [ ] GitHub secrets configured (user must do)
- [ ] Initial push to GitHub (user must do)
- [ ] Gitea sync tested

---

**Last Updated:** 2026-05-01
**Version:** 1.0
