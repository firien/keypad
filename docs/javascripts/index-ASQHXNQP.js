(() => {
  // javascripts/audio.js
  var frequencies = [
    [1336, 941],
    [1209, 697],
    [1336, 697],
    [1447, 697],
    [1209, 770],
    [1336, 770],
    [1447, 770],
    [1209, 852],
    [1336, 852],
    [1447, 852]
  ];
  var duration = 0.2;
  var beep = async (i) => {
    let audioContext = new AudioContext();
    let destination = audioContext.destination;
    let gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;
    let [high, low] = frequencies[i];
    let highOscillator = new OscillatorNode(audioContext, {
      type: "sine",
      frequency: high
    });
    highOscillator.connect(gainNode).connect(destination);
    highOscillator.start(0);
    highOscillator.stop(duration);
    let lowOscillator = new OscillatorNode(audioContext, {
      type: "sine",
      frequency: low
    });
    lowOscillator.connect(gainNode).connect(destination);
    lowOscillator.start(0);
    lowOscillator.stop(duration);
    setTimeout(() => {
      audioContext.close();
    }, 1500);
  };
  var boop = async (a, b) => {
    let audioContext = new AudioContext();
    let destination = audioContext.destination;
    let gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;
    let oscillator = new OscillatorNode(audioContext, {
      type: "square",
      frequency: a
    });
    oscillator.connect(gainNode).connect(destination);
    oscillator.start(0);
    oscillator.frequency.setValueAtTime(b, duration);
    oscillator.set;
    oscillator.stop(duration * 2);
  };

  // javascripts/shake.js
  var matrixTransformString = (m) => {
    return `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`;
  };
  var _a;
  var motionQuery = (_a = self.matchMedia) == null ? void 0 : _a.call(self, "(prefers-reduced-motion)");
  var reduceMotion = true;
  if (motionQuery != null) {
    const handleReduceMotionChanged = function(e) {
      reduceMotion = motionQuery.matches;
    };
    motionQuery.addEventListener("change", handleReduceMotionChanged);
    handleReduceMotionChanged();
  }
  var shake = (element) => {
    if (reduceMotion) {
      return { finished: Promise.resolve() };
    } else {
      let m1 = new DOMMatrix().translate(-5, 0);
      let m2 = new DOMMatrix().translate(0, 0);
      let m3 = new DOMMatrix().translate(5, 0);
      let keyFrames = [
        { transform: matrixTransformString(m1) },
        { transform: matrixTransformString(m3) },
        { transform: matrixTransformString(m1) },
        { transform: matrixTransformString(m2) },
        { transform: matrixTransformString(m1) }
      ];
      let options = {
        easing: "ease-in-out",
        duration: 200,
        iterations: 2
      };
      return element.animate(keyFrames, options);
    }
  };

  // javascripts/index.js
  var mute = true;
  var sequence = [];
  var answer;
  try {
    answer = localStorage.getItem("answer");
  } catch (err) {
    console.error(err);
  }
  var clearSequence = () => {
    sequence.length = 0;
    document.querySelector("output").value = sequence.join("");
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form input").value = answer;
    let output = document.querySelector("output");
    const appendNumber = (number) => {
      if (sequence.push(number) <= (answer == null ? void 0 : answer.length)) {
        if (!mute) {
          beep(number);
        }
        output.value = sequence.join("");
      } else {
        shake(output).finished.then(clearSequence);
      }
    };
    const submit = async (e) => {
      if (sequence.join("") === answer) {
        boop(400, 800);
      } else {
        boop(100, 50);
        await shake(output).finished;
      }
      clearSequence();
    };
    for (let button of document.querySelectorAll("button[value]")) {
      button.addEventListener("click", (e) => {
        let number = Number(e.currentTarget.value);
        appendNumber(number);
      });
    }
    document.querySelector("#clear").addEventListener("click", clearSequence);
    document.querySelector("#enter").addEventListener("click", submit);
    document.querySelector("#number").addEventListener("click", () => {
      document.querySelector("dialog").showModal();
    });
    document.querySelector("dialog").addEventListener("close", (e) => {
      let value = e.currentTarget.querySelector("form input").value;
      if ((value == null ? void 0 : value.length) > 0) {
        answer = value;
        try {
          localStorage.setItem("answer", answer);
        } catch (err) {
          console.error(err);
        }
      }
    });
    document.querySelector("#obscure").addEventListener("click", (e) => {
      output.classList.toggle("obscure", e.currentTarget.checked);
    });
    document.querySelector("#mute").addEventListener("click", (e) => {
      mute = e.currentTarget.checked;
    });
  });
})();
//# sourceMappingURL=index-ASQHXNQP.js.map
