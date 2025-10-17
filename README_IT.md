# Shogun SuperPeer - Convertito in ES Modules! 🚀

## ✨ Cosa è cambiato

Il progetto è stato **completamente convertito** da CommonJS a ES Modules per una migliore compatibilità con pacchetti moderni come `gun-relays`.

### Modifiche principali:
- ✅ `index.js` ora usa completamente ES modules (`import`/`export`)
- ✅ Aggiunto `"type": "module"` al `package.json`
- ✅ Rimosso l'async IIFE - ora usa **top-level await**
- ✅ Webpack bundling per compatibilità con `pkg`
- ✅ Tutti gli script di build convertiti in ES modules

## 🚀 Come Usare

### Installazione
```bash
npm install
# oppure
yarn install
```

### Sviluppo (locale)
```bash
npm start
```
Il server partirà su `http://localhost:8080`

### Build degli Eseguibili

**Prima di tutto, installa le dipendenze webpack:**
```bash
npm install
```

**Poi puoi creare gli eseguibili:**

```bash
# Solo Windows
npm run build:win

# Solo Linux
npm run build:linux

# Solo macOS
npm run build:mac

# Tutti i sistemi operativi
npm run build:all
```

## 🔧 Come Funziona il Build

1. **Webpack** crea un bundle del codice in `dist/index.bundled.js`
   - Risolve tutti gli import ES modules
   - Converte in formato compatibile con `pkg`
   - Mantiene le dipendenze esterne (express, gun)

2. **PKG** crea gli eseguibili standalone
   - Usa il file bundled invece dell'originale
   - Crea eseguibili per Windows, Linux e macOS
   - Include il runtime Node.js

3. **Post-build** copia i file necessari
   - Cartella `view/` per l'interfaccia web
   - `config.json` per la configurazione
   - Certificati SSL (se presenti)

## 📁 Struttura dopo il Build

```
dist/
├── index.bundled.js          # Bundle webpack (intermedio)
├── shogun-superPeer.exe      # Eseguibile Windows
├── shogun-superPeer-linux    # Eseguibile Linux
├── shogun-superPeer-macos    # Eseguibile macOS
├── config.json               # Configurazione
├── CONFIG_HELP.txt           # Guida configurazione
├── README.txt                # Istruzioni per utenti finali
└── view/                     # Interfaccia web
    └── main.html
```

## 🎯 Vantaggi della Conversione ES Modules

### Prima (CommonJS)
```javascript
const express = require('express');
const Gun = require('gun');
const GunRelays = require('gun-relays'); // ❌ Non funzionava!
```

### Dopo (ES Modules)
```javascript
import express from 'express';
import Gun from 'gun';
import { forceListUpdate } from 'gun-relays'; // ✅ Funziona!
```

### Benefici:
- ✅ Compatibilità con pacchetti moderni ES modules
- ✅ Top-level await (niente più async IIFE)
- ✅ Import statici e dinamici
- ✅ Tree-shaking migliore con webpack
- ✅ Standard JavaScript moderno

## 🐛 Risoluzione Problemi

### Errore: "ERR_REQUIRE_ESM"
**Causa**: Stai usando `require()` invece di `import`
**Soluzione**: Il progetto ora usa ES modules, assicurati di usare `import`

### Errore durante il build
**Causa**: Dipendenze webpack non installate
**Soluzione**: 
```bash
npm install webpack webpack-cli --save-dev
```

### Eseguibile non parte
**Causa**: File mancanti nella cartella dist
**Soluzione**: Esegui il post-build
```bash
npm run postbuild
```

## 📖 File di Configurazione

### webpack.config.js
Configurazione webpack per bundling ES modules -> formato compatibile pkg

### package.json
- `"type": "module"` - Abilita ES modules
- Script `prebuild` - Esegue webpack prima di pkg
- Script `build:*` - Crea eseguibili per varie piattaforme

### tsconfig.json (se presente)
Configurazione TypeScript per ES modules

## 🔍 Testare il Build Localmente

```bash
# 1. Installa le dipendenze
npm install

# 2. Testa in modalità sviluppo (ES modules nativi)
npm start

# 3. Testa il bundling webpack
npm run prebuild
node dist/index.bundled.js

# 4. Crea eseguibile per il tuo OS
npm run build:win   # Windows
# oppure
npm run build:linux # Linux
# oppure
npm run build:mac   # macOS

# 5. Testa l'eseguibile
cd dist
./shogun-superPeer.exe  # Windows
# oppure
./shogun-superPeer-linux # Linux
```

## 💡 Tips per lo Sviluppo

1. **Durante lo sviluppo**: lavora su `index.js` con ES modules nativi
2. **Prima del build**: webpack risolverà automaticamente tutto
3. **Non modificare** `dist/index.bundled.js` - è generato automaticamente
4. **Testa sempre** l'eseguibile finale dopo modifiche importanti

## 🤝 Contribuire

Se fai modifiche al codice:
1. Usa sempre sintassi ES modules (`import`/`export`)
2. Testa localmente con `npm start`
3. Testa il build con `npm run build:win` (o la tua piattaforma)
4. Verifica che l'eseguibile funzioni correttamente

## 📚 Documentazione Aggiuntiva

- `ES_MODULES_GUIDE.md` - Guida completa alla conversione ES modules
- `CONFIG_HELP.txt` - Guida alla configurazione del server
- `README.md` - README principale del progetto

## 🎉 Conclusione

Il progetto ora usa completamente ES Modules, garantendo:
- ✅ Compatibilità con pacchetti moderni
- ✅ Codice più pulito e manutenibile
- ✅ Build funzionanti per tutti i sistemi operativi
- ✅ Nessun problema con `gun-relays` o altri pacchetti ES only

Buon coding! 🚀

