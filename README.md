# Shogun SuperPeer

A persistent, SEA-enabled, [GunDB](https://github.com/amark/gun) relay server for deployment anywhere. This Super Peer
runs a Gun node on both HTTP and HTTPS. Technically, it is running two nodes that are syncing with each-other locally.
These behaviors can be enabled, disabled, and mix-matched.

**🚀 Simple Node.js Gun Relay Server** - Easy to run and deploy.

Forked from [superPeer](https://github.com/TensorTom/superpeer)

## ✨ Features

- 💾 **Data Persistence** - Stores data to disk
- 🔐 **SEA Support** - Security, Encryption, Authorization
- 🌐 **HTTP & HTTPS** - Dual server support
- 🔄 **Auto-sync** - Peers sync with each other
- 🐳 **Docker Ready** - Includes Dockerfile
- ⚡ **WebRTC Support** - Peer-to-peer connections
- 🚀 **Simple Setup** - Just Node.js required

### Quickstart

**Prerequisites:**
- Node.js (v16 or higher)
- npm or yarn

**Installation:**

```bash
# Clone the repository
git clone https://github.com/scobru/shogun-superPeer.git
cd shogun-superPeer

# Install dependencies
npm install

# Start the server
npm start
```

**For SSL/HTTPS (optional):**

```bash
# Update domain in config
sed -i 's/example.com/yourdomain.com/g' index.js

# Add SSL certificates
mkdir -p cert
cp /etc/letsencrypt/live/yourdomain.com/cert.pem cert/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem cert/
```

**Run in background (Linux):**

```bash
# Install supervisor globally
npm install supervisor -g

# Run continuously
nohup npm run start-continuous > superPeer.out 2>&1 &
```

The relay will start on port 8080 by default.

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