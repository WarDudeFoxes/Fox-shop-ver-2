import { userDetails, saveUserDetails } from "./user-details.js";
import { signupEntry } from "./signup-entry.js";
export let loginData = JSON.parse(localStorage.getItem('buyer-login-info')) || ''

export function saveLoginData() {
  localStorage.setItem('buyer-login-info', JSON.stringify(loginData))
}


export function userDetails03(emailValidation, phoneValidation) {
  const password = document.querySelector('.password')
  const firstName = document.querySelector('.first-name');
  const lastName = document.querySelector('.last-name')
  const phone = document.querySelector('.phone-number')
  const email = document.querySelector('.email')
  const genderType = document.querySelectorAll('.gender-select div');
  const day = document.querySelector('.days');
  const month = document.querySelector('.months');
  const year = document.querySelector('.year')
  const continueLink4 = document.querySelector('.continue-link4');
  const check = document.querySelector('.checkbox');
  const bodyEL = document.querySelector('body');
  
  genderType.forEach(element => {
    element.addEventListener('click', () => {
      const gendarDisplay = document.querySelector('.gender-type')
      gendarDisplay.innerHTML = element.dataset.id;
    });
  });


  continueLink4.addEventListener('click', () => {
    dobFocus(day,month,year,firstName, lastName, password, email,phone,emailValidation, phoneValidation, check);
  });

  bodyEL.addEventListener('click', () => { 
    const noDay = (day.value === 'Day');
    const noMonth = (month.value === 'Month');
    const noYear = (!((year.value > 1900) && (year.value < 2006)))
    
    if (!noDay && !noMonth && !noYear && check.checked) {
      continueLink4.style.backgroundColor = 'orange';
    } else if (!(check.checked)) {
      continueLink4.style.backgroundColor = 'rgba(241, 156, 9, 0.4)'
    };
  });
};

function dobFocus(day,month,year,firstName, lastName, password, email,phone,emailValidation, phoneValidation, check) {
  const gendarDisplay = document.querySelector('.gender-type');

  const noDay = (day.value === 'Day');
  const noMonth = (month.value === 'Month');
  const noYear = (!((year.value > 1900) && (year.value < 2006)))

  if (noDay) {
    day.focus();
  } else if (noMonth) {
    month.focus();
  } else if (noYear) {
    year.focus();
  } else if (!check.checked) {
    check.focus();
    console.log('hi');
  } else if (emailValidation) {
    document.querySelector('.details03').classList.add('hide');
    document.querySelector('.success-cont').classList.remove('hide');
    document.querySelector('.greet').innerHTML = `${lastName.value}, Your account has been created!`;
    
      
    userDetails.push({
      password: password.value,
      firstName:  `${firstName.value[0].toUpperCase() + firstName.value.substring(1)}`,
      lastName:  `${lastName.value[0].toUpperCase() + lastName.value.substring(1)}`,
      email: signupEntry.toLowerCase(),
      phoneNumber: phone.value,
      DoB: `${day.value}/${month.value}/${year.value}`,
      gender: gendarDisplay.innerHTML
    });
    saveUserDetails();
    loginData = signupEntry
    saveLoginData();
    saveUserDetails();
    pageRedirect() 

  } else if (phoneValidation) {
    document.querySelector('.details03').classList.add('hide');
    document.querySelector('.success-cont').classList.remove('hide');
    document.querySelector('.greet').innerHTML = `${lastName.value}, Your account has been created!`;
    
    userDetails.push({
      password: password.value,
      firstName:  `${firstName.value[0].toUpperCase() + firstName.value.substring(1)}`,
      lastName:  `${lastName.value[0].toUpperCase() + lastName.value.substring(1)}`,
      email: email.value.toLowerCase(),
      phoneNumber: signupEntry,
      DoB: `${day.value}/${month.value}/${year.value}`,
      gender: gendarDisplay.innerHTML
    });

    loginData = signupEntry
    saveLoginData();
    saveUserDetails();
    pageRedirect()
  };
};


function pageRedirect() {
  setInterval(() => {
    document.querySelector('.time').innerHTML = `${1} seconds`
  },1000);
  
  setTimeout(() => {
    location.replace('index.html')
  },3000);
};
