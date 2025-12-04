# Jumper Exchange UI Tests

UI automation test suite for **Jumper Exchange** using **Playwright** + **TypeScript** + **Page Object Model (POM)**.

## Overview

This repository contains Playwright UI tests for the Jumper Exchange platform, which enables users to swap and bridge crypto assets across multiple blockchains. The tests focus on core navigation, wallet setup UI, and menu interactions.

**App**: https://jumper.exchange  
**Docs**: https://docs.li.fi/api-reference/introduction

## Stack

- **Node.js** (>=18.0.0)
- **TypeScript** (^5.3.3)
- **Playwright** (^1.57.0)
- **Page Object Model (POM)** pattern

## Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jumper-exchange-ui-tests.git
cd jumper-exchange-ui-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

### Environment Variables (Optional)

Create a `.env` file to override the default base URL:

```env
APP_BASE_URL=https://jumper.exchange
```

If not set, defaults to `https://jumper.exchange`.

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npm run test:wallet          # Wallet setup tests
npm run test:navigation      # Navigation tests
npm run test:menu            # Menu navigation tests

# Or directly with Playwright
npx playwright test tests/ui/walletSetup.spec.ts
```

### Run in headed mode (see browser)
```bash
npm run test:headed
```

### Run in debug mode
```bash
npm run test:debug
```

### Run with UI mode
```bash
npm run test:ui
```

## Reports

### View HTML report
```bash
npm run report
```

This opens the Playwright HTML report in your browser, showing test results, screenshots, videos, and traces.

Reports are generated in `reports/html/` directory.

## Project Structure

```
jumper-exchange-ui-tests/
├── docs/
│   └── TEST_PLAN_UI.md          # Comprehensive test plan
├── src/
│   ├── config/
│   │   └── env.ts               # Environment configuration
│   ├── pages/
│   │   ├── BasePage.ts          # Base page object with common methods
│   │   ├── HomePage.ts          # Home page object
│   │   ├── Header.ts            # Header/navigation bar object
│   │   ├── MenuDrawer.ts        # Menu drawer object
│   │   ├── LearnPage.ts         # Learn page object
│   │   ├── DiscordPage.ts       # Discord page object
│   │   └── WalletModal.ts      # Wallet modal object
├── tests/
│   └── ui/
│       ├── walletSetup.spec.ts  # Wallet setup tests
│       ├── navigation.spec.ts  # Navigation tests
│       └── menu.spec.ts         # Menu navigation tests
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI workflow
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Test Coverage

### Wallet Setup (UI Level)
- ✅ Connect Wallet button visibility
- ✅ Wallet modal opens on click
- ✅ Wallet provider options displayed
- ✅ Modal close functionality

### Navigation
- ✅ Home page content loads
- ✅ Exchange and Missions button clicks
- ✅ Header elements visibility

### Menu Navigation
- ✅ Menu drawer opens/closes
- ✅ Navigate to Learn page
- ✅ Navigate to Discord (external link)
- ✅ URL pattern validation

## Assumptions & Limitations

### Wallet Setup Limitation

**Important**: Tests do **not** perform real wallet connections or blockchain transactions. The wallet setup tests validate:

- UI elements (button visibility, clickability)
- Modal behavior (open, close, provider list display)
- User interface flow up to the point of actual wallet connection

This limitation is documented in both the test plan (`docs/TEST_PLAN_UI.md`) and this README to set proper expectations.

### Other Limitations

- Tests run on **Chromium only** (Firefox/WebKit are future scope)
- **Desktop viewport only** (mobile viewports are future scope)
- No real on-chain swaps or transactions
- No visual regression testing (future scope)

## Future Improvements

1. **Cross-browser testing**
   - Add Firefox and WebKit projects
   - Validate consistency across browsers

2. **Mobile viewports**
   - Add mobile-specific test scenarios
   - Test responsive design behavior

3. **Visual regression**
   - Integrate screenshot comparison
   - Detect UI changes automatically

4. **Extended flows**
   - Swap flow (with mocked API)
   - Bridge flow (with mocked API)
   - Transaction history validation
   - Settings page navigation

5. **Performance testing**
   - Page load times
   - API response times
   - Network waterfall analysis

6. **Accessibility testing**
   - ARIA labels validation
   - Keyboard navigation
   - Screen reader compatibility

## CI/CD

### GitHub Actions

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

The CI workflow:
1. Checks out code
2. Sets up Node.js 20
3. Installs dependencies
4. Installs Playwright browsers
5. Runs tests
6. Uploads HTML report as artifact

See `.github/workflows/ci.yml` for configuration.

## Debugging

### View test execution
```bash
npm run test:headed -- --debug
```

### Generate trace
```bash
npx playwright test --trace on
```

### View trace
```bash
npx playwright show-trace trace.zip
```

### Codegen (generate selectors)
```bash
npm run codegen
```

This opens Playwright's codegen tool to interact with the app and generate selectors.

## Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify `APP_BASE_URL` is correct

### Selectors not found
- Use `npm run codegen` to generate new selectors
- Check if elements are in iframe
- Update selectors in page objects

### Flaky tests
- Add explicit waits for dynamic content
- Use `waitForLoadState()`
- Increase retry count in CI

## Contributing

1. Create a feature branch
2. Add tests for new features
3. Ensure all tests pass
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
