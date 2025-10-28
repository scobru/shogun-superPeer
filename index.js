const path = require("path");
const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
const Gun = require("gun");
require("gun/sea");
require("gun/lib/webrtc");
require("gun/lib/radix");
require("gun/lib/store");
require("gun/lib/then");
require("gun/lib/radisk");

const { forceListUpdate } = require("shogun-relays");

// Detect if running as pkg executable
const isPkg = typeof process.pkg !== "undefined";
const baseDir = isPkg ? path.dirname(process.execPath) : __dirname;

console.log(`
╔════════════════════════════════════════╗
║   Shogun SuperPeer - Gun Relay        ║
╚════════════════════════════════════════╝
`);
console.log(`Starting Shogun SuperPeer...`);
console.log(`Running as executable: ${isPkg}`);
console.log(`Base directory: ${baseDir}`);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  console.error("Stack:", error.stack);
  console.log("\nPress Ctrl+C to exit...");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Load configuration from config.json or use defaults
let config = {
  server: {
    useSSL: false,
    useHTTP: true,
    peerify: true,
    persistence: true,
    port: process.env.PORT || 8080,
    sslPort: process.env.SSL_PORT || 8443,
    sslHost: "example.com",
  },
  logging: {
    logPeersInterval: 5000,
    logDataInterval: 20000,
    verbose: true,
  },
};

// Try to load config.json
const configPath = path.join(baseDir, "config.json");
if (fs.existsSync(configPath)) {
  try {
    const userConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    config = Object.assign({}, config, userConfig);
    console.log(`✓ Loaded configuration from: ${configPath}`);
  } catch (error) {
    console.warn(`⚠ Could not load config.json: ${error.message}`);
    console.log(`Using default configuration`);
  }
} else {
  console.log(`ℹ No config.json found, using default configuration`);
}

// Override with environment variables if present
const useSSL = process.env.USE_SSL === "true" || config.server.useSSL;
const useHTTP = process.env.USE_HTTP !== "false" && config.server.useHTTP;
const peerify = config.server.peerify;
const persistence = config.server.persistence;
const port = process.env.PORT || config.server.port;
const sslPort = process.env.SSL_PORT || config.server.sslPort;
const sslHost = process.env.SSL_HOST || config.server.sslHost;

console.log(`\nConfiguration:`);
console.log(`  HTTP: ${useHTTP} (Port: ${port})`);
console.log(`  HTTPS: ${useSSL} (Port: ${sslPort})`);
console.log(`  Persistence: ${persistence}`);
console.log(``);

const peers = [
    "https://gun-relay.herokuapp.com/gun",
    "https://peer.wallie.io/gun",
    "https://gun.defucc.me/gun",
    "https://a.talkflow.team/gun",
    "https://lindanode.scobrudot.dev/gun",
    "https://shogunnode.scobrudot.dev/gun",
];

const getRelays = async () => {
  return await forceListUpdate();
};



peers.push(`http://localhost:${port}/gun`);
peers.push(`https://localhost:${sslPort}/gun`);


peers.filter((p) => p); // Remove empty/null peers

let server, sslServer, gun, sslGun;

const app = express();
app.use(Gun.serve);

function logIn(msg) {
  if (config.logging.verbose) {
    console.log(`in msg:${JSON.stringify(msg)}.........`);
  }
}

function logOut(msg) {
  if (config.logging.verbose) {
    console.log(`out msg:${JSON.stringify(msg)}.........`);
  }
}

function ssLogIn(msg) {
  if (config.logging.verbose) {
    console.log(`ssl in msg:${JSON.stringify(msg)}.........`);
  }
}

function ssLogOut(msg) {
  if (config.logging.verbose) {
    console.log(`ssl out msg:${JSON.stringify(msg)}.........`);
  }
}

function logPeers() {
  !useSSL ||
    console.log(`SSL Peers: ${Object.keys(sslGun._.opt.peers).join(", ")}`);
  !useHTTP || console.log(`Peers: ${Object.keys(gun._.opt.peers).join(", ")}`);
}

