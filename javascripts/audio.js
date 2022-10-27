const frequencies = [
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
]

const duration = 0.2

export const beep = async (i) => {
  let audioContext = new AudioContext();
  let destination = audioContext.destination
  let gainNode = audioContext.createGain();
  gainNode.gain.value = 0.1;
  let [high, low] = frequencies[i]
  let highOscillator = new OscillatorNode(audioContext, {
    type: 'sine',
    frequency: high
  })
  highOscillator.connect(gainNode).connect(destination);
  highOscillator.start(0)
  highOscillator.stop(duration)
  let lowOscillator = new OscillatorNode(audioContext, {
    type: 'sine',
    frequency: low
  })
  lowOscillator.connect(gainNode).connect(destination);
  lowOscillator.start(0)
  lowOscillator.stop(duration)
  setTimeout(() => {
    audioContext.close()
  }, 1500)
}

export const boop = async (a,b) => {
  let audioContext = new AudioContext();
  let destination = audioContext.destination
  let gainNode = audioContext.createGain();
  gainNode.gain.value = 0.1;
  let oscillator = new OscillatorNode(audioContext, {
    type: 'square',
    frequency: a
  })
  oscillator.connect(gainNode).connect(destination);
  oscillator.start(0)
  oscillator.frequency.setValueAtTime(b, duration)
  oscillator.set
  oscillator.stop(duration * 2)
}
