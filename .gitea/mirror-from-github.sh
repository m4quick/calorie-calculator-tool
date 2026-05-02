#!/bin/bash
# Mirror script: Pull from GitHub to Gitea (Gitea is BACKUP)
# This runs on the Gitea server to sync FROM GitHub

set -e

GITEA_REPO="/var/lib/gitea/data/gitea-repositories/anu-sir/calorie-calculator-tool.git"
GITHUB_REPO="https://github.com/m4quick/calorie-calculator-tool.git"

echo "=========================================="
echo "Syncing from GitHub to Gitea"
echo "=========================================="
echo ""

# Check if repo exists
if [ ! -d "$GITEA_REPO" ]; then
    echo "Repository not found at $GITEA_REPO"
    echo "Creating mirror..."
    git clone --mirror "$GITHUB_REPO" "$GITEA_REPO"
fi

cd "$GITEA_REPO"

# Fetch latest from GitHub
echo "Fetching from GitHub..."
git fetch origin

# Update all branches
echo "Updating branches..."
git update-ref refs/heads/main origin/main

echo ""
echo "=========================================="
echo "✅ Sync complete!"
echo "GitHub → Gitea"
echo "=========================================="
