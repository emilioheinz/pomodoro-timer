const withImages = require('next-images')
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = withImages({
  reactStrictMode: true,
  esModule: true,
  i18n
})
