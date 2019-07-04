export const checkForValidity = (value, required, id) => {
  let isValid = false;

  if (!required) {
    return isValid = true;
  }

  let whitespaces = value.trim() !== '';
  let minLength = value.length >= 2

  switch (id) {
    case 'name':
      isValid = whitespaces && minLength
      break;
    case 'surname':
      isValid = whitespaces && minLength
      break;

    case 'email':
      isValid = minLength && whitespaces && /\S+@\S+\.\S+/.test(value);
      break;

    case 'password':
      isValid = value.length >= 6 && whitespaces
      break;

    case 'street':
      isValid = whitespaces && minLength
      break;

    case 'city':
      isValid = whitespaces && minLength
      break;

    default:
      alert('something wrong');
  }
  return isValid;
}