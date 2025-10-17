y/**
 * Shogun SuperPeer Configuration
 * 
 * Copy this file to config.js and modify as needed.
 * The index.js file can be modified to load this config.
 */

module.exports = {
  // Server Configuration
  server: {
    // Run SSL/HTTPS server? If set to true, you must supply cert.pem and privkey.pem
    useSSL: false,
    
    // Run HTTP server?
    useHTTP: true,
    
    // Connect HTTP & HTTPS servers as peers of each-other?
    peerify: true,
    
    // Use storage to disk?
    persistence: true,
    
    // HTTP port (8080 can be used with Cloudflare)
    port: process.env.PORT || 8080,
    
    // HTTPS port (8443 can be used with Cloudflare)
    sslPort: process.env.SSL_PORT || 8443,
    
    // The domain of your SSL certificate (required if useSSL = true)
    sslHost: process.env.SSL_HOST || "example.com",
  },

  // SSL Certificate Paths
  ssl: {
    // Path to your private key (relative to project root)
    keyPath: 'cert/privkey.pem',
    
    // Path to your certificate (relative to project root)
    certPath: 'cert/cert.pem',
  },

  // Gun Configuration
  gun: {
    // Storage file/folder name
    file: 'data',
    
    // Use radisk for persistence (recommended)
    radisk: true,
    
    // Enable/disable Axe (conflict resolution)
    axe: false,
    
    // localStorage (for browser environments only)
    localStorage: false,
  },

  // Peer Configuration
  peers: {
    // Add additional peer URLs here
    // Example: ['https://gun-relay.herokuapp.com/gun']
    additional: [],
    
    // Connect to public Gun relays?
    usePublicRelays: false,
    
    // Public relay URLs (if usePublicRelays = true)
    publicRelays: [
      'https://gun-relay.herokuapp.com/gun',
      'https://gun-us.herokuapp.com/gun',
    ],
  },

  // Logging Configuration
  logging: {
    // Log peer connections every N milliseconds
    logPeersInterval: 5000,
    
    // Log gun graph data every N milliseconds  
    logDataInterval: 20000,
    
    // Enable detailed message logging
    logMessages: true,
    
    // Log incoming messages
    logIncomingMessages: true,
    
    // Log outgoing messages
    logOutgoingMessages: true,
  },

  // Web Interface
  web: {
    // Enable web interface
    enabled: true,
    
    // Path to web interface files
    viewPath: 'view',
    
    // Default page
    indexPage: 'main.html',
  },

  // Security
  security: {
    // Enable CORS
    cors: true,
    
    // CORS allowed origins (* = all)
    allowedOrigins: '*',
    
    // Max request size
    maxRequestSize: '10mb',
  },

  // Performance
  performance: {
    // Max number of peers to connect to
    maxPeers: 100,
    
    // Timeout for peer connections (ms)
    peerTimeout: 30000,
  },

  // Advanced
  advanced: {
    // Enable experimental features
    experimental: false,
    
    // Custom Gun options
    customGunOptions: {},
  },
};

