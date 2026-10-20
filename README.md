# Practical Exam: React Hooks Midterm Suite

## Completed Requirements

### 1. Smart Task Counter (`useState`)
- **Count and Target**: State variables initialized (`count = 0`, `target = 5`) and editable.
- **Controls**: Increment, Decrement (clamped at `0`), and Reset (resets count to `0`).
- **Plus Two**: Executes two sequential functional state updates (`setCount(prev => prev + 1)` twice).
- **Derived Status**: "Not started", "In progress", and "Target reached" computed without redundant state.
- **Boundary Handling**: Increment and plus-two buttons disabled when target is reached.

### 2. Live Search and Timer (`useEffect` and `useState`)
- **Delayed Search**: Debounced filtering over `USERS` starter data (simulated request delay with `setTimeout`).
- **Cancellation**: Previous search timeouts are cancelled using cleanup (`clearTimeout`) during rapid typing.
- **Session Timer**: 1-second interval timer updates elapsed seconds smoothly without closure capture bugs.
- **Unmount Cleanup**: `clearInterval` prevents duplicate running timers.
- **Document Title**: Dynamically synchronizes visible results and active timer in `document.title`.

### 3. Accessible Form Toolkit (`useRef` and `useState`)
- **Controlled Inputs**: Name, email, and password managed via React state.
- **DOM Refs**: Attached to the input elements for accessibility focus control.
- **Validation**: Enforces non-empty name, valid email structure via regex, and 8+ character password.
- **Focus Order**: First invalid field is automatically focused on submission (`name` -> `email` -> `password`).
- **Silent Email Tracking**: Tracks previous submitted email using `useRef` without triggering re-renders, displaying it upon the next successful submission.

### 4. Application Preferences (`useContext` and `useState`)
- **Context & Provider**: Centralized `PreferencesContext` and `PreferencesProvider`.
- **Shared State**: Theme (`light`/`dark`) and font size (`14px`, `16px`, `18px`).
- **Deep Tree Consumption**: `PreferencesPanel` (inside `Toolbar`) and `ArticlePreview` consume context without prop drilling through `Dashboard`.
- **Custom Hook Boundary**: `usePreferences()` validates presence inside provider and throws a descriptive error if accessed outside.

### 5. Product Explorer Performance Repair (`useMemo` and `useCallback`)
- **500 Generated Records**: Large dataset generated across multiple categories and prices.
- **useMemo**: Filters by search query and category, then sorts by price; recalculates only when inputs change.
- **useCallback**: Memoizes the selection callback to keep reference stable.
- **React.memo**: `ProductList` wrapped with `React.memo`, preventing re-renders when parent's unrelated counter increments.
- **Console Log Evidence**: Log inside `ProductList` confirms zero unnecessary child renders.

### 6. Issue Tracker State Engine (`useReducer` and Custom Hooks)
- **State Shape**: `{ issues: [], filter: 'all', nextId: 1 }`.
- **Actions**: `ADD_ISSUE`, `TOGGLE_ISSUE`, `DELETE_ISSUE`, `SET_FILTER`, `CLEAR_DONE`.
- **Pure & Immutable**: All state and nested issue mutations replaced with immutable spreads.
- **Default Preservation**: Reducer returns current state for unknown actions.
- **Custom Hook**: `usePersistentReducer` handles hydration and sync with `localStorage`.
- **Self-Tests**: Built-in automated tests validating add, toggle, and clear-done actions.

---

## Known Limitations
- Local storage persistence in Exam 6 relies on the browser's `localStorage` quota and requires browser storage permissions.
- In Exam 5, simulated item generation is client-side and capped at 500 records.

---

## How to Run & Test Steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the displayed local URL (e.g. `http://localhost:5173`) in your browser.
4. Navigate between tabs:
   - **Exam 1**: Test Count 0 -> Decrement (should not go below 0). Target 5 -> click +2 -> verify increment by 2. When count reaches target, increment buttons disable.
   - **Exam 2**: Type quickly into the search box; verify debouncing and watch the browser tab title synchronize.
   - **Exam 3**: Click Submit with empty fields; verify focus lands on Name, then Email, then Password. Submit successfully twice to see previous email display.
   - **Exam 4**: Toggle theme and change font sizes (14px, 16px, 18px); verify preview changes immediately with no intermediate prop drilling.
   - **Exam 5**: Open browser console (`F12`), click "+1 Parent Render"; verify child does not re-render. Filter items and verify list updates.
   - **Exam 6**: Add issues, toggle checkmarks, switch between All/Open/Done tabs, and click "Run Reducer Tests" to view test assertions.

---

## Demonstration Bug & Solution (Exam Question 5)
- **Bug Encountered**: In Exam 1, the starter code attempted to add two with:
  ```js
  const addTwo = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  ```
  This only incremented the counter by 1 instead of 2.
- **Root Cause**: Both `setCount` calls closed over the same snapshot of `count` from the current render. React batched the updates, causing the second call to overwrite the first with the identical target value.
- **Fix Applied**: Used updater functions `setCount(prev => prev + 1)` which are queued and operate on the latest state in the queue:
  ```js
  const handleAddTwo = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  ```
