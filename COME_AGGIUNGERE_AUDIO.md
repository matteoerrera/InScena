# Come Aggiungere File Audio al Copione

## Panoramica

Il tuo copione "Achille e Ettore" ha **59 battute** che necessitano di file audio.

## Passo 1: Prepara i File Audio

Hai bisogno di 59 file MP3, uno per ogni battuta:
- `line1.mp3` fino a `line59.mp3`

### Opzioni per Creare gli Audio

#### A. Registrazione Vocale
Registra te stesso o altri attori che leggono le battute:
- Usa un'app di registrazione sul telefono
- Esporta in formato MP3
- Rinomina i file come `line1.mp3`, `line2.mp3`, etc.

#### B. Text-to-Speech (TTS)
Usa servizi online per generare audio dalle battute:

**Servizi Gratuiti:**
- **TTSMaker** (https://ttsmaker.com/)
- **NaturalReaders** (https://www.naturalreaders.com/online/)
- **Google Cloud TTS** (300$ crediti gratuiti)

**Servizi Premium:**
- **ElevenLabs** (voci molto realistiche)
- **Amazon Polly**
- **Microsoft Azure TTS**

#### C. Script Automatico Python (Consigliato)

Se hai Python installato, puoi usare questo script per generare tutti i 59 file audio automaticamente:

```python
# genera_audio.py
import json
from gtts import gTTS
import os

# Leggi il copione
with open('public/data/script.json', 'r', encoding='utf-8') as f:
    script = json.load(f)

# Crea cartella audio se non esiste
os.makedirs('public/audio', exist_ok=True)

# Genera un file audio per ogni battuta
for line in script['lines']:
    text = line['text']
    line_id = line['id']
    
    # Genera audio con Google TTS (italiano)
    tts = gTTS(text=text, lang='it', slow=False)
    
    # Salva il file
    filename = f"public/audio/{line_id}.mp3"
    tts.save(filename)
    print(f"✓ Creato {filename}")

print(f"\n✅ Generati {len(script['lines'])} file audio!")
```

**Per usare lo script:**

```bash
# Installa la libreria
pip install gtts

# Esegui lo script
python genera_audio.py
```

## Passo 2: Posiziona i File

Una volta creati, metti tutti i file MP3 nella cartella:
```
public/audio/
├── line1.mp3
├── line2.mp3
├── line3.mp3
...
└── line59.mp3
```

## Passo 3: Verifica

Ricarica l'app e seleziona un personaggio. Le battute degli altri personaggi dovrebbero ora riprodurre l'audio automaticamente!

## Distribuzione dei File Audio

### Nomi dei File
I nomi devono corrispondere esattamente a quelli nel JSON:
```json
"audio": "/audio/line1.mp3"  → public/audio/line1.mp3
"audio": "/audio/line2.mp3"  → public/audio/line2.mp3
```

### Formato Consigliato
- **Formato**: MP3 (massima compatibilità browser)
- **Bitrate**: 128 kbps è sufficiente per voce parlata
- **Sample rate**: 44.1 kHz

### Ottimizzazione
Per ridurre le dimensioni dei file:
```bash
# Con ffmpeg (se installato)
ffmpeg -i input.mp3 -b:a 128k -ar 44100 output.mp3
```

## Suggerimenti per Audio di Qualità

### Per il Narratore
- Voce calma e pacata
- Ritmo narrativo
- Enfasi sulle descrizioni

### Per Achille
- Voce decisa, tono medio-basso
- Energia nelle battute comiche

### Per Ettore
- Voce leggermente diversa da Achille
- Carattere più vivace

### Lunghezza Battute
Alcune battute sono molto lunghe (es. line1, line43, line56). Considera:
- Registrare con un ritmo sostenuto ma chiaro
- Fare pause naturali nelle virgole
- L'utente può sempre mettere in pausa o riavvolgere

## Alternative Senza Audio

L'app funziona anche **senza file audio**. Se un file non esiste:
- Viene mostrato un messaggio "Audio non disponibile"
- L'utente può premere "Salta Battuta" per continuare
- Utile per prove rapide senza audio

## Elenco Completo delle Battute

Per comodità, ecco l'elenco di tutte le battute da registrare:

**Narratore (char1):** battute 1, 13, 16, 19, 22, 30, 32, 34, 36, 38, 40, 43, 45, 48, 53, 56, 58
**Achille (char2):** battute 2, 4, 6, 8, 10, 12, 14, 17, 20, 23, 25, 27, 29, 33, 37, 41, 47, 50, 52, 54, 57, 59
**Ettore (char3):** battute 3, 5, 7, 9, 11, 15, 18, 21, 24, 26, 28, 31, 35, 39, 42, 44, 46, 49, 51, 55

Totale: **59 battute**
- Narratore: 17 battute (le più lunghe)
- Achille: 22 battute
- Ettore: 20 battute

## Domande Frequenti

**Q: Posso usare formati diversi da MP3?**
A: Sì, l'app supporta anche WAV, OGG, M4A. MP3 è consigliato per compatibilità.

**Q: I file audio devono avere la stessa durata?**
A: No, ogni file può avere la sua durata naturale. L'app rileva automaticamente la durata.

**Q: Posso testare l'app senza tutti gli audio?**
A: Sì! L'app funziona anche con audio parziali. Utile per testare durante la registrazione.

**Q: Come faccio se l'audio è troppo veloce o lento?**
A: Usa i controlli velocità nell'app (0.75x - 1.5x) invece di riregistrare tutto.
