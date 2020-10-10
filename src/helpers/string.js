/**
 * Return reduced place description length
 *
 * @param {String} content which should be reduced .
 * @param {Integer} maxLength max length of content .
 */
export const reducePlaceDescLength = (content, maxLength) => {
  // eslint-disable-next-line no-magic-numbers
  return content.length > maxLength ? `${content.substr(0, maxLength - 3)}...` : content
}
