# Test Plan: Jumper Exchange UI Automation

## Scope & Objectives

### What parts of Jumper UI are covered:

1. **Wallet Setup flow** (up to the point possible without a real wallet)
   - Open "Connect Wallet" button
   - Validate wallet options list / modal behavior
   - Verify modal close functionality

2. **Navigation through home page**
   - Verify home page loads successfully
   - Click Exchange button (data-testid="navbar-exchange-button")
   - Click Missions button (data-testid="navbar-missions-button")
   - Verify buttons are accessible and functional

3. **Menu → "Learn" navigation**
   - Open menu drawer
   - Navigate to Learn section
   - Verify correct page/section loads

4. **Menu → "Discord" navigation** (external link)
   - Open menu drawer
   - Click Discord link
   - Verify external Discord URL opens in new tab

### Out of Scope

- Real on-chain swaps
- Real wallet signing / blockchain transactions (can be described as future work)
- Mobile viewport testing (future scope)
- Cross-browser testing beyond Chromium (future scope)
- Visual regression testing (future scope)

## Approach

### Tool: Playwright + TypeScript

- **Framework**: Playwright for browser automation
- **Language**: TypeScript for type safety
- **Pattern**: Page Object Model (POM) for maintainability

### POM Architecture

- **BasePage**: Common functionality (navigation, waits, base selectors)
- **HomePage**: Main page elements and swap/bridge widgets
- **Header**: Navigation tabs, logo, network selector
- **MenuDrawer**: Menu open/close, Learn and Discord links
- **LearnPage**: Learn section validation
- **DiscordPage**: External link handling and validation

### Test environments

- **Production URL**: `https://jumper.exchange` (default)
- **BaseURL configuration**: Via `APP_BASE_URL` environment variable
- **Viewport**: Desktop (1280x720 or similar)

## Test Types

### Functional UI tests (happy paths)

- Wallet modal opens and displays provider options
- Navigation tabs switch correctly
- Menu opens and Learn section loads
- Discord link opens external page

### Basic negative / resilience checks

- Elements visible when expected
- Disabled states for buttons
- Modal close functionality
- Broken navigation detection

## Test Cases

| ID | Title | Pre-conditions | Steps | Expected result | Priority |
|----|-------|----------------|-------|-----------------|----------|
| TC-001 | Wallet modal opens on Connect Wallet click | App loaded, not connected | 1. Open home page<br>2. Click "Connect Wallet" button | Wallet modal opens with provider list visible | P0 |
| TC-002 | Wallet provider options displayed | Wallet modal open | 1. Verify modal is visible<br>2. Check for at least one provider (MetaMask, WalletConnect, etc.) | At least one wallet provider option is visible | P0 |
| TC-003 | Wallet modal closes via X button | Wallet modal open | 1. Click close/X button | Modal closes, returns to initial state | P1 |
| TC-004 | Wallet modal closes via outside click | Wallet modal open | 1. Click outside modal area | Modal closes, returns to initial state | P1 |
| TC-005 | Home page loads successfully | App loaded | 1. Open home page<br>2. Verify URL contains jumper.exchange | Home page URL is correct | P0 |
| TC-006 | Click Exchange button | App loaded | 1. Click Exchange button<br>2. Verify button remains accessible | Exchange button clickable, page doesn't break | P0 |
| TC-007 | Click Missions button | App loaded | 1. Click Missions button<br>2. Verify button remains accessible | Missions button clickable, page doesn't break | P0 |
| TC-010 | Menu drawer opens | App loaded | 1. Click menu/burger icon | Menu drawer opens and is visible | P0 |
| TC-011 | Navigate to Learn via menu | Menu drawer open | 1. Click "Learn" link in menu | Navigates to Learn page/section, URL contains /learn or similar | P0 |
| TC-012 | Learn page content visible | On Learn page | 1. Verify heading or unique element<br>2. Verify Learn content is displayed | Learn page heading and content are visible | P0 |
| TC-013 | Navigate to Discord via menu | Menu drawer open | 1. Click "Discord" link in menu | New tab/page opens with Discord URL (contains 'discord') | P0 |
| TC-014 | Discord external link validation | Discord page opened | 1. Verify URL pattern (discord.gg or discord.com/invite) | URL is a valid Discord invite/community link | P0 |
| TC-015 | Core elements visible on home page | App loaded | 1. Verify swap widget<br>2. Verify network selector (if present)<br>3. Verify Connect Wallet button | All core elements are visible | P0 |

## Test Data

### Browsers

- **Primary**: Chromium (desktop)
- **Future scope**: Firefox, WebKit, mobile viewports

### Navigation Buttons

- **Exchange**: `data-testid="navbar-exchange-button"`
- **Missions**: `data-testid="navbar-missions-button"`

### Viewport

- **Desktop**: 1280x720 (default)
- **Future scope**: Mobile (375x667), Tablet (768x1024)

### Test URLs

- **Base URL**: `https://jumper.exchange` (configurable via `APP_BASE_URL`)
- **Learn URL**: Pattern matching `/learn` or `/docs` or similar
- **Discord URL**: Pattern matching `discord.gg` or `discord.com/invite`

## Risks & Assumptions

### Risks

1. **Changing UI / A/B tests**
   - **Mitigation**: Use robust selectors (data-testid preferred), update selectors as needed
   - **Impact**: Tests may break if UI changes significantly

2. **Wallet provider availability**
   - **Mitigation**: Tests validate presence of at least one provider, not specific providers
   - **Impact**: Different providers may appear based on region/config

3. **Local restrictions / rate-limiting**
   - **Mitigation**: Tests use reasonable waits, avoid rapid-fire requests
   - **Impact**: Tests may timeout if rate-limited

4. **External link dependencies**
   - **Mitigation**: Discord link test validates URL pattern, not full page load
   - **Impact**: External site changes may affect validation

### Assumptions

1. App is publicly accessible at `https://jumper.exchange`
2. Wallet modal opens without requiring real wallet connection
3. Menu structure includes Learn and Discord links
4. Exchange and Missions buttons are accessible via `data-testid` attributes
5. No authentication required for basic navigation tests

## Execution Strategy

### On each commit (CI)

- Run all P0 tests (critical path)
- Fast feedback for breaking changes
- Approximate duration: 2-3 minutes

### Nightly / scheduled runs

- Run full test suite (P0 + P1)
- Generate comprehensive reports
- Approximate duration: 5-7 minutes

### Manual / ad-hoc

- Run specific test files for debugging
- Run with `--headed` flag for visual debugging
- Run with `--debug` for step-by-step execution

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

7. **Error handling**
   - Network failure scenarios
   - API error responses
   - Invalid input validation

## Test Execution Notes

### Wallet Setup Limitation

**Important**: Tests do not perform real wallet connections or blockchain transactions. The wallet setup tests validate:

- UI elements (button visibility, clickability)
- Modal behavior (open, close, provider list display)
- User interface flow up to the point of actual wallet connection

This limitation is documented in both the test plan and README to set proper expectations.

### Selector Strategy

- **Preferred**: `data-testid` attributes for stable selectors
- **Fallback**: Robust CSS selectors (class names, role-based)
- **Avoid**: Text-only selectors unless necessary (may break with i18n)

### Wait Strategy

- Use Playwright's built-in auto-waiting
- Explicit waits only when necessary (e.g., network requests)
- Avoid hard-coded `sleep()` calls

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-XX  
**Author**: QA Automation Team

