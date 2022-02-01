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
        children: [
          {
            title: 'Introduction to Cudos',
            collapsible: true,
            path: '/learn/cudosnetwork.md',
            //            sidebarDepth: 1,
          },
          {
            title: 'Validators',
            collapsible: true,
            path: '/learn/validators.md',
            //            sidebarDepth: 1,
          },
          {
            title: 'Gravity Bridge',
            collapsible: true,
            path: '/learn/gravity-bridge.md'
          }
        ],
      },
      {
        title: 'Installation Guide',
        collapsible: true,
        children: ['/build/validator.md'],
      },

      {
        title: 'Working with Cudos tokens',
        collapsible: true,
        children: ['/build/interact-keplr-explorer.md', '/build/proposals.md'],
      },
      {
        title: 'Developer Guides',
        collapsible: true,
        children: ['/build/smart-contracts.md', '/build/nft.md'],
      },
      {
        title: 'Upgrade',
        collapsible: true,
        children: ['/build/upgrade.md', '/build/upgrade-v0.4.md'],
      },
      {
        title: 'Testnet',
        collapsible: true,
        children: ['/testnet/testnetinstall.md'],
      },
      {
        title: 'Roadmap',
        collapsible: true,
        children: ['/learn/roadmap.md'],
      },
      {
        title: 'Resources',
        collapsible: true,
        children: ['/learn/resources.md'],
      }
    ],
    '/earn/': [
      '',
      'staking',
      'incentives',
      'grants'
    ],
    // fallback
    '/': [
      '',
    ]
  }

}

