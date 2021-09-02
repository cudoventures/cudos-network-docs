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

    ],
    logo: '/CudosIconTransparent.png',
    repo: 'CudoVentures/cudos-eth-token-contract',
    sidebar: {
      '/introduction/': [
        '/introduction/getting-started/',
        '/introduction/faqs/'
      ],
      '/docs/learn-cudos/': [
        '/docs/learn-cudos/layers-and-networks/cudos-network-overview',
        '/docs/learn-cudos/overview/types-of-nodes'
      ],
      '/docs/build-and-earn/': [
      '/docs/build-and-earn/getting-started/creating-a-keplr-wallet',
      '/docs/build-and-earn/getting-started/funding-your-wallet',
      '/docs/build-and-earn/getting-started/cudos-explorer',
      '/docs/build-and-earn/testnet-guides/prerequisites',
      '/docs/build-and-earn/testnet-guides/run-full-node',
      '/docs/build-and-earn/testnet-guides/run-sentry-node',
      '/docs/build-and-earn/testnet-guides/run-seed-node',
      '/docs/build-and-earn/testnet-guides/create-validator',
      '/docs/build-and-earn/testnet-guides/start-binaries'
      ],
      '/docs/become-a-validator': [
        '/docs/become-a-validator/delegated-staking-and-rewards',
        '/docs/become-a-validator/hardware-requirements',
        '/docs/become-a-validator/security-recommendation',
        '/docs/become-a-validator/run-validator-node'
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
        '/docs/learn-cudos/',
        '/docs/build-and-earn/',
        '/docs/become-a-validator/',
        '/foundation-and-grants/',
      ]
    }
  },
  title: 'CUDOS Docs'
}
