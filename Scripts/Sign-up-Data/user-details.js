
export const userDetails = JSON.parse(localStorage.getItem('buyer-details')) ||
[{
  firstName: 'Waris',
  lastName: 'Ganiu',
  email: 'wardude@gmail.com',
  gender: 'male',
  DoB: '29/may/2004',
  phoneNumber: '09065721134',
  password: '99999999'
}];


export function saveUserDetails() {
  localStorage.setItem('buyer-details', JSON.stringify(userDetails));
}
