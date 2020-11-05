const path = require('path')

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.nomnoml$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/img/[name].[hash:8].svg'
              }
            },
            {
              loader: path.resolve('src/.vuepress/loaders/nomnoml')
            }
          ]
        }
      ]
    }
  },
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json', crossorigin: 'use-credentials' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00b0ff' }],
    ['meta', { name: 'msapplication-TileColor', content: '#2d89ef' }],
    ['meta', { name: 'theme-color', content: '#00b0ff' }]
  ],
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: false,
      updatePopup: false
    }
  },
  themeConfig: {
    displayAllHeaders: true,
    docsRepo: 'CudoVentures/cudos-network-docs',
    editLinks: true,
    nav: [
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Contribute and earn', link: '/contribute-and-earn/' },
      { text: 'Governance', link: '/governance/' },
      { text: 'Build', link: '/build/' },
      { text: 'Treasury', link: '/treasury/' },
      { text: 'Foundation and grants', link: '/foundation-and-grants/' },
      { text: 'Marketplace', link: '/marketplace/' },
    ],
    logo: '/CudosIconTransparent.png',
    repo: 'CudoVentures/cudos-network',
    sidebar: {
      '/introduction/': [
        '/introduction/getting-started/',
        '/introduction/faqs/'
      ],
      '/contribute-and-earn/': [
        '/contribute-and-earn/staking/',
        '/contribute-and-earn/validators/',
        '/contribute-and-earn/delegated-staking/',
        '/contribute-and-earn/earn-cudos/',
        '/contribute-and-earn/sell-data/'
      ],
      '/governance/': [],
      '/build/': [],
      '/treasury/': [],
      '/foundation-and-grants/': [],
      '/marketplace/': [],
      '/': [
        '/introduction/',
        '/contribute-and-earn/',
        '/governance/',
        '/build/',
        '/treasury/',
        '/foundation-and-grants/',
        '/marketplace/',
      ]
    }
  },
  title: 'CUDOS Docs'
}
