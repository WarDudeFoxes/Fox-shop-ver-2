import { loginEntry } from "./login-entry.js";
import { userDetails } from "../Sign-up-Data/user-details.js";


export let loginData = JSON.parse(localStorage.getItem('buyer-login-info')) || ''

export function saveLoginData() {
  localStorage.setItem('buyer-login-info', JSON.stringify(loginData))
};


const userEntry = document.querySelectorAll('.user-entry');
const userEntryEdit = document.querySelectorAll('.edit-user-info');



if (loginEntry) {
  userEntry.forEach(elem => {
    elem.innerHTML = loginEntry;
  });
} else if (!loginEntry) {
  // location.replace('entry-point.html');
};


userEntryEdit.forEach(elem =>{
  elem.addEventListener('click', () => {
    elem.setAttribute('href', 'entry-point.html');
  });
});


const password = document.querySelector('.password');

document.querySelectorAll('.login-link').forEach(elem => {
  elem.addEventListener('click', () => {
    if (!password.value) {
      password.focus();
      password.style.borderColor = 'rgb(215, 18, 18)'
      password.style.outlineColor = 'rgb(215, 18, 18)'
      document.querySelector('.password-cont small').classList.remove('hide')
      document.querySelector('.login-link').style.opacity = .4
    } else {
      userDetails.forEach(info => {
        if (password.value === info.password) {
          loginData = loginEntry
          document.querySelector('.login-link').setAttribute('href', 'index.html');
          saveLoginData();
        } else if (password.value !== info.password) {
          password.focus();
          password.style.borderColor = 'rgb(215, 18, 18)'
          password.style.outlineColor = 'rgb(215, 18, 18)'
          document.querySelector('.password-cont small').classList.remove('hide')
          document.querySelector('.login-link').style.opacity = .4
        }
      });
    };
  });
});