import { isEmpty } from "lodash";

/**
 * Creates the acronym from the string passed.
 * For eg: 'John Doe' => 'JD'.
 *
 * @param {String} label
 * @returns {String}
 */
export const getAcronym = (label: string): string => {
  if (isEmpty(label)) {
    return "";
  }

  const word = label.toUpperCase().split(" ");

  return word.length > 1 ? word[0][0] + word[word.length - 1][0] : word[0][0];
};
