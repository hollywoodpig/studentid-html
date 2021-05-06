const typeTargets = document.querySelectorAll('[data-type]')
const typeButtons = document.querySelectorAll('[data-type-open]')

typeButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault()

    const buttonType = button.getAttribute('data-type-open')

    typeTargets.forEach(target => {
      target.removeAttribute('data-visible')

      const targetType = target.getAttribute('data-type')

      if (buttonType === targetType) target.setAttribute('data-visible', true)
    })
  })
})

// temp

const dataClicks = document.querySelectorAll('[data-click]')

dataClicks.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault()

    dataClicks.forEach(button => {
      button.classList.remove('active')
    })

    button.classList.add('active')
  })
})
