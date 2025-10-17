# 🚀 Quick Start Guide

## For End Users (No Technical Knowledge Required)

### Windows

1. **Download** the file `shogun-superPeer.exe` from the [releases page](https://github.com/scobru/shogun-superPeer/releases)

2. **Run** by double-clicking the file

3. **Done!** Your Gun relay server is now running on `http://localhost:8080`

   You should see a black window (command prompt) with server logs. Don't close it!

4. **Test** by opening your browser and going to: `http://localhost:8080`

#### To stop the server:
- Close the black window, or
- Press `Ctrl+C` in the window

#### To run in background:
- Use `start.bat` if you've downloaded the source

### Linux

1. **Download** the file `shogun-superPeer-linux` from the [releases page](https://github.com/scobru/shogun-superPeer/releases)

2. **Open Terminal** in the folder where you downloaded the file

3. **Make it executable:**
   ```bash
   chmod +x shogun-superPeer-linux
   ```

4. **Run:**
   ```bash
   ./shogun-superPeer-linux
   ```

5. **Done!** Your Gun relay server is now running on `http://localhost:8080`

6. **Test** by opening your browser and going to: `http://localhost:8080`

#### To stop the server:
- Press `Ctrl+C` in the terminal

#### To run in background:
```bash
nohup ./shogun-superPeer-linux > server.log 2>&1 &
```

To stop background server:
```bash
pkill shogun-superPeer
```

### macOS

1. **Download** the file `shogun-superPeer-macos` from the [releases page](https://github.com/scobru/shogun-superPeer/releases)

2. **Open Terminal** in the folder where you downloaded the file

3. **Make it executable:**
   ```bash
   chmod +x shogun-superPeer-macos
   ```

4. **Run:**
   ```bash
   ./shogun-superPeer-macos
   ```

5. If you see a security warning:
   - Open **System Preferences** → **Security & Privacy**
   - Click **"Open Anyway"**
   - Run the command again

6. **Done!** Your Gun relay server is now running on `http://localhost:8080`

7. **Test** by opening your browser and going to: `http://localhost:8080`

#### To stop the server:
- Press `Ctrl+C` in the terminal

#### To run in background:
```bash
nohup ./shogun-superPeer-macos > server.log 2>&1 &
```

## What is this?

**Shogun SuperPeer** is a Gun database relay server. It helps decentralized applications (dApps) sync data between users without needing a central server.

### What does it do?
- Acts as a sync point for Gun database
- Stores and forwards data between peers
- Provides persistence (saves data to disk)
- Enables real-time data synchronization

### Who needs this?
- Developers building decentralized apps
- Users who want to run their own Gun node
- Communities wanting to support peer-to-peer networks

## Ports

By default, the server uses:
- **HTTP:** Port 8080
- **HTTPS:** Port 8443 (if SSL is enabled)

Make sure these ports are not used by other applications.

### Changing the port

Edit the `PORT` environment variable:

**Windows:**
```cmd
set PORT=3000
shogun-superPeer.exe
```

**Linux/macOS:**
```bash
PORT=3000 ./shogun-superPeer-linux
```

## Firewall

If you want other computers to connect to your relay:

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Select "Port" → Next
5. Select "TCP" and enter port "8080"
6. Allow the connection
7. Name it "Shogun SuperPeer"

**Linux (UFW):**
```bash
sudo ufw allow 8080/tcp
```

**macOS:**
```bash
# Usually no action needed for incoming connections on localhost
# For external access, go to System Preferences → Security → Firewall
```

## Connecting from Apps

Once your relay is running, configure your Gun apps to use it:

```javascript
const gun = Gun({
  peers: ['http://localhost:8080/gun']
});
```

Or if running on a server with public IP:
```javascript
const gun = Gun({
  peers: ['http://your-server-ip:8080/gun']
});
```

## Data Storage

The server stores data in the folder where it runs:
- **data/** - Gun database files
- **radata/** - Additional persistence data

### Backup your data

Simply copy the `data/` and `radata/` folders.

### Clear all data

Stop the server and delete the `data/` and `radata/` folders.

## Troubleshooting

### "Port already in use"
Another application is using port 8080. Either:
- Close the other application
- Change the port (see "Changing the port" above)

### "Permission denied"
On Linux/macOS, make sure the file is executable:
```bash
chmod +x shogun-superPeer-*
```

### "Cannot open because it's from an unidentified developer" (macOS)
1. Right-click the file
2. Select "Open"
3. Click "Open" in the security dialog

Or use command line:
```bash
xattr -d com.apple.quarantine shogun-superPeer-macos
```

### Server doesn't respond
1. Check if it's actually running (look for the process)
2. Try accessing `http://127.0.0.1:8080` instead of localhost
3. Check if firewall is blocking it
4. Check the logs for error messages

### High CPU usage
This is normal when:
- Syncing large amounts of data
- Many peers are connected
- Running on slow hardware

To reduce CPU usage, disable some features in the config.

## Advanced Configuration

For advanced users, you can modify the source code before building:

1. Download the source code
2. Edit `index.js`
3. Change configuration variables at the top
4. Build your custom executable (see BUILD.md)

## Support

- **Issues:** [GitHub Issues](https://github.com/scobru/shogun-superPeer/issues)
- **Documentation:** [README.md](README.md)
- **Gun Docs:** [gun.eco/docs](https://gun.eco/docs/)

## Security Notes

⚠️ **Important:**
- The default configuration is for **local/private networks only**
- Do NOT expose directly to the internet without additional security
- Consider using HTTPS (requires SSL certificate)
- Use a reverse proxy (nginx, Caddy) for production deployments
- Keep the software updated

## Performance Tips

- **SSD recommended** for data storage
- **At least 2GB RAM** for moderate usage
- **Stable network connection** for best sync performance
- **Open necessary firewall ports** if hosting publicly

## Uninstall

Simply delete the executable file and the data folders. There's no system-wide installation.

## License

MIT License - Free to use, modify, and distribute

---

**Need help?** Open an issue on GitHub or check the documentation!

