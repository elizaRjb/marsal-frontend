/**
 * Returns a random value from an array.
 *
 * @param {Array} list
 */
export function getRandomValueFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns initials from full name.
 *
 * @param {String} fullName
 */
export function getInitialsFromName(fullName) {
  if (!fullName.trim()) {
    return '';
  }

  const nameArr = fullName.trim().split(' ');

  return (nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0)).toUpperCase();
}
