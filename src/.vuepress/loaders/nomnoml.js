const nomnoml = require('nomnoml')

module.exports = function (src) {
  const svg = nomnoml.renderSvg(src)
  return svg
}
