export const signupEntry = JSON.parse(localStorage.getItem('signup-entry')) || ''

export function saveSignupEntry() {
  localStorage.setItem('signup-entry', JSON.stringify(signupEntry));
};