#!/bin/bash
# Sync FROM GitHub TO Gitea (Gitea is backup)
# Run this after pushing to GitHub to update Gitea backup

set -e

echo "=========================================="
echo "Sync from GitHub to Gitea"
echo "=========================================="
echo ""

# Fetch latest from GitHub
echo "Fetching from GitHub (origin)..."
git fetch origin

# Push to Gitea (backup)
echo "Pushing to Gitea (backup)..."
git push gitea main --force

echo ""
echo "=========================================="
echo "✅ Sync complete!"
echo "GitHub: https://github.com/m4quick/calorie-calculator-tool"
echo "Gitea:  http://10.0.0.254:3000/anu-sir/calorie-calculator-tool"
echo "=========================================="
