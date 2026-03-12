# 🎙️ Generazione Audio con ElevenLabs

## Prerequisiti

1. **Account ElevenLabs**
   - Vai su https://elevenlabs.io/
   - Crea un account (hanno un piano gratuito)
   - Ottieni la tua API key dal dashboard

2. **API Key**
   - Vai su https://elevenlabs.io/app/settings/api-keys
   - Copia la tua API key

## Come Usare lo Script

### Metodo 1: Con Variabile d'Ambiente (Consigliato)

```bash
# Esporta la chiave API
export ELEVENLABS_API_KEY="la_tua_chiave_api"

# Esegui lo script
node genera_audio_elevenlabs.js
```

### Metodo 2: Inline (Per una volta sola)

```bash
ELEVENLABS_API_KEY="la_tua_chiave_api" node genera_audio_elevenlabs.js
```

### Metodo 3: Con file .env (Per uso ripetuto)

```bash
# Crea file .env
echo 'ELEVENLABS_API_KEY=la_tua_chiave_api' > .env

# Esegui con dotenv
npm install dotenv
node -r dotenv/config genera_audio_elevenlabs.js
```

## Voice IDs Configurati

Lo script usa voci diverse per ogni personaggio:

- **Narratore** (`char1`): `gfKKsLN1k0oYYN9n2dXX`
- **Achille** (`char2`): `f8NAZK1ciwrVujah7clz`
- **Ettore** (`char3`): `nH7uLS5UdEnvKEOAXtlQ`

## Cosa Fa lo Script

1. ✅ Legge il copione da `public/data/script.json`
2. ✅ Per ogni battuta:
   - Identifica il personaggio
   - Usa il voice ID corretto
   - Chiama l'API ElevenLabs
   - Salva il file MP3 in `public/audio/`
3. ✅ Salta i file già esistenti (puoi interrompere e riprendere)
4. ✅ Mostra progresso dettagliato

## Output Atteso

Lo script genererà **59 file audio**:

```
public/audio/
├── line1.mp3   (Narratore - voce 1)
├── line2.mp3   (Achille - voce 2)
├── line3.mp3   (Ettore - voce 3)
├── line4.mp3   (Achille - voce 2)
...
└── line59.mp3  (Achille - voce 2)
```

## Tempi di Generazione

- **Tempo per battuta**: ~2-3 secondi
- **Tempo totale stimato**: ~3-5 minuti
- **Pause**: lo script fa pause di 500ms tra chiamate per evitare rate limiting

## Costi ElevenLabs

**Piano Gratuito:**
- 10,000 caratteri/mese
- Il tuo copione ha circa 8,500 caratteri
- ✅ Rientra nel limite gratuito!

**Piano Starter ($5/mese):**
- 30,000 caratteri/mese
- Se generi più copioni

## Troubleshooting

### Errore: "API key non valida"
```bash
# Verifica che la chiave sia corretta
echo $ELEVENLABS_API_KEY

# Riprova a esportarla
export ELEVENLABS_API_KEY="la_tua_chiave_corretta"
```

### Errore: "Rate limit exceeded"
- Aspetta qualche minuto
- Lo script riprenderà da dove si è fermato
- I file già generati non verranno rigenerati

### Errore: "Character quota exceeded"
- Hai superato la quota mensile
- Aspetta il prossimo mese
- Oppure upgradi il piano
- Oppure usa lo script Python con gTTS (gratuito ma qualità inferiore)

### Audio non si riproduce nell'app
- Verifica che i file siano in `public/audio/`
- Controlla la console browser per errori
- I nomi devono corrispondere: `line1.mp3`, non `line_1.mp3`

## Modificare le Impostazioni Audio

Se vuoi personalizzare la qualità o lo stile delle voci, modifica nello script:

```javascript
voice_settings: {
  stability: 0.5,        // 0-1: più alto = più stabile
  similarity_boost: 0.75, // 0-1: fedeltà alla voce
  style: 0.0,            // 0-1: esagerazione espressiva
  use_speaker_boost: true
}
```

## Alternative

Se non vuoi usare ElevenLabs:

### Opzione A: Google TTS (Gratuito)
```bash
pip install gtts
python genera_audio.py
```

### Opzione B: Registrazione Manuale
- Registra te stesso con un'app
- Salva i file come `line1.mp3`, `line2.mp3`, etc.

## Note Importanti

- ⚠️ **Non committare l'API key** nel repository
- ✅ Il file `.gitignore` già esclude `.env`
- 🔒 Mantieni la chiave API segreta
- 💾 Backuppa i file audio generati (non ricrearli ogni volta)

## Risultato

Dopo aver eseguito lo script, l'app avrà:
- Audio di alta qualità per tutte le 59 battute
- Voci diverse e riconoscibili per ogni personaggio
- Riproduzione automatica perfettamente funzionante

Buona generazione! 🎭
