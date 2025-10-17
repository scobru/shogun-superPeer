# Shogun SuperPeer

A persistent, SEA-enabled, [GunDB](https://github.com/amark/gun) relay server for deployment anywhere. This Super Peer
runs a Gun node on both HTTP and HTTPS. Technically, it is running two nodes that are syncing with each-other locally.
These behaviors can be enabled, disabled, and mix-matched.

**✨ Now available as standalone executables!** No Node.js installation required.

Forked from [superPeer](https://github.com/TensorTom/superpeer)

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - For end users (non-technical)
- **[Build Guide](BUILD.md)** - How to build executables
- **[Release Guide](RELEASES.md)** - For maintainers creating releases
- **[Main README](#)** - You are here

## ✨ Features

- 🚀 **Standalone Executables** - No dependencies required
- 💾 **Data Persistence** - Stores data to disk
- 🔐 **SEA Support** - Security, Encryption, Authorization
- 🌐 **HTTP & HTTPS** - Dual server support
- 🔄 **Auto-sync** - Peers sync with each other
- 🐳 **Docker Ready** - Includes Dockerfile
- ⚡ **WebRTC Support** - Peer-to-peer connections

### Quickstart

#### Option 1: Use Prebuilt Executable (Easiest)

Download the appropriate executable for your platform from the [releases page](https://github.com/scobru/shogun-superPeer/releases):

- **Windows**: `shogun-superPeer.exe`
- **Linux**: `shogun-superPeer-linux`
- **macOS**: `shogun-superPeer-macos`

Then simply run it:

**Windows:**
```
shogun-superPeer.exe
```

**Linux/macOS:**
```
chmod +x shogun-superPeer-linux  # or shogun-superPeer-macos
./shogun-superPeer-linux          # or ./shogun-superPeer-macos
```

The relay will start on port 8080 by default.

#### Option 2: Build from Source

First:

```
git clone https://github.com/scobru/shogun-superPeer.git
cd shogun-superPeer
```

If you're using SSL:

```
sed -i 's/example.com/yourdomain.com/g' index.js
```

If you're using LetsEncrypt:

```
mkdir -p cert
cp /etc/letsencrypt/live/yourdomain.com/cert.pem cert/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem cert/
```

Then:

```
npm install
npm start
```

To run in background between terminal sessions (On Linux):

```
npm install supervisor -g
nohup npm run start-continuous > superPeer.out 2>&1 &
```

### Building Standalone Executables

To create standalone executables that don't require Node.js installed:

```bash
# Install dependencies
npm install

# Build for all platforms (Windows, Linux, macOS)
npm run build:all

# Or build for specific platform
npm run build:win      # Windows only
npm run build:linux    # Linux only
npm run build:mac      # macOS only
```

Executables will be created in the `dist/` folder.

**Note:** The executables are self-contained and include:
- Node.js runtime
- All dependencies
- Gun database
- Web interface

Users can simply run the executable without installing anything else!

### Options

**useSSL**_=true_ // Enable the HTTPS server. If enabled, you must supply `cert.pem` and `privkey.pem`.

**useHTTP**_=true_ // Enable the HTTP server.

**peerify**_=true_ // Connect HTTP & HTTPS servers as peers of each-other, syncing data between them.

**persistence**_=true_ // Store data synced from peers to disk.

**port**_=8080_ // Port to serve HTTP requests over. The default is compatible with Cloudflare.

**sslPort**_=8443_ // Port to server HTTPS over. The default is compatible with Cloudflare.

**sslHost**_=example.com_ // This must be set to the domain matching your SSL certificate .pem files if `useSSL` ==
`true`.

### Misc

Source for Docker Hub Container included.

**License:** MIT