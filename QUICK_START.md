# Guida Rapida - In Scena

## Avvio Rapido

```bash
# 1. Installa dipendenze (già fatto)
npm install

# 2. Avvia il server di sviluppo
npm run dev

# 3. Apri http://localhost:3000 nel browser
```

## Uso dell'App

### 1. Selezione Personaggio
- All'avvio, scegli quale personaggio vuoi interpretare
- Clicca sulla card del personaggio desiderato

### 2. Durante la Prova
- **Battute degli altri personaggi**: 
  - Vengono riprodotte automaticamente con audio
  - Avanzamento automatico alla fine dell'audio
  - Controlli disponibili: play/pause, avanti/indietro 10s, velocità

- **Le tue battute**:
  - Solo testo visibile, nessun audio
  - Badge "Il tuo turno" per evidenziare
  - Pulsante "Ho Finito" per avanzare manualmente
  - Leggi e recita ad alta voce la tua parte

### 3. Controlli Disponibili
- **Battuta Precedente**: torna indietro di una battuta
- **Salta Battuta**: salta alla battuta successiva
- **Ricomincia**: riavvia la scena dall'inizio
- **Torna alla selezione**: cambia personaggio
- **Velocità**: 0.75x, 1x, 1.25x, 1.5x

### 4. Fine Scena
- Dopo l'ultima battuta appare la schermata di completamento
- Puoi ricominciare o cambiare personaggio

## Aggiungere i tuoi Copioni

### File Audio
1. Registra o genera i file audio per ogni battuta
2. Salvali in `public/audio/` con nomi come `line1.mp3`, `line2.mp3`, etc.
3. Aggiorna i path nel file `script.json`

### Personalizzare il Copione
Modifica `public/data/script.json`:

```json
{
  "metadata": {
    "title": "Titolo del tuo copione",
    "description": "Descrizione della scena"
  },
  "characters": [
    {
      "id": "personaggio1",
      "name": "Nome Personaggio",
      "color": "#CODICE_COLORE",
      "description": "Breve descrizione"
    }
  ],
  "lines": [
    {
      "id": "battuta1",
      "characterId": "personaggio1",
      "text": "Testo della battuta",
      "audio": "/audio/battuta1.mp3",
      "order": 1
    }
  ]
}
```

## Suggerimenti per l'Uso

1. **Mobile**: L'app è ottimizzata per smartphone. Usala sul tuo telefono durante le prove.

2. **Velocità**: Inizia con velocità 0.75x per imparare, poi aumenta gradualmente.

3. **Ripetizione**: Usa "Ricomincia" per ripetere la scena finché non la padroneggi.

4. **Senza Audio**: L'app funziona anche senza file audio - mostrerà solo il testo.

## Build per Produzione

```bash
npm run build
```

I file verranno generati nella cartella `dist/` e possono essere hostati su qualsiasi servizio di hosting statico:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Problemi Comuni

**Audio non si riproduce?**
- Verifica che i file MP3 esistano in `public/audio/`
- Controlla la console del browser per errori
- Alcuni browser bloccano l'autoplay - premi play manualmente

**Layout rotto?**
- Assicurati che Tailwind sia configurato correttamente
- Pulisci la cache: `rm -rf node_modules .vite && npm install`

**Modifiche non visibili?**
- Ricarica la pagina con Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)
