import fs from 'fs';
import path from 'path';

// CONFIGURAZIONE - Prima di usare Before Sunrise, scegli le voci su ElevenLabs
const SCRIPT_FILE = 'before-sunrise'; // Cambia questo: 'script' per Ettore/Achille, 'before-sunrise' per Before Sunrise
const OUTPUT_JSON = `./public/data/${SCRIPT_FILE}.json`;

const CONFIG = {
  'script': {
    voiceIds: {
      'char1': 'WtOoUla7XaygucEfMXS3', // Narratore
      'char2': '21m00Tcm4TlvDq8ikWAM', // Achille  
      'char3': 'FGY2WhTYpPnrIDTdsKH5'  // Ettore
    }
  },
  'before-sunrise': {
    voiceIds: {
      'celine': '21m00Tcm4TlvDq8ikWAM',  // Voce femminile francese
      'jesse': 'FGY2WhTYpPnrIDTdsKH5'     // Voce maschile americana
    }
  }
};

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY non trovata!');
  console.log('Esegui: export ELEVENLABS_API_KEY="la-tua-chiave"');
  process.exit(1);
}

const VOICE_IDS = CONFIG[SCRIPT_FILE].voiceIds;
const AUDIO_FOLDER = './public/audio';

if (!fs.existsSync(AUDIO_FOLDER)) {
  fs.mkdirSync(AUDIO_FOLDER, { recursive: true });
}

async function generateAudio(text, voiceId, outputPath) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  
  try {
    console.log(`🎙️  Generando audio: ${path.basename(outputPath)}`);
    
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✅ Creato: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Errore per ${outputPath}:`, error.message);
    return false;
  }
}

async function processScript() {
  console.log(`\n🎬 Generazione audio per: ${SCRIPT_FILE}\n`);
  
  const scriptData = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'));
  let successCount = 0;
  let errorCount = 0;

  for (const line of scriptData.lines) {
    const voiceId = VOICE_IDS[line.characterId];
    
    if (!voiceId) {
      console.log(`⚠️  Nessuna voce configurata per ${line.characterId}, salto...`);
      continue;
    }

    // Usa prefisso diverso per ogni copione per evitare conflitti
    const prefix = SCRIPT_FILE === 'script' ? '' : `${SCRIPT_FILE}-`;
    const audioFileName = `${prefix}line${line.order}.mp3`;
    const audioPath = path.join(AUDIO_FOLDER, audioFileName);
    
    if (line.audio && fs.existsSync(`.${line.audio}`)) {
      console.log(`⏭️  Audio già esistente: ${line.audio}`);
      continue;
    }
    
    const success = await generateAudio(line.text, voiceId, audioPath);
    
    if (success) {
      line.audio = `/audio/${audioFileName}`;
      successCount++;
    } else {
      errorCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(scriptData, null, 2));
  
  console.log(`\n📊 Riepilogo:`);
  console.log(`✅ Successi: ${successCount}`);
  console.log(`❌ Errori: ${errorCount}`);
  console.log(`📝 JSON aggiornato: ${OUTPUT_JSON}\n`);
}

processScript();
