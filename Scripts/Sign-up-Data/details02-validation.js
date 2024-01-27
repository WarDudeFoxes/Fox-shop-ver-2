
export function userDetails02() {
  const continueLink3 = document.querySelector('.continue-link3');
  const firstName = document.querySelector('.first-name');
  const lastName = document.querySelector('.last-name')
  const phone = document.querySelector('.phone-number')
  const email = document.querySelector('.email')
  const bodyEL = document.querySelector('body');

  bodyEL.addEventListener('keyup', () => {
    const phoneValidation = phoneNumberValidation(phone);
    const emailValidation = emailCheck(email)
    const invalid_1name = (firstName.value === '' || (firstName.value).length < 2)
    const invalid_2name = (lastName.value === '' || lastName.value.length < 2)

    if ((phoneValidation || emailValidation) && (!invalid_1name && !invalid_2name)) {
      continueLink3.style.backgroundColor = 'orange';
    } else {
      continueLink3.style.backgroundColor = 'rgba(241, 156, 9, 0.4)'
    };
  });

  continueLink3.addEventListener('click', () => {

    const phoneValidation = phoneNumberValidation(phone);
    const emailValidation = emailCheck(email)
    const invalid_1name = (firstName.value === '' || (firstName.value).length < 2)
    const invalid_2name = (lastName.value === '' || lastName.value.length < 2)


    if (invalid_1name) {
      firstName.focus();
      document.querySelector('.first-name-cont small').classList.remove('hide');
      firstName.style.outlineColor = 'rgb(215, 18, 18)'
      firstName.style.borderColor = 'rgb(215, 18, 18)'
    } else if (invalid_2name) {
      lastName.focus();
      document.querySelector('.first-name-cont small').classList.add('hide');
      document.querySelector('.last-name-cont small').classList.remove('hide');
      firstName.style.outlineColor = 'orange'
      firstName.style.borderColor = 'black'
      lastName.style.outlineColor = 'rgb(215, 18, 18)'
      lastName.style.borderColor = 'rgb(215, 18, 18)'
      
    } else if (!phoneValidation && document.querySelector('.email-pop').classList.contains('hide')) {
      phone.focus();
      lastName.style.outlineColor = 'orange'
      lastName.style.borderColor = 'black'
      phone.style.outlineColor = 'rgb(215, 18, 18)'
      phone.style.borderColor = 'rgb(215, 18, 18)'
      document.querySelector('.last-name-cont small').classList.add('hide');
      document.querySelector('.phone-digit small').classList.remove('hide');
      
    } else if (!emailValidation && document.querySelector('.phone-number-conatainer').classList.contains('hide')) {
      email.focus();
      lastName.style.outlineColor = 'orange'
      lastName.style.borderColor = 'black'
      email.style.outlineColor = 'rgb(215, 18, 18)'
      email.style.borderColor = 'rgb(215, 18, 18)'
      document.querySelector('.last-name-cont small').classList.add('hide');
      document.querySelector('.email-pop small').classList.remove('hide');
    } else {
      document.querySelector('.details02').classList.add('hide');
      document.querySelector('.details03').classList.remove('hide');
    };
  });
};



export function phoneNumberValidation(phone) {
  const countryCodes = ['091', '081', '070', '090', '080'];

  const phoneValidation = countryCodes.some(elem =>phone.value.match('^' + elem) && (phone.value.length > 10 &&phone.value.length < 12));
  return phoneValidation;
};

export function emailCheck(email) {

  const emailValidation = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.value);
  return emailValidation;
};