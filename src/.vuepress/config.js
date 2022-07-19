const { path } = require('@vuepress/utils')

module.exports = {
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json', crossorigin: 'use-credentials' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00b0ff' }],
    ['meta', { name: 'msapplication-TileColor', content: '#2d89ef' }],
    ['meta', { name: 'theme-color', content: '#00b0ff' }]
  ],
  plugins: [
    // [
    //   '@vuepress/pwa', {
    //     serviceWorker: false,
    //     updatePopup: false
    //   }
    // ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
      },
    ],
  ],
  theme: path.resolve(__dirname, './theme'),
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
    logo: '/logo.svg',
    logoDark: '/logo-dark.svg',
    repo: 'CudoVentures/',
    sidebar: [
      {
        text: 'Learn',
        collapsible: true,
        children: ['/learn/cudosnetwork.md', '/earn/staking.md', '/learn/validators.md', '/learn/roadmap.md'],
      },
      {
        text: 'Build',
        collapsible: true,
        children: ['/mainnet/build/mainnet-overview.md', '/mainnet/build/mainnet-envprep.md', '/mainnet/build/mainnet-cluster.md', '/mainnet/build/mainnet-standalone.md', '/mainnet/build/mainnet-fundnodes.md', '/mainnet/build/mainnet-securingnodes.md', '/build/hardware.md'],
      },
      {
        text: 'Using CUDOS Tokens',
        collapsible: true,
        children: ['/mainnet/keplr-explorer.md', '/mainnet/main-proposals.md'],
      },
      {
        text: 'Developer Guides',
        collapsible: true,
        children: ['/mainnet/main-smart-contracts.md', '/mainnet/main-nft.md', '/mainnet/main-cudos-blast.md'],
      },
      {
        text: 'Operational Tasks & Troubleshooting',
        collapsible: true,
        children: ['/mainnet/sync-troubleshooting.md'],
      },
      {
        text: 'Upgrade',
        collapsible: true,
        children: ['/build/upgrade.md'],

      },
      {
        text: 'Testnet',
        collapsible: true,
        children: ['/testnet/testnetoverview.md', '/testnet/testnetenvprep.md', '/testnet/testnetcluster.md', '/testnet/testnetstandalone.md', '/build/fundnodes.md', '/build/securingnodes.md',
          {
            text: 'Testnet Hardware Requirements',
            collapsible: true,
            children: ['/testnet/testnet-hardware.md'],
          },
          {
            text: 'Using CUDOS Tokens in Testnet',
            collapsible: true,
            children: ['/build/interact-keplr-explorer.md', '/build/proposals.md']
          },
          {
            text: 'Testnet Operational Tasks and Troubleshooting',
            collapsible: true,
            children: ['/build/validator-restart.md', '/build/sync-troubleshooting.md'],
          },
          {
            text: 'Testnet Developer Guide',
            collapsible: true,
            children: ['/build/smart-contracts.md', '/build/nft.md', '/build/cudos-blast.md'],
          },
          {
            text: 'Testnet Upgrade',
            collapsible: true,
            children: ['/build/upgrade-v0.9.0']
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

