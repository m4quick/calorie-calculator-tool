#!/bin/bash
# Mirror script: Push from Gitea to GitHub
# This should be configured as a post-receive hook in Gitea

set -e

echo "Mirroring to GitHub..."

# GitHub repo URL (needs token in URL or SSH key configured)
GITHUB_REPO="https://github.com/m4quick/calorie-calculator-tool.git"

# Push to GitHub
git push "$GITHUB_REPO" main --force

echo "Mirror complete!"
