module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '~/'
          }
        ]
      }
    ],
    ['styled-components', { ssr: true }]
  ]
}
