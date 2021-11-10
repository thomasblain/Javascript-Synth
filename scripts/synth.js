startup = function() {
  const heading = document.getElementById('title');
  heading.textContent = 'Shit Synth v0';
}

const audioCtx = new window.AudioContext();

playSound = function(){
  const osc = audioCtx.createOscillator();
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc.connect(audioCtx.destination);
  osc.start();
}
