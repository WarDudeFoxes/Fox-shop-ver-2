import { signupEntry } from "./Sign-up-Data/signup-entry.js";
import { userDetails01 } from "./Sign-up-Data/details01-validation.js";
import { userDetails02 } from "./Sign-up-Data/details02-validation.js";
import { userDetails03 } from "./Sign-up-Data/details03-validation.js";
import { entrydata } from "./Entry-data/entry-data.js";
import { userDetails } from "./Sign-up-Data/user-details.js";


const prefixCont = document.querySelector('.prefix-cont');
const hidePop = document.querySelectorAll('.hide-pop');
const arrow = document.querySelector('.arrow');
const genderLabel = document.querySelector('.gender-label');
const countryCode = document.querySelectorAll('.row');
const codeDisplay = document.querySelector('.code-display');

prefixCont.addEventListener('click', () => {


  if (arrow.classList.contains('fa-caret-down')) {
    arrow.classList.replace('fa-caret-down', 'fa-caret-up')
    arrow.style.color = 'orange'
  } else {
    arrow.classList.add('fa-caret-down');
    arrow.style.color = 'black'
  }
  
  prefixCont.classList.toggle('colo')
  document.querySelector('.country-code-cont').classList.toggle('hide');
})

countryCode.forEach(element => {
  element.addEventListener('click', () => {
    codeDisplay.innerHTML = element.dataset.id
  });
});

hidePop.forEach(element => {
  element.addEventListener('click', () => {
    prefixCont.classList.remove('colo');

    document.querySelector('.country-code-cont').classList.add('hide');
    arrow.classList.replace('fa-caret-up', 'fa-caret-down');
    arrow.style.color = 'black'

    document.querySelector('.gender-select').classList.add('hide');
    genderLabel.classList.remove('borderColor') 
  });
});

genderLabel.addEventListener('click', () => {
  const caretArrow =  document.querySelector('.caret-arrow');
  
  document.querySelector('.gender-select').classList.toggle('hide');
  genderLabel.classList.toggle('borderColor');

  if (caretArrow.classList.contains('fa-caret-down')) {
    caretArrow.classList.replace('fa-caret-down', 'fa-caret-up');
    caretArrow.style.color = 'orange'
  } else {
    caretArrow.classList.replace('fa-caret-up', 'fa-caret-down');
    caretArrow.style.color = 'black';
  };

  document.querySelector('.months').classList.remove('borderColor');
  document.querySelector('.days').classList.remove('borderColor');
});

const userEntry = document.querySelector('.user-entry');
const userEntryEdit = document.querySelector('.edit-user-info');


if (signupEntry) {
  userEntry.innerHTML = signupEntry[0];
} else {
  location.replace('entry-point.html');
}

userEntryEdit.addEventListener('click', () => {
  userEntryEdit.setAttribute('href', 'entry-point.html');
});


const emailValidation = emailCheck();
const phoneValidation = phoneNumberValidation();

if (emailValidation) {
  document.querySelector('.email-pop').classList.add('hide')

  document.querySelector('.phone-number-conatainer').classList.remove('hide')

} else if (phoneValidation){
  document.querySelector('.email-pop').classList.remove('hide')
  document.querySelector('.phone-number-conatainer').classList.add('hide')
}

userDetails01();//validation
userDetails02();//validation
userDetails03(emailValidation, phoneValidation);//validation


export function phoneNumberValidation() {
  const countryCodes = ['091', '081', '070', '090', '080'];

  const phoneValidation = countryCodes.some(elem => signupEntry[0].match('^' + elem) && (entrydata[0].length > 10 && signupEntry[0].length < 12));
  return phoneValidation;
};

export function emailCheck() {

  const emailValidation = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(signupEntry[0]);
  return emailValidation;
}; 