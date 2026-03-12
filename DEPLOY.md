# 🚀 Guida al Deploy su GitHub Pages

Questa guida spiega come deployare **In Scena** su GitHub Pages.

## 📋 Prerequisiti

Assicurati di avere:
- Repository GitHub: `matteoerrera/InScena`
- Node.js installato
- Git configurato

## 🔧 Configurazione (già completata)

Ho già configurato tutto il necessario:

1. ✅ **vite.config.js**: Base URL impostato su `/InScena/`
2. ✅ **public/.nojekyll**: File per disabilitare Jekyll
3. ✅ **GitHub Actions Workflow**: Deploy automatico al push su `main`
4. ✅ **package.json**: Script per deploy manuale

## 🚀 Metodo 1: Deploy Automatico (Consigliato)

Il deploy avviene **automaticamente** ogni volta che fai push sul branch `main`:

```bash
git add .
git commit -m "Il tuo messaggio"
git push origin main
```

Il workflow GitHub Actions:
- Installa le dipendenze
- Compila il progetto
- Deploya su GitHub Pages

Puoi vedere lo stato del deploy nella tab **Actions** del repository.

## 🛠️ Metodo 2: Deploy Manuale

Se preferisci deployare manualmente:

```bash
# 1. Compila il progetto
npm run build

# 2. Deploya su GitHub Pages
npm run deploy
```

Oppure in un solo comando:

```bash
npm run predeploy && npm run deploy
```

## ⚙️ Configurazione GitHub Pages

Se è la prima volta che deploi, vai su:
1. Repository GitHub → **Settings** → **Pages**
2. In **Source** seleziona: `gh-pages` branch
3. Clicca **Save**

Dopo qualche minuto, l'app sarà disponibile su:
```
https://matteoerrera.github.io/InScena/
```

## 🔍 Verifica il Deploy

Dopo il deploy:
1. Vai su **Actions** nel repository
2. Verifica che il workflow sia completato con successo (✓)
3. Visita `https://matteoerrera.github.io/InScena/`

## 🐛 Troubleshooting

### Errore 404
- ✅ Già risolto: Il base URL è configurato correttamente come `/InScena/`
- ✅ Il file `.nojekyll` è presente in `public/`

### Deploy fallito
- Controlla che il branch sia `main` (non `master`)
- Verifica che GitHub Actions sia abilitato nel repository
- Controlla i log nella tab **Actions**

### Pagina bianca
- Cancella la cache del browser (Ctrl+Shift+R o Cmd+Shift+R)
- Controlla la console del browser per errori
- Verifica che il base URL in `vite.config.js` sia `/InScena/`

### File audio non trovati
- Assicurati che i file audio siano nella cartella `public/audio/`
- Il path nel JSON deve essere relativo: `audio/filename.mp3`

## 📝 Note Importanti

1. **Base URL**: L'app è configurata per funzionare su `/InScena/`. Se rinomini il repository, aggiorna il `base` in `vite.config.js`.

2. **Branch gh-pages**: GitHub Actions crea automaticamente questo branch. Non modificarlo manualmente.

3. **Cache**: Dopo un deploy, potrebbe essere necessario svuotare la cache del browser per vedere le modifiche.

4. **File audio**: Assicurati di committare i file audio nella cartella `public/audio/` prima del deploy, altrimenti non saranno disponibili online.

## 🎯 Workflow Tipico

```bash
# Sviluppa in locale
npm run dev

# Testa le modifiche
# ...

# Quando sei pronto per il deploy
git add .
git commit -m "Aggiunta nuova funzionalità"
git push origin main

# GitHub Actions farà il resto automaticamente!
```

## 🔗 Link Utili

- **Repository**: https://github.com/matteoerrera/InScena
- **GitHub Pages**: https://matteoerrera.github.io/InScena/
- **Actions**: https://github.com/matteoerrera/InScena/actions

## ✨ Prossimi Passi

Dopo il primo deploy:
1. Visita il sito su GitHub Pages
2. Testa tutte le funzionalità
3. Condividi il link con il tuo cast! 🎭
