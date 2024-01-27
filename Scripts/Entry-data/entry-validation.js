import { phoneNumberValidation, emailCheck } from "./user-entry-info-validation.js";
import { userDetails } from "../Sign-up-Data/user-details.js";


let loginEntry = JSON.parse(localStorage.getItem('login-entry')) || ''
function saveLoginEntry() {
  localStorage.setItem('login-entry', JSON.stringify(loginEntry));
};
let signupEntry = JSON.parse(localStorage.getItem('signup-entry')) || ''
function saveSignupEntry() {
  localStorage.setItem('signup-entry', JSON.stringify(signupEntry));
};
let entrydata = JSON.parse(localStorage.getItem('entry-data')) || ''
function saveEntryData() {
  localStorage.setItem('entry-data', JSON.stringify(entrydata));
};

export function entryPointFun() {

  const inputEl = document.querySelector('.user-num-Mail');
  const continueLink1 = document.querySelector('.continue-link');

  
  continueLink1.addEventListener('click', () => {

    const userInfo = (inputEl.value).toLowerCase()
    const emailValidation = emailCheck(userInfo);
    const phoneValidation = phoneNumberValidation(userInfo);
  
    if (!userInfo && ((!emailValidation) || (!phoneValidation))) {
      inputEl.focus();
      inputEl.classList.add('wrong-details');
      continueLink1.style.backgroundColor = 'rgba(255, 150, 2, 0.55)'
      document.querySelector('.error-message').classList.remove('hide')
    } else if (emailValidation || phoneValidation) {

      let detailsMatch;
      userDetails.forEach(details => {
        if ((userInfo === details.phoneNumber) || (userInfo === details.email)) {
          detailsMatch  = details
        };
      });
    
      if (detailsMatch) {
        loginEntry = '';
        loginEntry= userInfo;
        saveLoginEntry();
        entrydata  = '';
        entrydata = userInfo;
        saveEntryData();
        continueLink1.setAttribute('href', 'login.html');
      } else if (!detailsMatch && (phoneValidation || emailValidation)) {
        signupEntry = ''
        signupEntry = userInfo;
        saveSignupEntry();
        entrydata = '';
        entrydata = userInfo;
        saveEntryData();
        continueLink1.setAttribute('href', 'create-acct.html');
      };
    };
  });
};
