var synth = (function () {

  var audioCtx;
  var osc;
  var frequency;
  var panner;
  var gain;
  var started = false;

  // setup audio context and populate frequency slider labels
  startup = function() {
    const heading = document.getElementById('title');
    heading.textContent = 'Shit Synth v0.12';

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    frequency = document.getElementById('frequencySlider').value;

    gain = audioCtx.createGain();
    osc = audioCtx.createOscillator();
    osc.type = document.getElementById('pattern').value;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    panner = new StereoPannerNode(audioCtx);
    panner.connect(audioCtx.destination);
    panner.connect(gain);
    gain.connect(audioCtx.destination);

    const slider = document.getElementById('frequencySlider');
    const minVal = document.getElementById('minHzVal');
    minVal.textContent = slider.min + "hz";

    const currentVal = document.getElementById('currentHzVal');
    currentVal.textContent = frequency + "hz";

    const maxVal = document.getElementById('maxHzVal');
    maxVal.textContent = slider.max + "hz";

    const panSlider = document.getElementById('panSlider');
    const minPanVal = document.getElementById('minPanVal');
    minPanVal.textContent = panSlider.min;

    const currentPanVal = document.getElementById('currentPanVal');
    currentPanVal.textContent = panSlider.value;

    const maxPanVal = document.getElementById('maxPanVal');
    maxPanVal.textContent = panSlider.max;

    const gainSlider = document.getElementById('gainSlider');
    const minGainVal = document.getElementById('minGainVal');
    minGainVal.textContent = gainSlider.min;

    const currentGainVal = document.getElementById('currentGainVal');
    currentGainVal.textContent = gainSlider.value;

    const maxGainVal = document.getElementById('maxGainVal');
    maxGainVal.textContent = gainSlider.max;
  }

  playSound = function() {
    if (started) {
      osc.connect(panner);
    } else {
      osc.start();
      started = true;
    }
  }

  updateTone = function() {
    frequency = document.getElementById('frequencySlider').value;
    if (osc) osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    const slider = document.getElementById('frequencySlider');
    const currentVal = document.getElementById("currentHzVal");
    if (currentVal && slider) currentVal.textContent = slider.value + "hz";
  }

  changePattern = function() {
    const pattern = document.getElementById('pattern').value;
    if (pattern) osc.type = pattern;
  }

  updatePanner = function() {
    const panValue = document.getElementById('panSlider').value;
    panner.pan.value = panValue;

    const currentPanVal = document.getElementById('currentPanVal');
    currentPanVal.textContent = panValue;
  }

  updateGain = function() {
    const gainValue = document.getElementById('gainSlider').value;
    gain.gain.value = gainValue;

    const currentGainVal = document.getElementById('currentGainVal');
    currentGainVal.textContent = gainValue;
  }

  stopSound = function() {
    if (osc) osc.disconnect(panner);
  }

})();
