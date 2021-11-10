var synth = (function () {

  var audioCtx;
  var osc;
  var frequency;

  // setup audio context and populate frequency slider labels
  startup = function() {
    const heading = document.getElementById('title');
    heading.textContent = 'Shit Synth v0.1';

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    frequency = document.getElementById('frequencySlider').value;

    const slider = document.getElementById('frequencySlider');
    const minVal = document.getElementById('minVal');
    minVal.textContent = slider.min + "hz";

    const currentVal = document.getElementById('currentVal');
    currentVal.textContent = frequency + "hz";

    const maxVal = document.getElementById('maxVal');
    maxVal.textContent = slider.max + "hz";
  }

  playSound = function() {
    osc = audioCtx.createOscillator();
    osc.type = document.getElementById('pattern').value;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.connect(audioCtx.destination);
    osc.start();
  }

  updateTone = function() {
    frequency = document.getElementById('frequencySlider').value;
    if (osc) osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    const slider = document.getElementById('frequencySlider');
    const currentVal = document.getElementById("currentVal");
    if (currentVal && slider) currentVal.textContent = slider.value + "hz";
  }

  changePattern = function() {
    const pattern = document.getElementById('pattern').value;
    if (pattern) osc.type = pattern;
  }

  stopSound = function() {
    if (osc) osc.stop();
  }

})();
