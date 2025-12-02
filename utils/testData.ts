/**
 * Test Data
 * Contains test data for various test scenarios
 */

export const testTokens = {
  ETH: 'Ethereum',
  USDC: 'USD Coin',
  USDT: 'Tether',
  DAI: 'Dai',
  WBTC: 'Wrapped Bitcoin',
  MATIC: 'Polygon',
  AVAX: 'Avalanche',
  OP: 'Optimism',
  ARB: 'Arbitrum',
};

export const testChains = {
  ETHEREUM: 'Ethereum',
  POLYGON: 'Polygon',
  ARBITRUM: 'Arbitrum',
  OPTIMISM: 'Optimism',
  AVALANCHE: 'Avalanche',
  BSC: 'Binance Smart Chain',
  FANTOM: 'Fantom',
  GNOSIS: 'Gnosis',
  LINEA: 'Linea',
  SCROLL: 'Scroll',
};

export const swapTestCases = [
  {
    name: 'Swap ETH to USDC',
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: '0.1',
  },
  {
    name: 'Swap USDC to DAI',
    fromToken: 'USDC',
    toToken: 'DAI',
    amount: '100',
  },
  {
    name: 'Swap USDT to USDC',
    fromToken: 'USDT',
    toToken: 'USDC',
    amount: '50',
  },
  {
    name: 'Swap WBTC to ETH',
    fromToken: 'WBTC',
    toToken: 'ETH',
    amount: '0.01',
  },
];

export const bridgeTestCases = [
  {
    name: 'Bridge ETH from Ethereum to Polygon',
    fromChain: 'Ethereum',
    toChain: 'Polygon',
    fromToken: 'ETH',
    toToken: 'ETH',
    amount: '0.1',
  },
  {
    name: 'Bridge USDC from Ethereum to Arbitrum',
    fromChain: 'Ethereum',
    toChain: 'Arbitrum',
    fromToken: 'USDC',
    toToken: 'USDC',
    amount: '100',
  },
  {
    name: 'Bridge USDT from Polygon to Optimism',
    fromChain: 'Polygon',
    toChain: 'Optimism',
    fromToken: 'USDT',
    toToken: 'USDT',
    amount: '50',
  },
  {
    name: 'Bridge MATIC from Polygon to Avalanche',
    fromChain: 'Polygon',
    toChain: 'Avalanche',
    fromToken: 'MATIC',
    toToken: 'AVAX',
    amount: '10',
  },
];

export const invalidSwapTestCases = [
  {
    name: 'Swap with zero amount',
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: '0',
    expectedError: 'Amount must be greater than 0',
  },
  {
    name: 'Swap with negative amount',
    fromToken: 'ETH',
    toToken: 'USDC',
    amount: '-1',
    expectedError: 'Invalid amount',
  },
  {
    name: 'Swap with same token',
    fromToken: 'ETH',
    toToken: 'ETH',
    amount: '1',
    expectedError: 'Cannot swap same token',
  },
];

export const walletTestData = {
  metamask: {
    name: 'MetaMask',
    id: 'metamask',
  },
  walletconnect: {
    name: 'WalletConnect',
    id: 'walletconnect',
  },
  coinbase: {
    name: 'Coinbase Wallet',
    id: 'coinbase',
  },
};

export const networkTestData = [
  { name: 'Ethereum Mainnet', chainId: 1 },
  { name: 'Polygon', chainId: 137 },
  { name: 'Arbitrum One', chainId: 42161 },
  { name: 'Optimism', chainId: 10 },
  { name: 'Avalanche C-Chain', chainId: 43114 },
];

export const timeouts = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  EXTRA_LONG: 60000,
};

export const urls = {
  HOME: '/',
  SWAP: '/swap',
  BRIDGE: '/bridge',
  TRANSACTIONS: '/transactions',
  SETTINGS: '/settings',
};
