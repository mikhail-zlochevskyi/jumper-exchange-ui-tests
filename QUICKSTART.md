# Quick Start Guide

Get up and running with Jumper Exchange UI Tests in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jumper-exchange-ui-tests.git
cd jumper-exchange-ui-tests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration if needed
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Specific Test Suite

```bash
# Swap tests
npm run test:swap

# Bridge tests
npm run test:bridge

# Wallet tests
npm run test:wallet
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests for Specific Browser

```bash
# Chromium
npm run test:chromium

# Firefox
npm run test:firefox

# WebKit
npm run test:webkit
```

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

This will open the Playwright HTML report in your browser.

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:ui` | Run tests with UI mode |
| `npm run test:swap` | Run swap tests only |
| `npm run test:bridge` | Run bridge tests only |
| `npm run test:wallet` | Run wallet tests only |
| `npm run report` | View HTML test report |
| `npm run codegen` | Generate test code |
| `npm run lint` | Check TypeScript |

## Project Structure

```
jumper-exchange-ui-tests/
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── SwapPage.ts
│   │   ├── BridgePage.ts
│   │   └── WalletPage.ts
│   ├── swap.spec.ts        # Swap tests
│   ├── bridge.spec.ts      # Bridge tests
│   ├── wallet.spec.ts      # Wallet tests
│   ├── home.spec.ts        # Home page tests
│   ├── integration.spec.ts # Integration tests
│   └── fixtures.ts         # Test fixtures
├── utils/
│   ├── testData.ts         # Test data
│   └── helpers.ts          # Helper functions
├── config/                 # Configuration
├── reports/                # Test reports (generated)
├── playwright.config.ts    # Playwright config
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
└── README.md              # Full documentation
```

## Writing Your First Test

1. Create a new test file: `tests/myfeature.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('My Feature', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should verify home page loads', async () => {
    expect(await homePage.verifyHomePageLoaded()).toBe(true);
  });
});
```

2. Run your test:

```bash
npx playwright test tests/myfeature.spec.ts
```

## Debugging Tips

### View Test Execution

```bash
npm run test:headed
```

### Debug Specific Test

```bash
npx playwright test tests/swap.spec.ts --debug
```

### Generate Test Code

```bash
npm run codegen
```

This opens Playwright Inspector to record test actions.

### View Test Traces

```bash
npx playwright show-trace trace.zip
```

## Troubleshooting

### Tests Timeout

- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify BASE_URL is correct

### Selectors Not Found

- Update selectors in page objects
- Use `npm run codegen` to generate selectors
- Check if elements are in iframe

### Flaky Tests

- Add explicit waits for dynamic content
- Use `waitForLoadState()`
- Increase retry count

## Environment Variables

Create `.env` file based on `.env.example`:

```env
BASE_URL=https://jumper.exchange
HEADLESS=true
SLOW_MO=0
TIMEOUT=30000
```

## Next Steps

1. Read the [full README](README.md)
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
3. Review [Page Object Model pattern](tests/pages/BasePage.ts)
4. Explore [test examples](tests/)

## Getting Help

- Check [Playwright documentation](https://playwright.dev)
- Review existing tests for examples
- Open an issue on GitHub
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for support

## Tips & Tricks

### Run Tests in Parallel

Tests run in parallel by default. To run sequentially:

```bash
npx playwright test --workers=1
```

### Run Tests with Specific Tag

```bash
npx playwright test --grep @smoke
```

### Update Snapshots

```bash
npx playwright test --update-snapshots
```

### Generate Coverage Report

```bash
npx playwright test --coverage
```

## Performance

- Tests run in parallel for faster execution
- Use `--workers=1` to run sequentially if needed
- Screenshots and videos captured on failure only
- Traces captured on first retry

## CI/CD

Tests automatically run on:
- Push to main/develop branches
- Pull requests
- Scheduled daily runs

See `.github/workflows/tests.yml` for configuration.

---

Happy testing! 🚀
