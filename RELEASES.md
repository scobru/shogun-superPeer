# Release Guide

This guide explains how to create and distribute releases of Shogun SuperPeer executables.

## Creating a Release

### 1. Prepare the Release

Update version in `package.json`:

```json
{
  "version": "0.7.0"
}
```

### 2. Build Executables

Build for all platforms:

```bash
npm install
npm run build:all
```

Or use the build script:

```bash
node build.js all
```

### 3. Test Executables

Test each executable on its respective platform:

**Windows:**
```cmd
dist\shogun-superPeer.exe
```

**Linux:**
```bash
chmod +x dist/shogun-superPeer-linux
./dist/shogun-superPeer-linux
```

**macOS:**
```bash
chmod +x dist/shogun-superPeer-macos
./dist/shogun-superPeer-macos
```

Verify:
- Server starts without errors
- Web interface is accessible at http://localhost:8080
- Gun sync is working
- Data persistence is working

### 4. Create GitHub Release

#### Option A: Using GitHub Web Interface

1. Go to your repository on GitHub
2. Click "Releases" → "Draft a new release"
3. Create a new tag (e.g., `v0.7.0`)
4. Set release title (e.g., "Shogun SuperPeer v0.7.0")
5. Add release notes (see template below)
6. Drag and drop executables from `dist/` folder
7. Publish release

#### Option B: Using GitHub CLI

```bash
# Install GitHub CLI if needed
# https://cli.github.com/

# Create release and upload assets
gh release create v0.7.0 \
  dist/shogun-superPeer.exe \
  dist/shogun-superPeer-linux \
  dist/shogun-superPeer-macos \
  --title "Shogun SuperPeer v0.7.0" \
  --notes-file RELEASE_NOTES.md
```

### Release Notes Template

```markdown
# Shogun SuperPeer v0.7.0

## 🎉 What's New

- Added standalone executable support
- No Node.js installation required
- Self-contained binaries for Windows, Linux, and macOS

## 📦 Downloads

Choose the right executable for your platform:

- **Windows (x64)**: [shogun-superPeer.exe](link)
- **Linux (x64)**: [shogun-superPeer-linux](link)
- **macOS (x64)**: [shogun-superPeer-macos](link)

## 🚀 Quick Start

### Windows
1. Download `shogun-superPeer.exe`
2. Double-click to run
3. Access at http://localhost:8080

### Linux/macOS
1. Download the appropriate file
2. Make it executable: `chmod +x shogun-superPeer-*`
3. Run: `./shogun-superPeer-linux` (or macos)
4. Access at http://localhost:8080

## 🐛 Bug Fixes

- Fixed ...
- Improved ...

## 📚 Documentation

- [README](https://github.com/scobru/shogun-superPeer/blob/main/README.md)
- [Build Guide](https://github.com/scobru/shogun-superPeer/blob/main/BUILD.md)

## ⚙️ Configuration

Default settings:
- HTTP Port: 8080
- HTTPS Port: 8443 (if SSL enabled)
- Data persistence: Enabled
- SSL: Disabled (can be enabled by modifying source)

## 🔧 For Developers

Build from source:
```bash
git clone https://github.com/scobru/shogun-superPeer.git
cd shogun-superPeer
npm install
npm start
```

## 💬 Support

- [Issues](https://github.com/scobru/shogun-superPeer/issues)
- [Discussions](https://github.com/scobru/shogun-superPeer/discussions)

## Checksums

```
SHA256(shogun-superPeer.exe) = ...
SHA256(shogun-superPeer-linux) = ...
SHA256(shogun-superPeer-macos) = ...
```
```

## Automated Release Workflow

### GitHub Actions (Recommended)

Create `.github/workflows/release.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build executables
        run: npm run build:all

      - name: Calculate checksums
        run: |
          cd dist
          sha256sum * > checksums.txt
          cd ..

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/shogun-superPeer.exe
            dist/shogun-superPeer-linux
            dist/shogun-superPeer-macos
            dist/checksums.txt
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### To trigger automated release:

```bash
# Tag the current commit
git tag v0.7.0

# Push the tag
git push origin v0.7.0

# GitHub Actions will automatically build and create the release
```

## Distribution Checklist

Before releasing, verify:

- [ ] Version number updated in `package.json`
- [ ] CHANGELOG updated
- [ ] All executables built and tested
- [ ] README up to date
- [ ] No sensitive data in executables
- [ ] Executables work on clean systems
- [ ] SSL certificate paths removed/generalized
- [ ] Default configuration is sensible
- [ ] Documentation links are correct
- [ ] Checksums calculated
- [ ] Release notes written
- [ ] Tag created and pushed

## Post-Release

After creating a release:

1. **Announce** on relevant channels (Discord, Twitter, etc.)
2. **Update documentation** if needed
3. **Monitor issues** for installation problems
4. **Update download links** on your website
5. **Archive old releases** if needed (keep last 3-5 versions)

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backwards compatible
- **Patch** (0.0.1): Bug fixes

## Security

For security releases:

1. **Don't** disclose vulnerability details publicly first
2. Create a private security advisory on GitHub
3. Release the fix
4. Publish advisory after users have had time to update
5. Credit security researchers appropriately

## File Naming Convention

Recommended naming:

```
shogun-superPeer-v0.7.0-win-x64.exe
shogun-superPeer-v0.7.0-linux-x64
shogun-superPeer-v0.7.0-macos-x64
shogun-superPeer-v0.7.0-macos-arm64
```

Update `package.json` to include version in filename:

```json
"scripts": {
  "build:win": "pkg . --targets node18-win-x64 --out-path dist --output dist/shogun-superPeer-${npm_package_version}-win-x64"
}
```

## Download Statistics

Track downloads using:
- GitHub release download counts
- Analytics on your website
- Package manager statistics (if published)

## Support Matrix

| Platform | Architecture | Supported | Tested |
|----------|-------------|-----------|---------|
| Windows | x64 | ✅ | ✅ |
| Linux | x64 | ✅ | ✅ |
| macOS | x64 (Intel) | ✅ | ✅ |
| macOS | arm64 (M1/M2) | ⚠️ | ❌ |
| Linux | arm64 | ⚠️ | ❌ |

⚠️ = Can be built but not tested

