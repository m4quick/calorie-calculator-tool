# Local Testing Guide

## Production-like Local Server

We provide a production-like test server that mimics Apache/Nginx behavior.

### Start Test Server

```bash
# Option 1: Using Python script
python3 test-server.py

# Option 2: Quick Python (simpler, no headers)
python3 -m http.server 8080
```

### Access Site

- **URL:** http://localhost:8080
- **Mirror of production** - Same files, same structure

### Test Server Features

| Feature | test-server.py | python -m http.server |
|---------|---------------|----------------------|
| Correct MIME types | ✅ | ✅ |
| Production headers | ✅ | ❌ |
| Index.html serving | ✅ | ✅ |
| Directory listing | ❌ (safer) | ✅ |
| Cache headers | ✅ | ❌ |
| Security headers | ✅ | ❌ |

### Recommended Workflow

```bash
# 1. Start test server
python3 test-server.py

# 2. Open browser to http://localhost:8080

# 3. Make changes to files

# 4. Refresh browser to see changes

# 5. Test complete? Push to GitHub
```

### Testing Checklist

Before pushing to production, verify:

- [ ] Calculator works (inputs, outputs)
- [ ] Responsive design (resize browser)
- [ ] All pages load (privacy, terms, cookies)
- [ ] No console errors (F12 → Console)
- [ ] Ads load (if configured)
- [ ] Links work
- [ ] Form validation works

### Mobile Testing

1. Start server with your Mac's IP:
   ```bash
   # Find your IP
   ifconfig | grep "inet " | head -1
   
   # Use IP in URL on phone
   # http://YOUR_IP:8080
   ```

2. Open http://YOUR_IP:8080 on phone/tablet

### Stop Server

Press **Ctrl+C** in terminal.

---

**Note:** This is a static file server. It serves the exact same HTML/CSS/JS files that will be deployed to production.
