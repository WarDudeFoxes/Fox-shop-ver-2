export const entrydata = JSON.parse(localStorage.getItem('entry-data')) ||
[{
  email: '',
  phoneNumber: ''
}];

export function saveEntryData() {
  localStorage.setItem('entry-data', JSON.stringify(entrydata));
};