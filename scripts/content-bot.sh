#!/bin/bash
# Content Update Bot for GLP-1 Protein Calculator
# Creates content updates for approval via Gitea

set -e

REPO_URL="http://10.0.0.254:3000/anu-sir/calorie-calculator-tool.git"
WORK_DIR="/tmp/content-bot-$$"
DATE=$(date +%Y-%m-%d)
BRANCH="content-update-${DATE}"

echo "🤖 Content Bot Starting..."
echo "Date: $DATE"

# Clone repo
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"
git clone "$REPO_URL" .
git checkout -b "$BRANCH"

# Generate content update (example: add new recipe)
cat >> content-queue/new-recipes.md << EOF

## New Recipe Queue - $DATE
- [ ] High-Protein GLP-1 Friendly Smoothie
- [ ] 30g Protein Lunch Bowl
- [ ] Quick Protein Snack Ideas

EOF

# Commit changes
git add -A
git commit -m "Content Update $DATE: New recipe suggestions"

# Push to Gitea
git push origin "$BRANCH"

# Create PR via Gitea API (requires API token)
# curl -X POST "http://10.0.0.254:3000/api/v1/repos/anu-sir/calorie-calculator-tool/pulls" \
#   -H "Authorization: token $GITEA_TOKEN" \
#   -d "{\"title\":\"Content Update $DATE\",\"head\":\"$BRANCH\",\"base\":\"main\"}"

echo "✅ Content update created in branch: $BRANCH"
echo "🔗 Review at: http://10.0.0.254:3000/anu-sir/calorie-calculator-tool/pulls"

# Cleanup
cd /
rm -rf "$WORK_DIR"
