#!/bin/bash

echo "🎭 ActorApp - Generatore Audio Automatico"
echo ""

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 non trovato. Installa Python per continuare."
    exit 1
fi

if ! python3 -c "import gtts" 2>/dev/null; then
    echo "📦 Installazione libreria gtts..."
    pip3 install gtts
    echo ""
fi

echo "🎙️  Inizio generazione di 59 file audio..."
echo ""

python3 genera_audio.py

echo ""
echo "✅ Fatto! Ricarica l'app per ascoltare gli audio."