function logData() {
  !useSSL || console.log(`SSL In Memory: ${JSON.stringify(sslGun._.graph)}`);
  !useHTTP || console.log(`In Memory: ${JSON.stringify(gun._.graph)}`);
}

// Load your cert and priv key files. LetsEncrypt cert files can be copied
// from  /etc/letsencrypt/live/<yourdomain>/
if (useSSL) {
  const certPath = path.join(baseDir, "cert");
  sslServer = https
    .createServer(
      {
        key: fs.readFileSync(path.join(certPath, "privkey.pem")),
        cert: fs.readFileSync(path.join(certPath, "cert.pem")),
      },
      app
    )
    .listen(sslPort, function () {
      console.log(`ssl server listening on port: ${sslPort}`);
    });

  const dataPath = path.join(baseDir, "data");
  console.log(`SSL Gun data path: ${dataPath}`);

  // Initialize SSL Gun with empty peers first, then update with relays
  sslGun = Gun({
    peers: [],
    web: sslServer,
    file: dataPath,
    radisk: persistence,
    axe: true,
    wire: true,
  });

  sslGun._.on("in", ssLogIn);
  sslGun._.on("out", ssLogOut);

  // Load relays asynchronously and update peers
  if (peerify) {
    getRelays().then(relays => {
      console.log(`✓ Loaded ${relays.length} SSL relay peers`);
      sslGun.opt({ peers: relays });
    }).catch(error => {
      console.warn(`⚠ Failed to load SSL relays: ${error.message}`);
      console.log(`Using default SSL peer list`);
      sslGun.opt({ peers: peers });
    });
  } else {
    sslGun.opt({ peers: peers });
  }
}

if (useHTTP) {
  server = http.createServer({}, app).listen(port, function () {
    console.log(`
╔════════════════════════════════════════╗
║  Server Started Successfully! ✓       ║
╚════════════════════════════════════════╝
`);
    console.log(`🌐 HTTP Server listening on port: ${port}`);
    console.log(`🔗 Gun endpoint: http://localhost:${port}/gun`);
    console.log(`📄 Web interface: http://localhost:${port}`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
  });

  const dataPath = path.join(baseDir, "data");
  console.log(`Gun data path: ${dataPath}`);

  // Initialize Gun with empty peers first, then update with relays
  gun = Gun({
    peers: [],
    web: server,
    file: dataPath,
    localStorage: false,
    radisk: persistence && !useSSL,
    axe: true,
    wire: true,
  });

  gun._.on("in", logIn);
  gun._.on("out", logOut);

  // Load relays asynchronously and update peers
  if (peerify) {
    getRelays().then(relays => {
      console.log(`✓ Loaded ${relays.length} relay peers`);
      gun.opt({ peers: relays });
    }).catch(error => {
      console.warn(`⚠ Failed to load relays: ${error.message}`);
      console.log(`Using default peer list`);
      gun.opt({ peers: peers });
    });
  } else {
    gun.opt({ peers: peers });
  }
}

setInterval(logPeers, config.logging.logPeersInterval); //Log peer list
setInterval(logData, config.logging.logDataInterval); //Log gun graph

// Setup static file serving
const viewDir = path.join(baseDir, "view");
const viewFile = path.join(viewDir, "main.html");

console.log(`Looking for view directory at: ${viewDir}`);

// Check if view directory exists
if (fs.existsSync(viewDir)) {
  console.log(`✓ View directory found!`);
  app.use(express.static(viewDir));

  if (fs.existsSync(viewFile)) {
    app.get("*", function (_, res) {
      res.sendFile(viewFile);
    });
  } else {
    console.warn(`Warning: main.html not found at ${viewFile}`);
    app.get("*", function (_, res) {
      res.send(
        "<h1>Shogun SuperPeer</h1><p>Gun relay is running on this server.</p>"
      );
    });
  }
} else {
  console.warn(`Warning: View directory not found at ${viewDir}`);
  console.log(`Serving basic HTML response`);
  app.get("*", function (_, res) {
    res.send(
      "<h1>Shogun SuperPeer</h1><p>Gun relay is running on this server. Port: " +
        port +
        "</p><p>Connect your Gun app to: http://localhost:" +
        port +
        "/gun</p>"
    );
  });
}
