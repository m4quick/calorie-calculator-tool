#!/bin/bash
# Setup GitHub Actions secrets from .env.deploy file
# Usage: ./scripts/setup-github-secrets.sh (reads .env.deploy directly)

set -e

REPO="m4quick/calorie-calculator-tool"
ENV_FILE=".env.deploy"

echo "Setting up GitHub secrets for $REPO..."

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI not authenticated. Run: gh auth login"
    exit 1
fi

# Check if .env.deploy exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ $ENV_FILE not found. Copy .env.deploy.template and fill in values"
    exit 1
fi

# Extract values from .env.deploy (handle multiline SSH key)
DEPLOY_SSH_KEY=$(sed -n '/^DEPLOY_SSH_KEY="/,/^-----END/p' "$ENV_FILE" | sed '1d;$d' | tr -d '\n')
SERVER_HOST=$(grep "^SERVER_HOST=" "$ENV_FILE" | cut -d'"' -f2)
SERVER_USER=$(grep "^SERVER_USER=" "$ENV_FILE" | cut -d'"' -f2)

# Check if values were extracted
if [ -z "$DEPLOY_SSH_KEY" ] || [ -z "$SERVER_HOST" ] || [ -z "$SERVER_USER" ]; then
    echo "❌ Failed to extract secrets from $ENV_FILE"
    exit 1
fi

# Set secrets in GitHub
echo "Setting DEPLOY_SSH_KEY..."
printf '%s' "$DEPLOY_SSH_KEY" | gh secret set DEPLOY_SSH_KEY --repo "$REPO"

echo "Setting SERVER_HOST..."
printf '%s' "$SERVER_HOST" | gh secret set SERVER_HOST --repo "$REPO"

echo "Setting SERVER_USER..."
printf '%s' "$SERVER_USER" | gh secret set SERVER_USER --repo "$REPO"

echo "✅ Secrets set successfully!"
echo ""
echo "You can verify with: gh secret list --repo $REPO"
