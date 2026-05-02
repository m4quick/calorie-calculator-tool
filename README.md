# Calorie Calculator Tool

Daily Calorie Needs & BMR Calculator - Privacy-focused health tool.

**Live Site:** https://calorie-calculator-tool.com

## Features

- **BMR Calculator** - Basal Metabolic Rate using Mifflin-St Jeor equation
- **TDEE Calculator** - Total Daily Energy Expenditure
- **Macro Recommendations** - Protein, carbs, fat breakdown
- **Weight Loss Timeline** - Projected time to goal
- **BMI Calculator** - Body Mass Index

## Technology

- Pure HTML/CSS/JavaScript
- No external dependencies
- Privacy-focused (no data collection)
- Mobile responsive

## Deployment

### Automatic (Recommended)

Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
```

The CICD pipeline will:
1. Validate HTML and content
2. Check for required policy files
3. Deploy to server
4. Verify site is live

### Manual

```bash
scp -r ./* user@server:/var/www/calorie-calculator-tool/
```

## CICD Pipeline

See `.github/workflows/deploy.yml`

### Validation Steps

- ✅ HTML file exists and has substantial content (>5KB)
- ✅ Contains educational sections (How It Works, FAQ)
- ✅ Has required policy files (privacy, terms, cookies, ads.txt)

### Required Secrets

Configure in GitHub repository settings:

- `DEPLOY_SSH_KEY` - SSH private key for deployment
- `SERVER_HOST` - Target server IP/hostname
- `SERVER_USER` - SSH username

## Google AdSense Compliance

This site follows Google AdSense policies:

1. **Substantial Content** - Educational articles about metabolism, TDEE, BMR
2. **Value-First** - Calculator functionality before any ads
3. **Required Pages** - Privacy, Terms, Cookies policy pages
4. **No Deceptive Layout** - Clear separation of content and ads

## Content Strategy

### Current
- Calculator tool
- How It Works explanation
- FAQ section
- Formula documentation

### Planned Additions
- [ ] Understanding Metabolism article
- [ ] Macronutrients Explained guide
- [ ] Safe Calorie Deficits article
- [ ] TDEE vs BMR comparison
- [ ] Exercise calorie burn guides
- [ ] Meal planning resources

## License

MIT

## Author

Michael Mirzaie
