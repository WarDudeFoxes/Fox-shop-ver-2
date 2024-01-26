import { userDetails } from "../Sign-up-Data/user-details.js";
import { loginData } from "../Login.data/login.js";
// import { loginData } from "../Login.data/login-data.js";

export function generalCon() {

  const acc = document.querySelector('.account-container');
  const helps = document.querySelector('.help-container');
  
  acc.addEventListener('click', () => {
    const accountArrow = document.querySelector('.account-arrow');
    const helpArrow = document.querySelector('.help-arrow');
  
    document.querySelector('.sign-in-container').classList.toggle('hide');
    document.querySelector('.helps').classList.add('hide');
    acc.classList.toggle('background');
    helps.classList.remove('background');
    helpArrow.classList.replace('fa-angle-up', 'fa-angle-down');
  
    if (accountArrow.classList.contains('fa-angle-down')) {
      accountArrow.classList.replace('fa-angle-down', 'fa-angle-up')
    } else {
      accountArrow.classList.replace('fa-angle-up', 'fa-angle-down')
    };
  });
  
  helps.addEventListener('click', () => {
    const helpArrow = document.querySelector('.help-arrow');
    const accountArrow = document.querySelector('.account-arrow');
  
    helps.classList.toggle('background');
    acc.classList.remove('background');
    document.querySelector('.sign-in-container').classList.add('hide');
    document.querySelector('.helps').classList.toggle('hide');
    accountArrow.classList.replace('fa-angle-up', 'fa-angle-down')
    
    if (helpArrow.classList.contains('fa-angle-down')) {
      helpArrow.classList.replace('fa-angle-down', 'fa-angle-up')
    } else {
      helpArrow.classList.replace('fa-angle-up', 'fa-angle-down')
    };
  });
  
  document.querySelectorAll('.hide-pop').forEach(element => {
    element.addEventListener('click', () => {
      acc.classList.remove('background');
      helps.classList.remove('background');
  
      document.querySelector('.sign-in-container').classList.add('hide');
      document.querySelector('.helps').classList.add('hide');
      
      document.querySelector('.account-arrow').classList.replace('fa-angle-up', 'fa-angle-down');
      document.querySelector('.help-arrow').classList.replace('fa-angle-up', 'fa-angle-down');
    });
  });
};


export function updataProfile() {

  let infoMatch;
  userDetails.forEach(info => {
    if ((info.email  === loginData ) || (info.phoneNumber === loginData )) {
      infoMatch = info
    }; 
  });
  
  if (loginData) {
    document.querySelector('.account-text').innerHTML = `Hi,${infoMatch.firstName}`;
    document.querySelector('.sign-in-link').classList.add('hide');
    document.querySelector('.fa-check-circle').classList.remove('hide');
    document.querySelector('.joinProfile-link').setAttribute('href', 'account.html');
    document.querySelector('.saved-items-link').setAttribute('href', 'saved-item.html');
    document.querySelector('.account-link').setAttribute('href', 'account.html');
  } else {
    document.querySelector('.joinProfile-link').setAttribute('href', 'entry-point.html')
    document.querySelector('.account-text').innerHTML = `Account`;
    document.querySelector('.sign-in-link').classList.remove('hide');
    document.querySelector('.fa-check-circle').classList.add('hide');
    document.querySelector('.joinProfile-link').setAttribute('href', 'entry-point.html');
    document.querySelector('.saved-items-link').setAttribute('href', 'entry-point.html');
    document.querySelector('.account-link').setAttribute('href', 'entry-point.html');
    document.querySelector('.sign-in-link a').setAttribute('href', 'entry-point.html')
  };
};  