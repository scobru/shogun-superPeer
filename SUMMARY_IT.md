# 🎌 Shogun SuperPeer - Guida Completa in Italiano

## 📋 Sommario

Questo progetto è stato configurato per creare **eseguibili standalone** per Windows, Linux e macOS. Gli utenti finali possono semplicemente scaricare ed eseguire un file senza installare Node.js o altre dipendenze.

## 🎯 Cosa è stato implementato

### 1. Sistema di Build con PKG

- ✅ Configurazione `package.json` con script di build
- ✅ Support per Windows (x64), Linux (x64), macOS (x64)
- ✅ Script automatizzato `build.js` con output colorato
- ✅ Inclusione automatica di tutte le dipendenze necessarie

### 2. Script di Avvio Semplificati

- ✅ `start.bat` - Per Windows
- ✅ `start.sh` - Per Linux/macOS
- ✅ Output informativo e user-friendly

### 3. Documentazione Completa

- ✅ **QUICK_START.md** - Guida rapida per utenti finali (non tecnici)
- ✅ **BUILD.md** - Guida dettagliata per creare gli eseguibili
- ✅ **RELEASES.md** - Guida per creare e distribuire release
- ✅ **README.md** - Documentazione principale aggiornata
- ✅ **config.example.js** - Esempio di configurazione avanzata

### 4. CI/CD con GitHub Actions

- ✅ `.github/workflows/release.yml` - Build automatico su tag
- ✅ `.github/workflows/build.yml` - Test automatici su push
- ✅ Upload automatico degli eseguibili su GitHub Releases

### 5. Files di Supporto

- ✅ `.gitignore` aggiornato per escludere build artifacts
- ✅ `.dockerignore` ottimizzato
- ✅ Struttura cartelle per certificati SSL

## 🚀 Come Usare

### Per Sviluppatori - Creare gli Eseguibili

```bash
# 1. Installa le dipendenze
npm install

# 2. Build per tutte le piattaforme
npm run build:all

# Oppure usa lo script helper
node build.js all

# Oppure build per piattaforma specifica
npm run build:win      # Solo Windows
npm run build:linux    # Solo Linux
npm run build:mac      # Solo macOS
```

Gli eseguibili verranno creati nella cartella `dist/`:
- `shogun-superPeer.exe` (Windows)
- `shogun-superPeer-linux` (Linux)
- `shogun-superPeer-macos` (macOS)

### Per Utenti Finali - Usare gli Eseguibili

**Windows:**
1. Scarica `shogun-superPeer.exe`
2. Doppio click per eseguire
3. Il server parte su `http://localhost:8080`

**Linux:**
```bash
chmod +x shogun-superPeer-linux
./shogun-superPeer-linux
```

**macOS:**
```bash
chmod +x shogun-superPeer-macos
./shogun-superPeer-macos
```

## 📦 Dimensioni degli Eseguibili

Ogni eseguibile include:
- Runtime Node.js completo
- Tutte le dipendenze npm
- Codice dell'applicazione
- File statici (HTML, etc.)

Dimensione approssimativa: **50-80 MB** per piattaforma

## 🔄 Workflow di Release Automatizzato

### Creare una Release

```bash
# 1. Aggiorna la versione in package.json
# 2. Commit le modifiche
git add .
git commit -m "Release v0.7.0"

# 3. Crea il tag
git tag v0.7.0

# 4. Push con il tag
git push origin main --tags
```

GitHub Actions automaticamente:
1. ✅ Scarica il codice
2. ✅ Installa le dipendenze
3. ✅ Build per tutte le piattaforme
4. ✅ Calcola checksums SHA256
5. ✅ Crea la release su GitHub
6. ✅ Carica gli eseguibili
7. ✅ Testa gli eseguibili

## 🛠️ Script NPM Disponibili

```json
{
  "start": "npm run server",              // Avvia in modalità sviluppo
  "server": "node index.js",              // Esegue il server
  "start-continuous": "...",              // Avvia con auto-restart
  "build": "pkg . --out-path dist",       // Build default
  "build:win": "...",                     // Build Windows
  "build:linux": "...",                   // Build Linux
  "build:mac": "...",                     // Build macOS
  "build:all": "..."                      // Build tutte le piattaforme
}
```

## 📁 Struttura del Progetto

```
shogun-superPeer/
├── .github/
│   └── workflows/
│       ├── build.yml           # CI per test
│       └── release.yml         # CD per release
├── cert/                       # Certificati SSL (opzionale)
│   ├── cert.pem
│   └── privkey.pem
├── dist/                       # Eseguibili compilati
│   ├── shogun-superPeer.exe
│   ├── shogun-superPeer-linux
│   └── shogun-superPeer-macos
├── view/                       # Interfaccia web
│   └── main.html
├── index.js                    # Server principale
├── build.js                    # Script di build helper
├── start.bat                   # Avvio Windows
├── start.sh                    # Avvio Linux/macOS
├── config.example.js           # Configurazione esempio
├── package.json                # Configurazione NPM
├── README.md                   # Documentazione principale
├── QUICK_START.md              # Guida rapida utenti
├── BUILD.md                    # Guida build
└── RELEASES.md                 # Guida release
```

