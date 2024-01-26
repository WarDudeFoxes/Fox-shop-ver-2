import {userDetails} from './user-details.js';
import { entrydata } from '../Entry-data/entry-data.js';
import { signupEntry } from './signup-entry.js';



export function userDetails01() {
  console.log(userDetails);
  console.log(signupEntry);
  const password = document.querySelector('.password')
  const confirmPassword = document.querySelector('.confirm-password')
  const bodyEL = document.querySelector('body')
  const continueLink2 = document.querySelector('.continue-link2')
  
  
  bodyEL.addEventListener('keyup', () => {
    const inValidPass = password.value === '' || password.value.length < 8
    const passNotMatch = confirmPassword.value !== password.value 

    if  (!inValidPass && !passNotMatch)  {
      continueLink2.style.backgroundColor = 'orange';
    } else {
      continueLink2.style.backgroundColor = 'rgba(241, 156, 9, 0.4)'
    };
    
  });
  
  continueLink2.addEventListener('click', () => {
    passwordFocus(password, confirmPassword);
  });
};


function passwordFocus(password, confirmPassword) {
  const inValidPass = password.value === '' || password.value.length < 8
  const passNotMatch = confirmPassword.value !== password.value 
  if (inValidPass) {
    password.focus();
    password.style.borderColor = 'rgb(215, 18, 18)'
    password.style.outlineColor = 'rgb(215, 18, 18)'
    document.querySelector('.password-cont small').classList.remove('hide')
  } else if (passNotMatch) {
    confirmPassword.focus();
    confirmPassword.style.borderColor = 'rgb(215, 18, 18)'
    confirmPassword.style.outlineColor = 'rgb(215, 18, 18)'
    password.style.borderColor = 'black';
    password.style.outlineColor = 'orange';
    document.querySelector('.c-password-cont small').classList.remove('hide');
    document.querySelector('.password-cont small').classList.add('hide');
  } else {
    document.querySelector('.details01').classList.add('hide');
    document.querySelector('.details02').classList.remove('hide');
    console.log(entrydata[0]);
  }
};
