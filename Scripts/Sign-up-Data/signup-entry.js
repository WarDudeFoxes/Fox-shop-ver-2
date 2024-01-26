export const signupEntry = JSON.parse(localStorage.getItem('signup-entry')) ||
[{
  email: '',
  phoneNumber: ''
}];

export function saveSignupEntry() {
  localStorage.setItem('signup-entry', JSON.stringify(signupEntry));
};