# Building Standalone Executables

This guide explains how to build standalone executables for Shogun SuperPeer.

## What are Standalone Executables?

Standalone executables are self-contained binary files that include:
- Node.js runtime
- All dependencies (Gun, Express, etc.)
- Your application code
- Static assets (HTML, etc.)

Users can run these executables **without installing Node.js or npm**.

## Prerequisites

- Node.js and npm installed (for building only)
- At least 200MB of free disk space per platform

## Quick Build

### Build for all platforms at once:

```bash
npm install
npm run build:all
```

This creates executables for:
- Windows (x64)
- Linux (x64)
- macOS (x64)

### Build for specific platform:

```bash
# Windows only
npm run build:win

# Linux only
npm run build:linux

# macOS only
npm run build:mac
```

### Using the build script:

```bash
# Interactive build with better output
node build.js all        # All platforms
node build.js windows    # Windows only
node build.js linux      # Linux only
node build.js mac        # macOS only
```

## Output

Executables will be in the `dist/` folder:

```
dist/
├── shogun-superPeer.exe          # Windows
├── shogun-superPeer-linux        # Linux
└── shogun-superPeer-macos        # macOS
```

Each executable is approximately 50-80MB (includes Node.js runtime).

## Distribution

You can distribute these executables to users who can simply:

1. Download the file
2. Run it (double-click on Windows, `./shogun-superPeer-linux` on Linux/Mac)
3. Access the relay at `http://localhost:8080`

## Configuration

Users can modify `index.js` before building to change:
- Ports (default: 8080 for HTTP, 8443 for HTTPS)
- SSL/HTTPS settings
- Persistence settings
- Peer connections

## Customization

### Change output name

Edit `package.json`:

```json
"pkg": {
  "outputPath": "dist",
  "targets": ["node18-win-x64"],
  "outputName": "my-custom-name"
}
```

### Include additional files

Edit `package.json` under `pkg.assets`:

```json
"pkg": {
  "assets": [
    "view/**/*",
    "node_modules/gun/**/*",
    "your-custom-files/**/*"
  ]
}
```

### Target different architectures

Available targets:
- `node18-win-x64` - Windows 64-bit
- `node18-linux-x64` - Linux 64-bit
- `node18-macos-x64` - macOS Intel
- `node18-macos-arm64` - macOS Apple Silicon (M1/M2)
- `node18-linux-arm64` - Linux ARM (Raspberry Pi, etc.)

Example for Raspberry Pi:

```bash
npx pkg . --targets node18-linux-arm64 --out-path dist
```

## Troubleshooting

### "Cannot find module" errors

If you get module errors, add the missing modules to `pkg.scripts` in `package.json`:

```json
"pkg": {
  "scripts": [
    "node_modules/gun/**/*.js",
    "node_modules/your-module/**/*.js"
  ]
}
```

### Executable is too large

pkg includes the entire Node.js runtime. To reduce size:

1. Remove unused dependencies
2. Use `--compress GZip` flag (experimental)
3. Build for specific platform only

### Permission denied on Linux/Mac

Make the executable runnable:

```bash
chmod +x dist/shogun-superPeer-linux
```

### Antivirus blocking executable

Some antivirus software may flag the executable. This is a false positive common with pkg executables. You may need to:

1. Add an exception in your antivirus
2. Sign the executable (Windows: Authenticode, macOS: codesign)

## Advanced: Code Signing

### Windows

Use a code signing certificate:

```powershell
signtool sign /f certificate.pfx /p password /t http://timestamp.server.com dist/shogun-superPeer.exe
```

### macOS

```bash
codesign --sign "Developer ID Application: Your Name" dist/shogun-superPeer-macos
```

## CI/CD Integration

### GitHub Actions example:

```yaml
name: Build Executables

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build:all
      - uses: actions/upload-artifact@v3
        with:
          name: executables
          path: dist/*
```

## Additional Resources

- [pkg documentation](https://github.com/vercel/pkg)
- [Gun documentation](https://gun.eco/docs/)
- [Shogun SuperPeer Repository](https://github.com/scobru/shogun-superPeer)

