#!/bin/bash
# Sync from Gitea (primary) to GitHub (mirror)
# Run this after making changes and pushing to Gitea

set -e

echo "======================================"
echo "Sync to GitHub"
echo "======================================"
echo ""

# Check if GitHub remote exists
if ! git remote | grep -q "github"; then
    echo "Adding GitHub remote..."
    # You'll need to add your GitHub token or use SSH
    # Example with token: git remote add github https://TOKEN@github.com/m4quick/calorie-calculator-tool.git
    echo "Please configure GitHub remote with:"
    echo "  git remote add github https://github.com/m4quick/calorie-calculator-tool.git"
    echo "Or with token:"
    echo "  git remote add github https://TOKEN@github.com/m4quick/calorie-calculator-tool.git"
    exit 1
fi

echo "Fetching from Gitea (origin)..."
git fetch origin

echo "Pushing to GitHub..."
git push github main --force

echo ""
echo "======================================"
echo "✅ Sync complete!"
echo "Gitea: http://10.0.0.254:3000/anu-sir/calorie-calculator-tool"
echo "GitHub: https://github.com/m4quick/calorie-calculator-tool"
echo "======================================"
