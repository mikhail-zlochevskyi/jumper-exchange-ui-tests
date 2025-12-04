# Selectors Collection Guide

This document helps collect the correct selectors from the actual Jumper Exchange UI.

## How to Collect Selectors

### Option 1: Use Playwright Codegen (Recommended)
```bash
npm run codegen
```
This opens a browser where you can interact with the site and see the generated selectors.

### Option 2: Use Browser DevTools
1. Open https://jumper.exchange in Chrome
2. Press F12 to open DevTools
3. Use the element selector tool (Ctrl+Shift+C / Cmd+Shift+C)
4. Click on elements to see their selectors

---

## Selectors to Collect

### 1. Wallet Setup

#### Connect Wallet Button
- **Location**: Main page, usually in header/navbar
- **What to find**: The button that says "Connect Wallet" or similar
- **Current selector attempts**:
  - `button:has-text("Connect Wallet")`
  - `[data-testid="connect-wallet"]`
  - `button:has-text("Connect")`
  - `[data-testid="navbar-connect-wallet"]`

**Please provide**:
- [ ] Actual selector that works
- [ ] Any data-testid attribute
- [ ] Button text (exact or partial)

---

#### Wallet Selection Modal/Popup
- **Location**: Opens after clicking Connect Wallet
- **What to find**: The modal/dialog that shows wallet options
- **Current selector attempts**:
  - `[data-testid="wallet-modal"]`
  - `[data-testid="connect-wallet-modal"]`
  - `[role="dialog"]:has-text("Connect")`

**Please provide**:
- [ ] Modal container selector
- [ ] Any data-testid or role attribute
- [ ] How to identify it's the wallet modal

---

#### MetaMask Option
- **Location**: Inside wallet modal
- **What to find**: The MetaMask wallet option button/card
- **Current selector attempts**:
  - `button:has-text("MetaMask")`
  - `[data-testid*="wallet-option"]`
  - `[data-testid*="metamask"]`

**Please provide**:
- [ ] MetaMask button selector
- [ ] Text content
- [ ] Any unique attributes

---

#### Phantom Option
- **Location**: Inside wallet modal
- **What to find**: The Phantom wallet option button/card
- **Current selector attempts**:
  - `button:has-text("Phantom")`
  - `[data-testid*="phantom"]`

**Please provide**:
- [ ] Phantom button selector
- [ ] Text content
- [ ] Any unique attributes

---

#### Ethereum Selection (within wallet)
- **Location**: After selecting a wallet, choose network
- **What to find**: Ethereum network option
- **Current selector attempts**:
  - `button:has-text("Ethereum")`
  - `[data-testid*="ethereum"]`
  - `[data-testid*="eth"]`

**Please provide**:
- [ ] Ethereum selector
- [ ] Where it appears (in modal? dropdown?)
- [ ] Text or attributes

---

#### Solana Selection (within wallet)
- **Location**: After selecting a wallet, choose network
- **What to find**: Solana network option
- **Current selector attempts**:
  - `button:has-text("Solana")`
  - `[data-testid*="solana"]`
  - `[data-testid*="sol"]`

**Please provide**:
- [ ] Solana selector
- [ ] Where it appears (in modal? dropdown?)
- [ ] Text or attributes

---

### 2. Navigation Tabs

#### Tab Container
- **Location**: Header/navbar area
- **What to find**: Container holding Swap, Bridge, History tabs

**Please provide**:
- [ ] Tab container selector
- [ ] How tabs are structured (buttons? links? divs?)

---

#### Swap Tab
- **Location**: In navigation/header
- **Current selector attempts**:
  - `[data-testid="navbar-swap"]`
  - `button:has-text("Swap")`
  - `a:has-text("Swap")`

**Please provide**:
- [ ] Swap tab selector
- [ ] How to identify active state
- [ ] Text content

---

#### Bridge Tab
- **Location**: In navigation/header
- **Current selector attempts**:
  - `[data-testid="navbar-bridge"]`
  - `button:has-text("Bridge")`
  - `a:has-text("Bridge")`

**Please provide**:
- [ ] Bridge tab selector
- [ ] How to identify active state
- [ ] Text content

---

#### History Tab (if exists)
- **Location**: In navigation/header
- **Current selector attempts**:
  - `[data-testid="navbar-history"]`
  - `button:has-text("History")`
  - `a:has-text("History")`

**Please provide**:
- [ ] History tab selector (or confirm it doesn't exist)
- [ ] How to identify active state

---

### 3. Menu Navigation

#### Menu Button (Burger Icon)
- **Location**: Usually top-right or header
- **Current selector attempts**:
  - `[data-testid="menu-button"]`
  - `[data-testid="navbar-menu"]`
  - `button[aria-label*="menu" i]`
  - `svg[data-testid="menu-icon"]`

**Please provide**:
- [ ] Menu button selector
- [ ] Icon type (hamburger? three dots? gear?)
- [ ] Location on page

---

#### Learn Link
- **Location**: Inside menu drawer/modal
- **Current selector attempts**:
  - `a:has-text("Learn")`
  - `[data-testid="menu-learn"]`
  - `a[href*="learn"]`
  - `a[href*="docs"]`

**Please provide**:
- [ ] Learn link selector
- [ ] Text content
- [ ] URL pattern (does it navigate to /learn? /docs?)

---

#### Discord Link
- **Location**: Inside menu drawer/modal
- **Current selector attempts**:
  - `a:has-text("Discord")`
  - `[data-testid="menu-discord"]`
  - `a[href*="discord"]`

**Please provide**:
- [ ] Discord link selector
- [ ] Text content
- [ ] Does it open in new tab? Same tab?
- [ ] URL pattern

---

## How to Fill This Out

1. **Open Jumper Exchange**: https://jumper.exchange
2. **Use Playwright Codegen**:
   ```bash
   npm run codegen
   ```
3. **Interact with elements** and copy the selectors that codegen generates
4. **Or use Browser DevTools**:
   - Right-click element → Inspect
   - Look for `data-testid`, `id`, `class`, or other unique attributes
   - Copy the selector

5. **Fill in the selectors above** and we'll update the page objects

---

## Quick Test Script

After collecting selectors, we can test them with:

```bash
npx playwright test --headed --debug
```

This lets you see the browser and step through tests to verify selectors work.

