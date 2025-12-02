# Contributing to Jumper Exchange UI Tests

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/jumper-exchange-ui-tests.git
cd jumper-exchange-ui-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment variables
cp .env.example .env
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm run test:swap
npm run test:bridge
npm run test:wallet

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI
npm run test:ui
```

## Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { YourPage } from './pages/YourPage';

test.describe('Feature Name', () => {
  let yourPage: YourPage;

  test.beforeEach(async ({ page }) => {
    yourPage = new YourPage(page);
    await yourPage.navigateToPage();
  });

  test('should do something', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Best Practices

1. **Use Page Object Model** - Keep all selectors in page objects
2. **Meaningful Names** - Use descriptive test names
3. **Single Responsibility** - Each test should test one thing
4. **Avoid Hard Waits** - Use Playwright's built-in waits
5. **Clean Up** - Reset state between tests
6. **Data-driven Tests** - Use test data fixtures
7. **Assertions** - Use specific, meaningful assertions

### Example Test

```typescript
test('should swap tokens successfully', async () => {
  // Arrange
  const fromToken = 'ETH';
  const toToken = 'USDC';
  const amount = '1';

  // Act
  await swapPage.selectFromToken(fromToken);
  await swapPage.selectToToken(toToken);
  await swapPage.enterAmount(amount);
  await swapPage.waitForElement(swapPage.quoteDisplay);

  // Assert
  expect(await swapPage.isVisible(swapPage.quoteDisplay)).toBe(true);
  expect(await swapPage.getExchangeRate().length).toBeGreaterThan(0);
});
```

## Creating Page Objects

### Structure

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  // Selectors
  readonly button: Locator = this.page.locator('[data-testid="button"]');

  constructor(page: Page) {
    super(page);
  }

  // Methods
  async clickButton(): Promise<void> {
    await this.click(this.button);
  }
}
```

### Guidelines

- Extend `BasePage` for common functionality
- Use data-testid attributes for selectors
- Create methods for user actions
- Use descriptive method names
- Keep selectors private/readonly

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(swap): add token search functionality`
- `fix(bridge): resolve chain selection issue`
- `docs(readme): update installation instructions`
- `test(wallet): add wallet connection tests`

## Pull Request Process

1. Update README.md with any new features
2. Update CHANGELOG.md with changes
3. Ensure all tests pass: `npm test`
4. Ensure no TypeScript errors: `npm run lint`
5. Provide a clear description of changes
6. Link related issues
7. Request review from maintainers

## PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Testing
- [ ] Added new tests
- [ ] Updated existing tests
- [ ] All tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Code Style

### TypeScript

- Use strict mode
- Use meaningful variable names
- Add JSDoc comments for public methods
- Use async/await instead of promises
- Use const/let instead of var

### Example

```typescript
/**
 * Selects a token from the dropdown
 * @param tokenName - Name of the token to select
 */
async selectToken(tokenName: string): Promise<void> {
  await this.click(this.tokenButton);
  await this.fill(this.tokenSearch, tokenName);
  await this.page.locator(`[data-testid="token-${tokenName}"]`).click();
}
```

## Testing Guidelines

### Test Coverage

- Aim for high coverage of critical paths
- Test happy paths and error scenarios
- Test edge cases
- Test user interactions
- Test navigation flows

### Test Types

- **Unit Tests** - Test individual components
- **Integration Tests** - Test component interactions
- **E2E Tests** - Test complete user flows

## Debugging

### Debug Mode

```bash
npm run test:debug
```

### Trace Viewer

```bash
npx playwright show-trace trace.zip
```

### Screenshots and Videos

- Automatically captured on failure
- Located in `test-results/` directory

## Reporting Issues

### Bug Report

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS]
- Node: [e.g., 18.0.0]
- Browser: [e.g., Chrome]

## Screenshots/Logs
Add any relevant screenshots or logs
```

### Feature Request

```markdown
## Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Any alternative approaches?
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Questions?

- Open an issue for questions
- Check existing issues for similar questions
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
