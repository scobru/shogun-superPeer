# 🚀 Quick Start - ES Modules

## ⚡ Inizia Subito

### 1️⃣ Installa le Dipendenze
```bash
npm install
```
Oppure con Yarn:
```bash
yarn install
```

### 2️⃣ Testa ES Modules
```bash
npm test
```
Dovrebbe mostrare:
```
🧪 Testing ES Modules...
✓ Test 1: Testing basic imports...
  ✅ Basic imports working!
✓ Test 2: Testing gun-relays import...
  ✅ gun-relays imported successfully!
...
╔════════════════════════════════════════╗
║   All ES Module Tests Passed! 🎉      ║
╚════════════════════════════════════════╝
```

### 3️⃣ Avvia il Server (Sviluppo)
```bash
npm start
```
Il server partirà su: `http://localhost:8080`

### 4️⃣ Crea Eseguibili (Opzionale)
```bash
npm run build:win    # Solo Windows
npm run build:all    # Tutti i sistemi
```

## 📝 Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm install` | Installa le dipendenze |
| `npm test` | Testa che ES modules funzionino |
| `npm start` | Avvia il server in sviluppo |
| `npm run build:win` | Crea eseguibile Windows |
| `npm run build:linux` | Crea eseguibile Linux |
| `npm run build:mac` | Crea eseguibile macOS |
| `npm run build:all` | Crea tutti gli eseguibili |
| `node build.js win` | Build con script helper |

## ✅ Checklist Prima del Build

- [ ] Hai eseguito `npm install`?
- [ ] `npm test` passa tutti i test?
- [ ] `npm start` avvia il server correttamente?
- [ ] Hai webpack installato? (incluso in `npm install`)

Se tutte rispondono ✅, sei pronto per `npm run build:all`!

## 🎯 Configurazione (Opzionale)

Crea `config.json` per personalizzare:
```json
{
  "server": {
    "port": 8080,
    "useHTTP": true,
    "useSSL": false,
    "peerify": true,
    "persistence": true
  },
  "logging": {
    "verbose": true,
    "logPeersInterval": 5000
  }
}
```

## 🆘 Problemi Comuni

### "Cannot find module 'webpack'"
```bash
npm install webpack webpack-cli --save-dev
```

### "ERR_MODULE_NOT_FOUND"
Verifica che `package.json` abbia `"type": "module"`

### Build fallisce
```bash
# Pulisci e riprova
rm -rf node_modules dist
npm install
npm run build:all
```

## 📚 Documentazione Completa

- `README_IT.md` - Guida completa in italiano
- `ES_MODULES_GUIDE.md` - Guida tecnica ES modules
- `CONVERSION_SUMMARY.md` - Riepilogo conversione

## 🎉 Tutto Pronto!

Ora puoi:
1. Sviluppare con ES modules moderni ✨
2. Usare `gun-relays` e altri pacchetti ES only 📦
3. Creare eseguibili standalone 🚀

Buon coding! 💻

