export function phoneNumberValidation() {
  const countryCodes = ['091', '081', '070', '090', '080'];
  const phone = document.querySelector('.user-num-Mail');

  const phoneValidation = countryCodes.some(elem => phone.value.match('^' + elem) && (phone.value.length > 10 && phone.value.length < 12));
  return phoneValidation;
};

export function emailCheck() {

  const email = document.querySelector('.user-num-Mail');

  const emailValidation = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.value);
  return emailValidation;
};
