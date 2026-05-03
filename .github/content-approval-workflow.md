# Content Update Approval Workflow

## Overview
Automated content updates with human approval via Gitea.

## Workflow Steps

### 1. Content Bot Creates Draft
- Bot runs daily/weekly to generate content updates
- Creates new branch: `content-update-YYYY-MM-DD`
- Commits changes
- Opens PR with summary

### 2. Human Review
- Review PR in Gitea web interface
- Approve or request changes
- Merge to trigger deployment

### 3. Auto-Deployment
- Merges to `main` trigger GitHub Actions
- Deploys to production

## Content Types
- Recipe updates
- Food database additions
- GLP-1 medication guidelines
- Protein targets based on new research

## Gitea URL
http://10.0.0.254:3000/anu-sir/calorie-calculator-tool
