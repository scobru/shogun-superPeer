#!/usr/bin/env node

/**
 * Build script for creating standalone executables
 * This script helps automate the build process with better error handling
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, description) {
  log(`\n${description}...`, colors.blue);
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✓ ${description} completed`, colors.green);
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, colors.red);
    return false;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  log('\n╔════════════════════════════════════════╗', colors.bright);
  log('║   Shogun SuperPeer Build Script      ║', colors.bright);
  log('╚════════════════════════════════════════╝\n', colors.bright);

  // Ensure dist directory exists
  ensureDir('./dist');

  const platform = process.argv[2] || 'all';
  
  log(`Building for: ${platform}`, colors.yellow);

  let success = false;

  switch (platform) {
    case 'win':
    case 'windows':
      success = execCommand('npm run build:win', 'Building Windows executable');
      break;
    case 'linux':
      success = execCommand('npm run build:linux', 'Building Linux executable');
      break;
    case 'mac':
    case 'macos':
      success = execCommand('npm run build:mac', 'Building macOS executable');
      break;
    case 'all':
    default:
      success = execCommand('npm run build:all', 'Building all executables');
      break;
  }

  if (success) {
    log('\n╔════════════════════════════════════════╗', colors.green);
    log('║   Build completed successfully! 🎉    ║', colors.green);
    log('╚════════════════════════════════════════╝', colors.green);
    log('\nExecutables are in the dist/ folder', colors.bright);
    
    // List built files
    try {
      const files = fs.readdirSync('./dist');
      if (files.length > 0) {
        log('\nBuilt files:', colors.bright);
        files.forEach(file => {
          const stats = fs.statSync(path.join('./dist', file));
          const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          log(`  - ${file} (${sizeMB} MB)`, colors.green);
        });
      }
    } catch (error) {
      // Ignore error
    }
  } else {
    log('\n╔════════════════════════════════════════╗', colors.red);
    log('║   Build failed! ❌                    ║', colors.red);
    log('╚════════════════════════════════════════╝', colors.red);
    process.exit(1);
  }
}

main();