## ⚙️ Configurazione

### Opzioni Principali (in `index.js`)

```javascript
const useSSL = false;           // Abilita HTTPS?
const useHTTP = true;           // Abilita HTTP?
const peerify = true;           // Connetti HTTP e HTTPS come peer?
const persistence = true;       // Salva dati su disco?
const port = 8080;             // Porta HTTP
const sslPort = 8443;          // Porta HTTPS
const sslHost = "example.com"; // Dominio per SSL
```

### Configurazione Avanzata

Copia `config.example.js` a `config.js` e modifica come necessario.

## 🌐 Distribuzione

### Opzione 1: GitHub Releases (Consigliato)

Gli utenti scaricano gli eseguibili dalle release di GitHub.

### Opzione 2: Sito Web

Host gli eseguibili sul tuo sito con download diretti.

### Opzione 3: Package Manager

Pubblica su package manager specifici:
- Windows: Chocolatey
- macOS: Homebrew
- Linux: apt/snap/flatpak

## 🔒 Sicurezza

### Considerazioni Importanti

⚠️ **Default**: Configurazione per reti locali/private
⚠️ **NON** esporre direttamente a internet senza sicurezza aggiuntiva
⚠️ Usa HTTPS per traffico pubblico
⚠️ Considera un reverse proxy (nginx, Caddy)

### SSL/HTTPS

Per abilitare HTTPS:

1. Ottieni certificati SSL (Let's Encrypt consigliato)
2. Copia i certificati in `cert/`
3. Modifica `index.js`: `const useSSL = true;`
4. Imposta `sslHost` al tuo dominio
5. Rebuilda l'eseguibile

## 📊 Performance

### Requisiti Minimi

- **CPU**: 2 core
- **RAM**: 2GB
- **Disco**: SSD consigliato
- **Rete**: Connessione stabile

### Ottimizzazione

- Usa SSD per storage
- Aumenta RAM per più peers
- Configura firewall correttamente
- Usa reverse proxy per produzione

## 🐛 Troubleshooting

### Porta già in uso

```bash
# Cambia porta
PORT=3000 ./shogun-superPeer-linux
```

### Errore permessi (Linux/macOS)

```bash
chmod +x shogun-superPeer-*
```

### macOS: "da sviluppatore non identificato"

```bash
xattr -d com.apple.quarantine shogun-superPeer-macos
```

### Windows: Antivirus blocca l'eseguibile

Aggiungi un'eccezione nell'antivirus o firma il codice.

## 🔧 Personalizzazione

### Modificare Porte

Modifica `index.js` prima del build:
```javascript
const port = 3000;  // Invece di 8080
```

### Aggiungere Peers

Modifica `index.js`:
```javascript
Gun({
  peers: [
    'http://peer1.example.com/gun',
    'http://peer2.example.com/gun'
  ],
  // ...
});
```

### Modificare UI

Edita i file in `view/` e rebuilda.

## 📈 Prossimi Passi

### Miglioramenti Possibili

1. **GUI Desktop** - Usa Electron o Tauri per interfaccia grafica
2. **System Tray** - Icona nel system tray
3. **Auto-update** - Sistema di aggiornamento automatico
4. **Installer** - Installer per Windows/macOS
5. **Web Dashboard** - Dashboard web avanzata
6. **Configurazione UI** - Configurazione tramite interfaccia
7. **Logs UI** - Visualizzazione logs in tempo reale
8. **Multi-platform** - ARM, ARM64, Alpine Linux
9. **Docker** - Immagine Docker ottimizzata
10. **Monitoring** - Metriche e monitoraggio

## 🤝 Contribuire

1. Fork il repository
2. Crea un branch per la feature
3. Commit le modifiche
4. Push e crea una Pull Request

## 📄 Licenza

MIT License - Libero di usare, modificare e distribuire

## 🆘 Supporto

- **Issues**: [GitHub Issues](https://github.com/scobru/shogun-superPeer/issues)
- **Docs**: Leggi la documentazione in questo repository
- **Gun**: [gun.eco/docs](https://gun.eco/docs/)

## ✅ Checklist Pre-Release

- [ ] Testato su Windows
- [ ] Testato su Linux
- [ ] Testato su macOS
- [ ] Documentazione aggiornata
- [ ] Version bump in package.json
- [ ] Changelog aggiornato
- [ ] Build completato senza errori
- [ ] Eseguibili testati
- [ ] Tag Git creato
- [ ] Release notes pronte

---

**Fatto! 🎉** Il tuo relay Gun è pronto per essere distribuito come eseguibile standalone!

