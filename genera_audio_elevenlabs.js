#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const VOICE_IDS = {
  'char1': 'gfKKsLN1k0oYYN9n2dXX', // Narratore
  'char2': 'f8NAZK1ciwrVujah7clz', // Achille
  'char3': 'nH7uLS5UdEnvKEOAXtlQ', // Ettore
};

async function generateAudio(text, voiceId, outputPath) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
  }

  const audioBuffer = await response.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(audioBuffer));
}

async function main() {
  console.log('🎭 ActorApp - Generatore Audio ElevenLabs\n');

  if (!ELEVENLABS_API_KEY) {
    console.error('❌ Errore: ELEVENLABS_API_KEY non trovata!');
    console.error('');
    console.error('Esegui lo script così:');
    console.error('  export ELEVENLABS_API_KEY="la_tua_api_key"');
    console.error('  node genera_audio_elevenlabs.js');
    console.error('');
    console.error('Oppure:');
    console.error('  ELEVENLABS_API_KEY="la_tua_api_key" node genera_audio_elevenlabs.js');
    process.exit(1);
  }

  const scriptPath = path.join(__dirname, 'public/data/script.json');
  const audioDir = path.join(__dirname, 'public/audio');

  const scriptData = JSON.parse(await fs.readFile(scriptPath, 'utf-8'));

  await fs.mkdir(audioDir, { recursive: true });

  console.log(`📖 Copione: ${scriptData.metadata.title}`);
  console.log(`👥 Personaggi: ${scriptData.metadata.charactersCount}`);
  console.log(`💬 Battute totali: ${scriptData.lines.length}\n`);

  const characterNames = scriptData.characters.reduce((acc, char) => {
    acc[char.id] = char.name;
    return acc;
  }, {});

  console.log('🎙️  Voice IDs:');
  for (const [charId, voiceId] of Object.entries(VOICE_IDS)) {
    console.log(`   ${characterNames[charId]}: ${voiceId}`);
  }
  console.log('\n🎵 Inizio generazione...\n');

  let success = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < scriptData.lines.length; i++) {
    const line = scriptData.lines[i];
    const lineNum = i + 1;
    const charName = characterNames[line.characterId] || 'Sconosciuto';
    const voiceId = VOICE_IDS[line.characterId];
    
    const filename = `${line.id}.mp3`;
    const outputPath = path.join(audioDir, filename);

    try {
      const exists = await fs.access(outputPath).then(() => true).catch(() => false);
      if (exists) {
        console.log(`⏭️  [${lineNum}/59] ${filename} - già esistente, salto...`);
        skipped++;
        continue;
      }

      if (!voiceId) {
        console.log(`⚠️  [${lineNum}/59] ${filename} - voice ID non trovato per ${line.characterId}`);
        errors++;
        continue;
      }

      const textPreview = line.text.length > 60 
        ? line.text.substring(0, 60) + '...' 
        : line.text;

      process.stdout.write(`🎤 [${lineNum}/59] ${charName} - ${textPreview}`);

      await generateAudio(line.text, voiceId, outputPath);

      console.log(' ✅');
      success++;

      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(` ❌`);
      console.error(`   Errore: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log('📊 RIEPILOGO:');
  console.log(`   ✅ Generati: ${success}`);
  console.log(`   ⏭️  Saltati: ${skipped}`);
  console.log(`   ❌ Errori: ${errors}`);
  console.log(`   📁 Cartella: ${audioDir}`);
  console.log('\n🎉 Completato! Ricarica l\'app per ascoltare gli audio.');
}

main().catch(err => {
  console.error('\n❌ Errore fatale:', err);
  process.exit(1);
});
