import { phoneNumberValidation, emailCheck } from "./user-entry-info-validation.js";
import { userDetails } from "../Sign-up-Data/user-details.js";
import { signupEntry, saveSignupEntry } from "../Sign-up-Data/signup-entry.js";
import { saveLoginEntry, loginEntry } from "../Login.data/login-entry.js";
import { entrydata, saveEntryData } from "./entry-data.js";


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
        loginEntry.length = 0;
        loginEntry.push(userInfo);
        saveLoginEntry();
        entrydata.length = 0;
        entrydata.push(userInfo);
        saveEntryData();
        continueLink1.setAttribute('href', 'login.html');
      } else if (!detailsMatch && (phoneValidation || emailValidation)) {
        signupEntry.length = 0
        signupEntry.push(userInfo);
        saveSignupEntry();
        entrydata.length = 0;
        entrydata.push(userInfo);
        saveEntryData();
        continueLink1.setAttribute('href', 'create-acct.html');
      };
    };
  });
};
