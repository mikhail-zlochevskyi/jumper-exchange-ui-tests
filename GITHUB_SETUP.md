# GitHub Setup Guide

Complete guide to publish this project to GitHub and enable CI/CD.

## Prerequisites

- GitHub account
- Git installed locally
- SSH key configured (or use HTTPS)

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository: `jumper-exchange-ui-tests`
3. Choose visibility: **Public** (for open source) or **Private**
4. Do NOT initialize with README (we have one)
5. Click "Create repository"

## Step 2: Update Configuration Files

### Update package.json

Replace `yourusername` with your actual GitHub username:

```bash
sed -i '' 's/yourusername/YOUR_USERNAME/g' package.json
```

Or manually update:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests#readme"
}
```

### Update README.md

Replace placeholder URLs in README.md:

```bash
sed -i '' 's/yourusername/YOUR_USERNAME/g' README.md
sed -i '' 's/your_email@example.com/YOUR_EMAIL/g' .env.example
```

## Step 3: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial project setup with Playwright UI tests"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click "Actions" tab
3. GitHub should detect the workflow file
4. Click "I understand my workflows, go ahead and enable them"

### Verify Workflow

1. Go to "Actions" tab
2. You should see "Playwright Tests" workflow
3. Click on it to view details

## Step 5: Configure Secrets (Optional)

If you need to store sensitive data:

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add secrets:
   - `BASE_URL`: Your test environment URL
   - `TEST_USER_EMAIL`: Test user email
   - `TEST_USER_PASSWORD`: Test user password

### Use Secrets in Workflow

In `.github/workflows/tests.yml`:

```yaml
env:
  BASE_URL: ${{ secrets.BASE_URL || 'https://jumper.exchange' }}
```

## Step 6: Add Branch Protection (Optional)

1. Go to Settings → Branches
2. Click "Add rule" under Branch protection rules
3. Pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
5. Save changes

## Step 7: Configure Test Reporting (Optional)

### Enable Code Coverage

1. Go to Settings → Code security and analysis
2. Enable "Code scanning"
3. Enable "Dependabot alerts"

### Add Badge to README

Add this to your README.md:

```markdown
[![Tests](https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/actions/workflows/tests.yml/badge.svg)](https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/actions)
```

## Step 8: Add Topics (Optional)

1. Go to repository main page
2. Click "About" (gear icon)
3. Add topics:
   - `playwright`
   - `automation-testing`
   - `ui-testing`
   - `jumper-exchange`
   - `blockchain`
   - `crypto`

## Step 9: Create Release (Optional)

```bash
# Create a tag
git tag -a v1.0.0 -m "Initial release"

# Push tag to GitHub
git push origin v1.0.0
```

Then on GitHub:
1. Go to Releases
2. Click "Create a release"
3. Select tag `v1.0.0`
4. Add release notes
5. Publish release

## Step 10: Enable Discussions (Optional)

1. Go to Settings
2. Scroll to "Features"
3. Enable "Discussions"
4. This allows community discussions

## Verify Setup

### Check Workflow Runs

1. Go to Actions tab
2. You should see workflow runs
3. Click on a run to see details
4. Check for:
   - ✅ All jobs passed
   - ✅ Test results uploaded
   - ✅ Reports generated

### Check Test Reports

After first workflow run:

1. Go to Actions
2. Click on latest workflow run
3. Click on a job
4. Scroll down to see artifacts
5. Download test reports

## Troubleshooting

### Workflow Not Running

- Check `.github/workflows/tests.yml` exists
- Verify syntax is correct
- Check branch name matches (main vs master)
- Try pushing a new commit

### Tests Failing in CI

- Check BASE_URL is correct
- Verify environment variables are set
- Check browser installation
- Review test logs in Actions

### Artifacts Not Uploading

- Check artifact path is correct
- Verify retention days setting
- Check disk space on runner

## Continuous Integration Best Practices

### Commit Messages

Use conventional commits:

```
feat(swap): add token search
fix(bridge): resolve chain selection bug
docs(readme): update installation
test(wallet): add connection tests
```

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
- [ ] Added tests
- [ ] All tests pass

## Checklist
- [ ] Code follows style
- [ ] Self-review done
- [ ] Documentation updated
```

### Issue Template

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Actual Behavior
What actually happens
```

## Next Steps

1. ✅ Repository created
2. ✅ Code pushed to GitHub
3. ✅ GitHub Actions configured
4. 📝 Add collaborators (if needed)
5. 🔔 Enable notifications
6. 📊 Monitor test results
7. 🚀 Share with team

## Useful GitHub URLs

- Repository: `https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests`
- Actions: `https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/actions`
- Issues: `https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/issues`
- Pull Requests: `https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/pulls`
- Settings: `https://github.com/YOUR_USERNAME/jumper-exchange-ui-tests/settings`

## Resources

- [GitHub Docs](https://docs.github.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Setup Complete!** Your project is now on GitHub with automated testing. 🎉
