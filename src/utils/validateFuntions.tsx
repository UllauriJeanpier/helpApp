export const handleName = (text: string) => {
  if (text.length < 3) {
    return false
  } else {
    return true
  }
}

export const handleAge = (text: string) => {
  const regexAge = /^[0-9]*$/
  if (!regexAge.test(text)) return false
  const age = Number(text)
  if (age >= 10 && age <= 200) {
    return true
  } else {
    return false
  }
}

export const handleDNI = (text: string) => {
  const regexDNI = /^\d{8}(?:[-\s]\d{4})?$/
  if (!regexDNI.test(text)) {
    return false
  } else {
    return true
  }
}

export const handleDistrit = (text: string) => {
  if (text.length < 3) {
    return false
  } else {
    return true
  }
}

export const handleEmail = (text: string) => {
  // eslint-disable-next-line no-control-regex
  const regexEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
  if (regexEmail.test(String(text).toLowerCase())) { return true } else { return false }
}

export const handlePassword = (text: string) => {
  if (text.length < 8) {
    return false
  } else {
    return true
  }
}
