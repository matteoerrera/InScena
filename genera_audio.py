#!/usr/bin/env python3
"""
Script per generare automaticamente file audio da copione JSON
usando Google Text-to-Speech (gTTS)
"""

import json
import os
from pathlib import Path

try:
    from gtts import gTTS
except ImportError:
    print("❌ Errore: libreria gtts non installata")
    print("📦 Installa con: pip install gtts")
    exit(1)

def main():
    print("🎭 Generatore Audio per ActorApp\n")
    
    script_path = Path('public/data/script.json')
    audio_dir = Path('public/audio')
    
    if not script_path.exists():
        print(f"❌ File {script_path} non trovato!")
        exit(1)
    
    with open(script_path, 'r', encoding='utf-8') as f:
        script = json.load(f)
    
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"📖 Copione: {script['metadata']['title']}")
    print(f"👥 Personaggi: {script['metadata']['charactersCount']}")
    print(f"💬 Battute totali: {len(script['lines'])}\n")
    
    characters = {char['id']: char['name'] for char in script['characters']}
    
    print("🎙️  Inizio generazione audio...\n")
    
    for i, line in enumerate(script['lines'], 1):
        line_id = line['id']
        text = line['text']
        char_name = characters.get(line['characterId'], 'Sconosciuto')
        
        filename = audio_dir / f"{line_id}.mp3"
        
        if filename.exists():
            print(f"⏭️  {i:2d}. {line_id}.mp3 già esistente, salto...")
            continue
        
        try:
            tts = gTTS(text=text, lang='it', slow=False)
            tts.save(str(filename))
            
            text_preview = text[:50] + "..." if len(text) > 50 else text
            print(f"✅ {i:2d}. {line_id}.mp3 - {char_name}: {text_preview}")
            
        except Exception as e:
            print(f"❌ {i:2d}. Errore su {line_id}: {e}")
    
    print(f"\n🎉 Completato! Generati {len(script['lines'])} file audio.")
    print(f"📁 Percorso: {audio_dir.absolute()}")
    print("\n💡 Ora ricarica l'app per ascoltare gli audio!")

if __name__ == '__main__':
    main()
