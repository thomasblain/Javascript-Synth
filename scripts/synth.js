var synth = (function () {

  var audioCtx;
  var osc;
  var frequency;

  startup = function() {
    const heading = document.getElementById('title');
    heading.textContent = 'Shit Synth v0';
    audioCtx = new AudioContext();
    frequency = document.getElementById('frequencySlider').value;

    const slider = document.getElementById('frequencySlider');
    const minVal = document.getElementById('minVal');
    minVal.textContent = slider.min + "hz";

    const maxVal = document.getElementById('maxVal');
    maxVal.textContent = slider.max + "hz";
  }

  playSound = function() {
    osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.connect(audioCtx.destination);
    osc.start();
  }

  updateTone = function() {
    frequency = document.getElementById('frequencySlider').value;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  }

  stopSound = function() {
    osc.stop();
  }

})();
