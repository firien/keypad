import { beep, boop } from './audio.js'
import { shake, bounce } from './shake.js'

let mute = true
let sequence = []
let answer
try {
  answer = localStorage.getItem('answer')
} catch (err) {
  console.error(err)
}

const clearSequence = () => {
  sequence.length = 0
  document.querySelector('output').value = sequence.join('')
}

const success = () => {
  let buttons = Array.from(document.querySelectorAll('.grid button:not([id])'))
  bounce(buttons)
}

document.addEventListener('DOMContentLoaded', () => {
  // set answer
  document.querySelector('form input').value = answer
  let output = document.querySelector('output')

  const appendNumber = (number) => {
    if (sequence.push(number) <= answer?.length) {
      if (!mute) {
        beep(number)
      }
      output.value = sequence.join('')
    } else {
      shake(output).finished.then(clearSequence)
    }
  }

  const submit = async (e) => {
    if (sequence.join('') === answer) {
      // if (!mute) {
        boop(400,800)
        success()
      // }
    } else {
      // if (!mute) {
        boop(100,50)
      // }
      await shake(output).finished
    }
    clearSequence()
  }

  // document.addEventListener('keypress', (e) => {
  //   let key = Number(e.key)
  //   if (!isNaN(key) && (key <= 9) && (key >= 0)) {
  //     appendNumber(key)
  //   } else if (e.key === 'Enter') {
  //     submit()
  //   }
  // })

  for (let button of document.querySelectorAll('button[value]')) {
    button.addEventListener('click', (e) => {
      let number = Number(e.currentTarget.value)
      appendNumber(number)
    })
  }
  document.querySelector('#clear').addEventListener('click', clearSequence)
  document.querySelector('#enter').addEventListener('click', submit)
  document.querySelector('#number').addEventListener('click', () => {
    document.querySelector('dialog').showModal()
  })
  document.querySelector('dialog').addEventListener('close', (e) => {
    let value = e.currentTarget.querySelector('form input').value
    if (value?.length > 0) {
      answer = value
      try {
        localStorage.setItem('answer', answer)
      } catch (err) {
        console.error(err)
      }
    }
  })
  document.querySelector('#obscure').addEventListener('click', (e) => {
    output.classList.toggle('obscure', e.currentTarget.checked)
  })
  document.querySelector('#mute').addEventListener('click', (e) => {
    mute = e.currentTarget.checked
  })
})
