export const entrydata = JSON.parse(localStorage.getItem('entry-data')) || '';

export function saveEntryData() {
  localStorage.setItem('entry-data', JSON.stringify(entrydata));
};