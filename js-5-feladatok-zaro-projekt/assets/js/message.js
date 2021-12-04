'use strict'

const showMessage = (messageClass, messageCode) => {
  let message = ''
  switch (messageCode) {
    case 'edit':
      message = 'Először be kell fejezned az aktuális szerkesztést!'
      break;
    case 'validation':
      message = `A beírt adatok nem megfelelőek!`
      break;
    case 'validationInfo':
      message = `Examples:<br>Name: John Doe<br>Email: JD@example.com<br>Address: 99 Java Street`
      break;
    case 'cancelModif':
      message = `Nem történt módosítás`
      break;
    case 'cancelNewUser':
      message = `Nem lett rögzítve új felhasználó`
      break;
    case 'newUser':
      message = `Az új felhasználó mentése sikeres!`
      break;
    case 'updateUser':
      message = `A felhasználó módosítása sikeres!`
      break;
    case 'deleteUser':
      message = `A felhasználó törlése sikeres!`
      break;
    default:
      message = ''
      break;
  }
  const messageDiv = document.createElement('div')
  messageDiv.classList.add(messageClass)
  messageDiv.innerHTML = message
  document.querySelector('.tableDiv').appendChild(messageDiv)
  setTimeout(() => {
    messageDiv.classList.add(`${messageClass}-hidden`)
  }, 4000);
}

export {
  showMessage
}