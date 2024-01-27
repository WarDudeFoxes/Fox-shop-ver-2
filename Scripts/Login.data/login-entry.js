export let loginEntry = JSON.parse(localStorage.getItem('login-entry')) || ''

export function saveLoginEntry() {
  localStorage.setItem('login-entry', JSON.stringify(loginEntry));
};