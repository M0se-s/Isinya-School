# Isinya School Management System 

## Project Structure

```
Isinya School/
├── index.html                 # Main entry point (redirects to dashboard)
├── styles.css                 # Global styles
├── script.js                  # Legacy script (kept for reference)
│
├── components/                # Reusable UI components
│   ├── head.html             # Common <head> section
│   ├── sidebar.html          # Navigation sidebar
│   ├── header.html           # Page header with search
│   └── modals.html           # All modal dialogs
│
├── pages/                     # Individual page files
│   ├── dashboard.html        # Dashboard overview
│   ├── fee-management.html   # Fee management system
│   ├── student-records.html  # Student records
│   └── reports.html          # Analytics and reports
│
└── assets/
    └── js/                    # Modular JavaScript files
        ├── loader.js          # Component loader utility
        ├── navigation.js      # Sidebar navigation logic
        ├── modals.js          # Modal state management
        └── charts.js          # Chart.js initializations
```

## Key Improvements

### 1. **Modular Architecture**

- Separated concerns into dedicated files
- Reusable components reduce code duplication
- Easier to maintain and update

### 2. **Component-Based Design**

- `components/` folder contains reusable HTML snippets
- Each component can be independently updated
- Components are loaded dynamically via JavaScript

### 3. **Individual Pages**

- Each screen is now a separate HTML file
- Cleaner URLs: `/pages/dashboard.html`, `/pages/fee-management.html`
- Better for SEO and bookmarking

### 4. **Modular JavaScript**

- `loader.js` - Handles component loading
- `navigation.js` - Manages sidebar active states
- `modals.js` - Modal open/close functionality
- `charts.js` - Chart.js initialization for all pages

## How to Use

### Starting the Application

1. Open `index.html` in your browser, or
2. Navigate directly to any page: `pages/dashboard.html`

### Adding a New Page

1. Create a new HTML file in `pages/` directory
2. Copy the structure from `dashboard.html`
3. Update the content section
4. Add a new link in `components/sidebar.html`

### Adding a New Component

1. Create a new HTML file in `components/`
2. Add it to the loader in `assets/js/loader.js`
3. Reference it with an ID in your page files

## 🔧 Development Notes

### Component Loading

Components are loaded asynchronously using the Fetch API. The `loader.js` file handles this:

```javascript
await loadComponent("sidebar-container", "../components/sidebar.html");
```

### Navigation

The navigation system automatically highlights the active page based on the current URL.

### Charts

Charts are initialized based on the current page:

- Dashboard → `initDashboardCharts()`
- Fee Management → `initFeeCharts()`
- Reports → `initReportsCharts()`

## Styling

All styles remain in the main `styles.css` file. Tailwind CSS is used via CDN for utility classes.

## Dependencies

- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Chart rendering
- **Ionicons** - Icon library
- **Lucide Icons** - Additional icons
- **Inter Font** - Typography

## Migration from Old Structure

The original `index.html` has been preserved as `index.html.bak`. The refactored version:

- Separates each screen into its own file
- Extracts reusable components
- Splits JavaScript into logical modules
- Maintains all original functionality

## Benefits

1. **Easier Maintenance** - Find and update code quickly
2. **Better Collaboration** - Multiple developers can work on different pages
3. **Improved Performance** - Load only what's needed
4. **Scalability** - Easy to add new features
5. **Code Reusability** - Components can be reused across pages

