'use strict'

const validate = (data = []) => {
  const name = data[0].value.trim()
  const email = data[1].value.trim()
  const address = data[2].value.trim()
  const namePattern = /^[A-ZÁÉÍÓÚÖŐÜŰ]{1}[A-ZÁÉÍÓÚÖŐÜŰa-záéíóúöőüű'-.]+( [A-ZZÁÉÍÓÚÖŐÜŰ]{1}[A-ZÁÉÍÓÚÖŐÜŰa-záéíóúöőüű]+)+$/
  const emailPattern = /^[\w!#$%&'*+\/=?^_`{|}~.\-]+@[\w!#$%&'*+\/=?^_`{|}~.\-]+\.[a-z]{2,4}$/
  const addressPattern = /^(\d* )*[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+ [\wÁÉÍÓÚÖŐÜŰa-záéíóúöőüű]+ *[\wÁÉÍÓÚÖŐÜŰa-záéíóúöőüű]*$/

  if (name.match(namePattern) && email.match(emailPattern) && address.match(addressPattern)) {
    return true
  } else {
    return false
  }
}

export {
    validate
}