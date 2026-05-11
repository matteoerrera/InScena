# Audio Files

Posiziona qui i file audio delle battute del copione.

## Formato dei file

I file audio devono corrispondere ai path specificati nel file `script.json`.

Esempio:
- `line1.mp3` → corrisponde a `"/audio/line1.mp3"` nel JSON
- `line2.mp3` → corrisponde a `"/audio/line2.mp3"` nel JSON

## Formati supportati

L'app supporta tutti i formati audio supportati dai browser moderni:
- MP3 (consigliato per compatibilità)
- WAV
- OGG
- M4A

## Come generare file audio

### Opzione 1: Registrazione vocale
Usa qualsiasi software di registrazione audio (Audacity, GarageBand, etc.)

### Opzione 2: Text-to-Speech
Puoi usare servizi TTS per generare audio dalle battute:
- ElevenLabs
- Google Cloud TTS
- Amazon Polly
- Microsoft Azure TTS

### Opzione 3: Attori professionisti
Per produzioni di qualità, registra voci di attori reali.

## Note

L'applicazione funziona anche senza file audio - mostrerà un messaggio se un file non è disponibile.
