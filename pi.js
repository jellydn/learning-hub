const PI_SPACE='https://huggingface.co/spaces/victor/MiniCPM5-2B-WebGPU-Pi';

function renderPi(){
  const supported='gpu' in navigator;
  const last=state.last;
  let context='';
  if(last){const t=tracks.find(x=>x.id===last.id);if(t){const l=t.lessons[last.i];context=`Current lesson: ${t.title} → ${l[0]}. ${l[1]}`}}
  app.innerHTML=`<div class="pi-page">
    <div class="pi-hero"><div><span class="local-pill">LOCAL · WEBGPU</span><h1>Pi Learning Assistant</h1><p>Run a coding/learning agent entirely in your browser with MiniCPM5-2B. The model uses Transformers.js, WebGPU and 4-bit ONNX weights.</p></div><div class="pi-status ${supported?'ok':'warn'}">${supported?'✓ WebGPU detected':'! WebGPU not detected'}</div></div>
    <div class="pi-grid"><div class="panel"><h2>Use Pi with Learn³</h2><p class="muted">Pi runs locally in the browser. The first launch downloads roughly 1.8 GB of model assets; later visits can reuse the browser cache.</p>${context?`<div class="callout"><b>Learning context</b><p>${context}</p><button class="copy-context" onclick="copyPiContext()">Copy lesson prompt for Pi</button></div>`:''}<a class="pi-launch" href="${PI_SPACE}" target="_blank" rel="noopener">Launch Pi in browser ↗</a><p class="fine">The Pi demo is hosted on Hugging Face. Inference is performed on your device through WebGPU after the model assets load.</p></div>
    <div class="panel"><h2>Best uses</h2><div class="pi-use"><b>Security lab</b><span>Ask Pi to review a small TypeScript snippet for the vulnerability in your current lesson.</span></div><div class="pi-use"><b>Communication practice</b><span>Draft an update, then ask Pi to make it answer-first and concise.</span></div><div class="pi-use"><b>LLM learning</b><span>Use the running model itself to inspect local inference, quantization and agent behavior.</span></div></div></div>
    <div class="panel pi-how"><h2>How it works</h2><div class="flow"><span>Learn³ lesson</span><b>→</b><span>Copy context</span><b>→</b><span>Pi agent</span><b>→</b><span>MiniCPM5-2B</span><b>→</b><span>WebGPU on your device</span></div><p class="muted">This keeps the Learning Hub static and serverless. Browser sandbox rules still apply: Pi cannot silently access your local files, terminal or Git repository.</p></div>
  </div>`;
}

window.copyPiContext=async function(){
  const last=state.last;if(!last)return;
  const t=tracks.find(x=>x.id===last.id),l=t.lessons[last.i];
  const prompt=`Act as my hands-on tutor. I am learning: ${t.title} — ${l[0]}.\n\nLesson goal: ${l[1]}\n\nTeach this in 15 minutes: explain the mental model, give one practical example relevant to a senior TypeScript/Node engineer, then give me one exercise. Do not reveal the answer until I attempt it.`;
  await navigator.clipboard.writeText(prompt);
  const b=document.querySelector('.copy-context');if(b){b.textContent='✓ Prompt copied';setTimeout(()=>b.textContent='Copy lesson prompt for Pi',1800)}
};

const piButton=document.querySelector('nav button[data-view="pi"]');
if(piButton)piButton.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));piButton.classList.add('active');renderPi()};