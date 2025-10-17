#!/usr/bin/env node

/**
 * Post-build script to copy necessary files to dist folder
 */

const fs = require('fs-extra');

const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function copyDirectory(src, dest) {
  try {
    await fs.copy(src, dest);
    log(`✓ Copied ${src} to ${dest}`, colors.green);
    return true;
  } catch (error) {
    log(`✗ Failed to copy ${src}: ${error.message}`, colors.yellow);
    return false;
  }
}

async function main() {
  log('\n╔════════════════════════════════════════╗', colors.blue);
  log('║   Post-Build: Copying Assets         ║', colors.blue);
  log('╚════════════════════════════════════════╝\n', colors.blue);

  const distDir = path.join(__dirname, 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    log('✗ dist/ directory not found. Run build first.', colors.yellow);
    process.exit(1);
  }

  // Copy view directory
  await copyDirectory(
    path.join(__dirname, 'view'),
    path.join(distDir, 'view')
  );

  // Copy cert directory if it exists (for SSL users)
  const certDir = path.join(__dirname, 'cert');
  if (fs.existsSync(certDir)) {
    await copyDirectory(certDir, path.join(distDir, 'cert'));
  } else {
    log('ℹ No cert/ directory found (not needed for HTTP-only)', colors.blue);
  }

  // Create README in dist
  const readmeContent = `# Shogun SuperPeer Executables

## How to Use

### Windows
Double-click \`shogun-superPeer-win.exe\` or run from command line:
\`\`\`
shogun-superPeer-win.exe
\`\`\`

### Linux
Make executable and run:
\`\`\`bash
chmod +x shogun-superPeer-linux
./shogun-superPeer-linux
\`\`\`

### macOS
Make executable and run:
\`\`\`bash
chmod +x shogun-superPeer-macos
./shogun-superPeer-macos
\`\`\`

## Access

Once started:
- Web interface: http://localhost:8080
- Gun endpoint: http://localhost:8080/gun

## Data Storage

Data will be stored in a \`data/\` folder next to the executable.

## Stop Server

Press \`Ctrl+C\` in the terminal window.

## Documentation

See the full documentation at: https://github.com/scobru/shogun-superPeer
`;

  fs.writeFileSync(path.join(distDir, 'README.txt'), readmeContent);
  log('✓ Created README.txt', colors.green);

  log('\n╔════════════════════════════════════════╗', colors.green);
  log('║   Post-Build Complete! ✓              ║', colors.green);
  log('╚════════════════════════════════════════╝', colors.green);
  log('\nYou can now distribute the contents of the dist/ folder', colors.blue);
}

main().catch(error => {
  console.error('Post-build failed:', error);
  process.exit(1);
});

