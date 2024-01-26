export const loginEntry = JSON.parse(localStorage.getItem('login-entry')) ||
[{
  email: '',
}];

export function saveLoginEntry() {
  localStorage.setItem('login-entry', JSON.stringify(loginEntry));
};