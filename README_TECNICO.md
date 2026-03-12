# ActorApp 🎭

Un'applicazione React moderna per aiutare gli attori a esercitarsi nei dialoghi teatrali.

## Copione Attuale: "Achille e Ettore"

Una storia comica e surreale di due amici che si sfidano per una bicicletta.
- **59 battute** totali
- **3 personaggi**: Narratore, Achille, Ettore
- Durata stimata: 15-20 minuti

## Caratteristiche

- ✨ **Design moderno** con Tailwind CSS e glassmorphism
- 🎯 **Selezione personaggio** intuitiva e visivamente accattivante
- 🎵 **Player audio intelligente** che distingue tra battute dell'attore e degli altri personaggi
- ⚡ **Controllo velocità** di riproduzione (0.75x - 1.5x)
- 📱 **Mobile-first** ottimizzato per smartphone
- 💾 **Persistenza locale** di preferenze e selezioni
- 🎨 **Colori personalizzati** per ogni personaggio

## Come funziona

1. **Seleziona il tuo personaggio** all'avvio dell'app
2. **Altri personaggi**: le loro battute vengono riprodotte automaticamente con audio
3. **Il tuo personaggio**: leggi e recita la battuta, poi premi "Ho Finito" per continuare
4. **Controlli completi**: play/pause, avanti/indietro, velocità di riproduzione

## Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

L'app sarà disponibile su `http://localhost:3000`

## Struttura del progetto

```
actorapp/
├── public/
│   ├── data/
│   │   └── script.json          # Copione in formato JSON
│   ├── audio/
│   │   └── *.mp3                # File audio delle battute
│   └── images/
│       └── *.jpg                # Avatar dei personaggi
├── src/
│   ├── components/
│   │   ├── CharacterSelection.jsx   # Schermata selezione personaggio
│   │   ├── ScriptPlayer.jsx         # Player principale
│   │   ├── DialogueCard.jsx         # Card battuta corrente
│   │   ├── AudioControls.jsx        # Controlli audio
│   │   ├── ProgressIndicator.jsx    # Indicatore progresso
│   │   └── EndScreen.jsx            # Schermata finale
│   ├── hooks/
│   │   └── useAudioPlayer.js        # Logica audio personalizzata
│   ├── App.jsx                      # Componente radice
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Stili globali
└── package.json
```

## Configurazione del copione

Il copione è definito in `public/data/script.json`:

```json
{
  "metadata": {
    "title": "Titolo della scena",
    "description": "Descrizione",
    "charactersCount": 3
  },
  "characters": [
    {
      "id": "marco",
      "name": "Marco",
      "color": "#3B82F6",
      "description": "Descrizione del personaggio"
    }
  ],
  "lines": [
    {
      "id": "line1",
      "characterId": "marco",
      "text": "Testo della battuta",
      "audio": "/audio/line1.mp3",
      "order": 1,
      "scene": "apertura"
    }
  ]
}
```

## Aggiungere file audio

### Generazione Automatica con Python (Consigliato)

```bash
# Installa la libreria TTS
pip install gtts

# Genera tutti i 59 file audio automaticamente
python genera_audio.py
```

Lo script creerà automaticamente tutti i file audio usando Google TTS italiano.

### Generazione Manuale

1. Registra o genera i file audio per ogni battuta
2. Salva i file MP3 nella cartella `public/audio/`
3. Assicurati che i nomi corrispondano: `line1.mp3`, `line2.mp3`, ..., `line59.mp3`

**Note:**
- L'app gestisce gracefully l'assenza di file audio
- Se un file audio non è disponibile, viene mostrato un messaggio
- Gli audio possono essere in formato MP3, WAV, o OGG
- Vedi `COME_AGGIUNGERE_AUDIO.md` per istruzioni dettagliate

## Personalizzazione

### Colori dei personaggi
Modifica i colori nel file `script.json` usando codici hex.

### Velocità disponibili
Modifica l'array `speedOptions` in `AudioControls.jsx`:
```javascript
const speedOptions = [0.75, 1, 1.25, 1.5, 2]
```

### Temi e stili
Personalizza i colori e le animazioni in `tailwind.config.js`.

## Tecnologie utilizzate

- **React 18** - Framework UI
- **Vite** - Build tool veloce
- **Tailwind CSS** - Utility-first CSS
- **HTML5 Audio API** - Riproduzione audio nativa

## Licenza

ISC

## Sviluppo futuro

Possibili miglioramenti:
- Supporto per più copioni
- Editor integrato per creare copioni
- Statistiche sulle prove
- Registrazione della propria voce
- Modalità karaoke con sottotitoli sincronizzati
