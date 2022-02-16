const path = require('path')

module.exports = {
  title: 'CUDOS Docs',
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
    docsDir: 'src',
    // editLinks: true,
    sidebarDepth: 1,
    //    nav: [
    //      { text: 'Learn', link: '/learn/' },
    //      { text: 'Build', link: '/build/' },
    //      { text: 'Earn', link: '/earn/' }
    //    ],
    logo: '/CudosIconTransparent.png',
    repo: 'CudoVentures/',
    sidebar: [
      {
        title: 'Learn',
        collapsible: true,
        children: ['/learn/cudosnetwork.md', '/earn/staking.md', '/learn/validators.md', '/learn/roadmap.md'],
      },

      {
        title: 'Build',
        collapsible: true,
        children: ['/mainnet/build/mainnet-overview.md', '/mainnet/build/mainnet-envprep.md', '/mainnet/build/mainnet-cluster.md', '/mainnet/build/mainnet-standalone.md', '/mainnet/build/mainnet-fundnodes.md', '/mainnet/build/mainnet-securingnodes.md', '/build/hardware.md'],
      },
      {
        title: 'Using CUDOS Tokens',
        collapsible: true,
        children: ['/mainnet/keplr-explorer.md', '/mainnet/main-proposals.md'],
      },
      {
        title: 'Developer Guides',
        collapsible: true,
        children: ['/build/tbcplaceholder.md'],
      },
      {
        title: 'Operational Tasks & Troubleshooting',
        collapsible: true,
        children: ['/mainnet/sync-troubleshooting.md'],
      },
      {
        title: 'Testnet',
        collapsible: true,
        children: ['/testnet/testnetoverview.md', '/testnet/testnetenvprep.md', '/testnet/testnetcluster.md', '/testnet/testnetstandalone.md', '/build/fundnodes.md', '/build/securingnodes.md',
          {
            title: 'Testnet Hardware Requirements',
            collapsible: true,
            children: ['/testnet/testnet-hardware.md'],
          },
          {
            title: 'Using CUDOS Tokens in Testnet',
            collapsible: true,
            children: ['/build/interact-keplr-explorer.md', '/build/proposals.md']
          },
          {
            title: 'Testnet Operational Tasks and Troubleshooting',
            collapsible: true,
            children: ['/build/validator-restart.md', '/build/sync-troubleshooting.md'],
          },
          {
            title: 'Testnet Developer Guide',
            collapsible: true,
            children: ['/build/smart-contracts.md', '/build/nft.md'],
          },
          {
            title: 'Testnet Upgrade',
            collapsible: true,
            children: ['/build/upgrade-v0.4']
          },
        ],
      },
    ],
    // '/earn/': [
    //   '',
    //   'staking',
    //   'incentives',
    //   'grants'
    // ],
    // fallback
    '/': [
      '',
    ]
  }

}

