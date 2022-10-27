const matrixTransformString = (m) => {
  return `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`
}

// prefers-reduced-motion
let motionQuery = self.matchMedia?.('(prefers-reduced-motion)')
let reduceMotion = true
if (motionQuery != null) {
  const handleReduceMotionChanged = function(e) {
    reduceMotion = motionQuery.matches;
  }
  motionQuery.addEventListener('change', handleReduceMotionChanged)
  handleReduceMotionChanged()
}

export const shake = (element) => {
  if (reduceMotion) {
    return { finished: Promise.resolve() }
  } else {
    let m1 = (new DOMMatrix()).translate(-5, 0)
    let m2 = (new DOMMatrix()).translate(0, 0)
    let m3 = (new DOMMatrix()).translate(5, 0)
    let keyFrames = [
      { transform: matrixTransformString(m1) },
      { transform: matrixTransformString(m3) },
      { transform: matrixTransformString(m1) },
      { transform: matrixTransformString(m2) },
      { transform: matrixTransformString(m1) }
    ]
    let options = {
      easing: 'ease-in-out', duration: 200, iterations: 2
    }
    return element.animate(keyFrames, options)
  }
}

