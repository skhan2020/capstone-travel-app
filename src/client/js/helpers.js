function dateValid(text) {
  const pattern = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
  return pattern.test(text);
}

function getTimeFromDate(date) {
  let parts = date.split('/');
  let mydate = new Date(parts[2], parts[0] - 1, parts[1]); 
  return mydate.getTime();
}

function days_between(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1 - date2);
  return Math.round(differenceMs / ONE_DAY);

}

export {dateValid, getTimeFromDate, days_between}