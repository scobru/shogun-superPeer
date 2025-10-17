# Testing the Executables

## Quick Test

### Windows

1. Open PowerShell or Command Prompt
2. Navigate to the dist folder:
   ```cmd
   cd path\to\shogun-superPeer\dist
   ```
3. Run the executable:
   ```cmd
   shogun-superPeer-win.exe
   ```
4. You should see server logs starting
5. Open browser to: http://localhost:8080
6. You should see the Gun Super Peer web page

### Linux

1. Open Terminal
2. Navigate to the dist folder:
   ```bash
   cd path/to/shogun-superPeer/dist
   ```
3. Make it executable (if not already):
   ```bash
   chmod +x shogun-superPeer-linux
   ```
4. Run it:
   ```bash
   ./shogun-superPeer-linux
   ```
5. You should see server logs starting
6. Open browser to: http://localhost:8080

### macOS

1. Open Terminal
2. Navigate to the dist folder:
   ```bash
   cd path/to/shogun-superPeer/dist
   ```
3. Make it executable (if not already):
   ```bash
   chmod +x shogun-superPeer-macos
   ```
4. Run it:
   ```bash
   ./shogun-superPeer-macos
   ```
5. If you get a security warning:
   - Go to System Preferences → Security & Privacy
   - Click "Open Anyway"
   - Or run: `xattr -d com.apple.quarantine shogun-superPeer-macos`
6. You should see server logs starting
7. Open browser to: http://localhost:8080

## Expected Output

When you run the executable, you should see something like:

```
server listening on port: 8080
Peers: 
In Memory: {}
Peers: 
In Memory: {}
...
```

## Testing from Another Machine

If you want to test the relay from another computer:

1. Find your IP address:
   - Windows: `ipconfig`
   - Linux/macOS: `ifconfig` or `ip addr`

2. Make sure port 8080 is open in your firewall

3. From another computer, access:
   - Browser: `http://YOUR_IP:8080`
   - Gun peer: `http://YOUR_IP:8080/gun`

## Testing with a Gun App

Create a simple test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gun Test</title>
    <script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
</head>
<body>
    <h1>Gun Relay Test</h1>
    <input type="text" id="input" placeholder="Type something...">
    <div id="output"></div>

    <script>
        // Connect to your relay
        const gun = Gun({
            peers: ['http://localhost:8080/gun']
        });

        // Simple test
        const data = gun.get('test');
        
        document.getElementById('input').addEventListener('input', (e) => {
            data.get('message').put(e.target.value);
        });

        data.get('message').on((value) => {
            document.getElementById('output').textContent = 'Synced: ' + value;
        });

        console.log('Connected to Gun relay!');
    </script>
</body>
</html>
```

Open this file in multiple browser tabs/windows. Type in one, it should appear in all others instantly.

## Common Issues

### Port Already in Use

If you see "port already in use" or "EADDRINUSE":
- Another application is using port 8080
- Close the other application or change the port (requires rebuilding with modified index.js)

### Windows Firewall Blocks Connection

If Windows Firewall asks for permission:
- Click "Allow access"
- Or manually add an exception for port 8080

### macOS "Unidentified Developer"

If macOS blocks the executable:
- Right-click the file → Open
- Or use: `xattr -d com.apple.quarantine shogun-superPeer-macos`
- Or go to System Preferences → Security & Privacy → Click "Open Anyway"

### Antivirus Flags the Executable

Some antivirus software flags pkg executables as suspicious:
- This is a false positive
- Add an exception in your antivirus
- Or build and sign the executable yourself

### No Output / Silent Failure

If the executable starts but produces no output:
- Try running in a new terminal window
- Check if the process is actually running (Task Manager / Activity Monitor / `ps`)
- Look for radata/ or data/ folders being created

## Performance Testing

### Test Data Sync

```javascript
// In browser console
const gun = Gun({peers: ['http://localhost:8080/gun']});
const user = gun.get('test-user');

// Put some data
for(let i = 0; i < 100; i++) {
    user.get('item-' + i).put({value: i, timestamp: Date.now()});
}

// Read it back
user.map().on((data, key) => {
    console.log(key, data);
});
```

### Monitor Network Traffic

In the browser DevTools Network tab, filter for "gun" to see the WebSocket/HTTP traffic.

### Check Memory Usage

Monitor the executable's memory usage:
- Windows: Task Manager
- Linux: `top` or `htop`
- macOS: Activity Monitor

## Cleanup

To stop the server:
- Press `Ctrl+C` in the terminal
- Or kill the process manually

To remove all data:
- Delete the `data/` folder
- Delete the `radata/` folder

## Success Criteria

✅ Executable starts without errors
✅ "server listening on port: 8080" message appears
✅ Browser can access http://localhost:8080
✅ Gun web page loads
✅ No error messages in console
✅ Data folders (radata/, data/) are created
✅ Peer logs appear every 5 seconds

## Troubleshooting

### Enable Verbose Logging

Modify `index.js` before building to add more detailed logs.

### Test with Different Ports

Set environment variable:
```bash
PORT=3000 ./shogun-superPeer-linux
```

### Check File Permissions

Make sure the executable can:
- Read/write to current directory (for data storage)
- Listen on network ports
- Access view/ folder

## Next Steps

Once the executable works:

1. **Distribute**: Share the executable with users
2. **Document**: Write user-specific docs
3. **Deploy**: Run on a server for public access
4. **Monitor**: Set up logging and monitoring
5. **Update**: Create new releases when needed

## Support

If you encounter issues:
1. Check the console output for errors
2. Look at the Issues page on GitHub
3. Ensure all prerequisites are met
4. Try rebuilding the executable
5. Test with the development version (`npm start`)

