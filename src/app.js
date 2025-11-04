// Lógica do protótipo: calcula hora de retorno e exibe contagem regressiva
(() => {
  const startEl = document.getElementById('start');
  const nowBtn = document.getElementById('nowBtn');
  const durationEl = document.getElementById('duration');
  const customEl = document.getElementById('customMinutes');
  const calcBtn = document.getElementById('calcBtn');
  const clearBtn = document.getElementById('clearBtn');
  const resultEl = document.getElementById('result');
  const returnTimeEl = document.getElementById('returnTime');
  const countdownEl = document.getElementById('countdown');
  const copyBtn = document.getElementById('copyBtn');

  let timerId = null;

  function pad(n){return n.toString().padStart(2,'0')}

  function formatDate(d){
    const date = `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    return `${date} — ${time}`;
  }

  function startNow(){
    const now = new Date();
    // datetime-local expects YYYY-MM-DDTHH:mm
    const local = new Date(now.getTime() - now.getTimezoneOffset()*60000).toISOString().slice(0,16);
    startEl.value = local;
  }

  function getSelectedMinutes(){
    const v = durationEl.value;
    if(v === 'custom'){
      const m = Number(customEl.value) || 0;
      return Math.max(1, Math.floor(m));
    }
    return Number(v);
  }

  function clearCountdown(){
    if(timerId) { clearInterval(timerId); timerId = null; }
    countdownEl.textContent = '--:--:--';
  }

  function calculate(){
    if(!startEl.value){
      alert('Escolha a data/hora de saída (ou pressione Agora).');
      return;
    }
    const start = new Date(startEl.value);
    if(isNaN(start)) { alert('Horário inválido'); return; }
    const minutes = getSelectedMinutes();
    const ret = new Date(start.getTime() + minutes*60000);

    returnTimeEl.textContent = formatDate(ret);
    resultEl.classList.remove('hidden');

    // iniciar contagem regressiva
    if(timerId) clearInterval(timerId);
    timerId = setInterval(()=>{
      const now = new Date();
      const diff = ret.getTime() - now.getTime();
      if(diff <= 0){
        countdownEl.textContent = '00:00:00 — Hora de voltar!';
        clearInterval(timerId); timerId = null;
        // opcional: tocar som/nativa notificação
        return;
      }
      const s = Math.floor(diff/1000);
      const hh = Math.floor(s/3600);
      const mm = Math.floor((s%3600)/60);
      const ss = s%60;
      countdownEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
    }, 250);
  }

  // eventos
  nowBtn.addEventListener('click', startNow);
  durationEl.addEventListener('change', ()=>{
    if(durationEl.value === 'custom') customEl.classList.remove('hidden');
    else customEl.classList.add('hidden');
  });

  calcBtn.addEventListener('click', (e)=>{ e.preventDefault(); calculate(); });
  clearBtn.addEventListener('click', (e)=>{ e.preventDefault(); startEl.value=''; durationEl.value='30'; customEl.value=''; resultEl.classList.add('hidden'); clearCountdown(); });

  copyBtn.addEventListener('click', async ()=>{
    const text = returnTimeEl.textContent || '';
    try{
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copiado';
      setTimeout(()=> copyBtn.textContent = 'Copiar', 1500);
    }catch(e){
      alert('Não foi possível copiar.');
    }
  });

  // inicializações
  document.addEventListener('DOMContentLoaded', ()=>{
    startNow();
    // restaura preferências simples
    const saved = localStorage.getItem('voltaj_duration');
    if(saved) durationEl.value = saved;
  });

  // salvar preferência de duração
  durationEl.addEventListener('change', ()=> localStorage.setItem('voltaj_duration', durationEl.value));
})();
