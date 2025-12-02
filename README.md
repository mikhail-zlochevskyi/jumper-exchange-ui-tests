# Jumper Exchange UI Tests

Comprehensive UI automation test suite for Jumper Exchange using Playwright with Page Object Model (POM) pattern.

## Overview

This project provides automated UI testing for the Jumper Exchange platform, which enables clients to swap or bridge crypto assets across dozens of blockchains.

## Features

- **Page Object Model (POM)** - Maintainable and scalable test structure
- **Multiple Test Scenarios** - Swap, bridge, wallet connection, and more
- **Cross-browser Testing** - Chromium, Firefox, and WebKit
- **Comprehensive Reporting** - HTML, JSON, and JUnit reports
- **CI/CD Ready** - GitHub Actions integration
- **Screenshot & Video Capture** - On failure for debugging

## Project Structure

```
jumper-exchange-ui-tests/
├── tests/
│   ├── pages/              # Page Object Models
│   ├── components/         # Reusable component models
│   ├── scenarios/          # Test scenarios
│   └── *.spec.ts          # Test files
├── utils/                  # Utility functions
├── config/                 # Configuration files
├── reports/                # Test reports (generated)
├── playwright.config.ts    # Playwright configuration
├── .env.example           # Environment variables template
└── package.json           # Dependencies
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jumper-exchange-ui-tests.git
cd jumper-exchange-ui-tests
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Configuration

Create a `.env` file based on `.env.example`:

```env
BASE_URL=https://jumper.exchange
TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASSWORD=your_password
HEADLESS=true
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/swap.spec.ts
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate test report
```bash
npx playwright show-report
```

## Test Scenarios

### 1. Swap Functionality
- Connect wallet
- Select source and destination tokens
- Enter swap amount
- Verify quote
- Execute swap

### 2. Bridge Functionality
- Select source and destination chains
- Choose tokens to bridge
- Verify bridge fee
- Execute bridge transaction

### 3. Wallet Connection
- Connect MetaMask/WalletConnect
- Verify wallet address display
- Disconnect wallet

### 4. Token Search & Selection
- Search for tokens
- Filter by chain
- Verify token details

### 5. Transaction History
- View recent transactions
- Filter transactions
- Verify transaction status

## Page Object Models

### BasePage
Base class for all page objects with common methods:
- Navigation
- Element interactions
- Waits and assertions

### HomePage
- Navigation elements
- Feature highlights
- CTA buttons

### SwapPage
- Token selection
- Amount input
- Quote display
- Swap execution

### BridgePage
- Chain selection
- Token selection
- Bridge execution

### WalletPage
- Wallet connection
- Account display
- Disconnect functionality

## CI/CD Integration

### GitHub Actions
Tests run automatically on:
- Push to main/develop branches
- Pull requests
- Scheduled daily runs

See `.github/workflows/` for configuration.

## Best Practices

1. **Use Page Object Model** - Keep selectors in page objects
2. **Meaningful Test Names** - Describe what is being tested
3. **Avoid Hard Waits** - Use Playwright's built-in waits
4. **Data-driven Tests** - Use test data fixtures
5. **Clean Up** - Reset state between tests
6. **Assertions** - Use specific, meaningful assertions

## Debugging

### View test execution
```bash
npx playwright test --headed --debug
```

### Generate trace
```bash
npx playwright test --trace on
```

### View trace
```bash
npx playwright show-trace trace.zip
```

## Contributing

1. Create a feature branch
2. Add tests for new features
3. Ensure all tests pass
4. Submit a pull request

## Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify BASE_URL is correct

### Selectors not found
- Update selectors in page objects
- Use `npx playwright codegen` to generate selectors
- Check if elements are in iframe

### Flaky tests
- Add explicit waits for dynamic content
- Use `waitForLoadState()`
- Increase retry count

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
