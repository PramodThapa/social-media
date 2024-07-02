/**
 * Function to check if string is empty.
 *
 * @param input
 * @returns {boolean}
 */
export const isStringEmpty = (input: string): boolean => input.length === 0;

/**
 * Creates the acronym from the string passed.
 * For eg: 'John Doe' => 'JD'.
 *
 * @param {String} label
 * @returns {String}
 */
export const getAcronym = (label: string): string => {
  if (isStringEmpty(label)) {
    return "";
  }

  const word = label.toUpperCase().split(" ");

  return word.length > 1 ? word[0][0] + word[word.length - 1][0] : word[0][0];
};

/**
 * Build supplied string by interpolating properties after delimiter ':' with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Barbara'})
 * => 'Barbaba is here.'
 *
 * @param {string} str
 * @param {object} params
 * @returns {string}.
 */

export const interpolate = (str: string, params: object = {}): string => {
  if (!params) {
    return str;
  }

  let formattedString = str.split("?")[0];
  let queryParams = "";

  for (const [key, value] of Object.entries(params)) {
    const val = value || "";

    if (str.includes(`:${key}`)) {
      formattedString = formattedString.replace(
        new RegExp(`:${key}`, "gi"),
        val.toString()
      );
    } else {
      queryParams += `${queryParams ? "&" : "?"}${key}=${encodeURIComponent(val.toString())}`;
    }
  }

  return formattedString + queryParams;
};
