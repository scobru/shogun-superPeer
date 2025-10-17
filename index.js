import path from 'path';
import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import Gun from 'gun';
import SEA from 'gun/sea.js';
import rtc from 'gun/lib/webrtc.js';
import Relays, { forceListUpdate } from 'gun-relays';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect if running as pkg executable
const isPkg = typeof process.pkg !== 'undefined';
const baseDir = isPkg ? path.dirname(process.execPath) : __dirname;

const port = (process.env.PORT || 8080); // 8080 can be used with Cloudflare.
const useSSL = false; // Run SSL/HTTPS server? If set to true, you must supply cert.pem and privkey.pem (See below).
const useHTTP = true; // Run HTTP server?
const peerify = true; // Connect HTTP & HTTPS servers as peers of each-other?
const persistence = true; // Use storage to disk?
const sslPort = (process.env.PORT || 8443); // 8443 can be used with Cloudflare.
const sslHost = "example.com"; // The domain of your SSL certificate.

let server, sslServer, gun, sslGun;
let freshRelays = await forceListUpdate()

freshRelays.push(`http://localhost:${port}/gun`)
freshRelays.push(`https://${sslHost}:${sslPort}/gun`)


console.log(`
╔════════════════════════════════════════╗
║   Shogun SuperPeer - Gun Relay        ║
╚════════════════════════════════════════╝
`);
console.log(`Starting Shogun SuperPeer...`);
console.log(`Running as executable: ${isPkg}`);
console.log(`Base directory: ${baseDir}`);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  console.log('\nPress any key to exit...');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 1));
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});



const app = express();
app.use(Gun.serve);

function logIn(msg){
    console.log(`in msg:${JSON.stringify(msg)}.........`);
}

function logOut(msg){
    console.log(`out msg:${JSON.stringify(msg)}.........`);
}
function ssLogIn(msg){
    console.log(`ssl in msg:${JSON.stringify(msg)}.........`);
}

function ssLogOut(msg){
    console.log(`ssl out msg:${JSON.stringify(msg)}.........`);
}

function logPeers() {
    !useSSL || console.log(`SSL Peers: ${Object.keys(sslGun._.opt.peers).join(', ')}`);
    !useHTTP || console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

function logData() {
    !useSSL || console.log(`SSL In Memory: ${JSON.stringify(sslGun._.graph)}`);
    !useHTTP || console.log(`In Memory: ${JSON.stringify(gun._.graph)}`);
}

// Load your cert and priv key files. LetsEncrypt cert files can be copied
// from  /etc/letsencrypt/live/<yourdomain>/
if(useSSL){
    const certPath = path.join(baseDir, 'cert');
    sslServer = https.createServer({
        key: fs.readFileSync(path.join(certPath, 'privkey.pem')),
        cert: fs.readFileSync(path.join(certPath, 'cert.pem'))
    }, app)
        .listen(sslPort, function () {
            console.log(`ssl server listening on port: ${sslPort}`);
        })

    const dataPath = path.join(baseDir, 'data');
    console.log(`SSL Gun data path: ${dataPath}`);
    
    sslGun = Gun({
        peers: peerify ? freshRelays  : [],
        web: sslServer,
        file: dataPath,
        radisk: persistence,
        axe: false
    });

    sslGun._.on('in', ssLogIn);
    sslGun._.on('out', ssLogOut);
}
if(useHTTP){
    server = http.createServer({}, app)
        .listen(port, function () {
            console.log(`
╔════════════════════════════════════════╗
║  Server Started Successfully! ✓       ║
╚════════════════════════════════════════╝
`);
            console.log(`🌐 HTTP Server listening on port: ${port}`);
            console.log(`🔗 Gun endpoint: http://localhost:${port}/gun`);
            console.log(`📄 Web interface: http://localhost:${port}`);
            console.log(`\nPress Ctrl+C to stop the server\n`);
        })

    const dataPath = path.join(baseDir, 'data');
    console.log(`Gun data path: ${dataPath}`);
    
    gun = Gun({
        peers: peerify ? freshRelays : [],
        web: server,
        file: dataPath,
        localStorage: false,
        radisk: (persistence && !useSSL),
        axe: false
    });

    gun._.on('in', logIn);
    gun._.on('out', logOut);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs
setInterval(logData, 20000); //Log gun graph every 20 secs

// Setup static file serving
const viewDir = path.join(baseDir, 'view');
const viewFile = path.join(viewDir, 'main.html');

console.log(`Looking for view directory at: ${viewDir}`);

// Check if view directory exists
if (fs.existsSync(viewDir)) {
  console.log(`View directory found!`);
  app.use(express.static(viewDir));
  
  if (fs.existsSync(viewFile)) {
    app.get('*', function(_, res) {
      res.sendFile(viewFile);
    });
  } else {
    console.warn(`Warning: main.html not found at ${viewFile}`);
    app.get('*', function(_, res) {
      res.send('<h1>Shogun SuperPeer</h1><p>Gun relay is running on this server.</p>');
    });
  }
} else {
  console.warn(`Warning: View directory not found at ${viewDir}`);
  console.log(`Serving basic HTML response`);
  app.get('*', function(_, res) {
    res.send('<h1>Shogun SuperPeer</h1><p>Gun relay is running on this server. Port: ' + port + '</p><p>Connect your Gun app to: http://localhost:' + port + '/gun</p>');
  });
}
