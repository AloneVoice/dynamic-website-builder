# Dynamic Website Builder

**A lightweight, flexible, and dynamic website building tool** that facilitates the rapid creation of websites. This project offers seamless transitions between pages, automated asset versioning, and dynamic content loading, making it an ideal solution for developers looking for a foundation for their custom websites.

## 🚀 Features

- **Dynamic Page Loading**: Uses AJAX and the History API to load content without full-page reloads, preserving a smooth user experience.
- **Seamless Transitions**: Unique *"blinds"* transition effect between pages, offering a modern and engaging visual.
- **Automatic Versioning**: Automatically appends version numbers to CSS and JS files based on the last modified date, ensuring users always load the latest versions without caching issues.
- **Meta Tag Management**: Dynamically updates page titles, descriptions, and keywords for better SEO support.
- **Responsive Design**: Includes separate stylesheets for mobile and desktop, ensuring a consistent user experience across devices.
- **Customizable Navigation**: Automatically generates menu links based on available pages, with the flexibility to define custom link names and order.
- **Extensible Structure**: Designed with expansion in mind, making it easy to add new features like custom scripts, stylesheets, and more.

## 🛠️ Getting Started

### Prerequisites

- A web server supporting PHP 7.4 or higher.
- Basic knowledge of JavaScript, PHP, and web development.

### Installation

1. **Clone the repository**:

```git clone https://github.com/yourusername/dynamic-website-builder.git cd dynamic-website-builder```


2. **Set up your server** to point to the `index.php` file (e.g., using Apache or Nginx).

3. **Upload the project files** to your web server.

4. **Customize `basePath` in `main.js`** to match your installation path:

``` const basePath = "/your/path/"; // Set this to match your site's root. ```


5. **Visit your site** in a browser, and enjoy smooth transitions and easy content management.

## 📄 Usage

- **Adding a New Page**:
- Create a new PHP file in the `/pages` directory.
- Define your page content inside the `.content` element.
- Update the title and meta tags within the file.
- The new page will be automatically picked up by the navigation menu.

- **Managing Styles and Scripts**:
- Add custom CSS or JS files to the `/css` or `/js` folders.
- `versions.php` will automatically detect and update the version based on the file modification date.

- **Google Analytics Integration**:
- Add your Google Analytics tracking code in the `index.php` file to track user interactions across dynamically loaded pages.

## 🎨 Customization

- Modify the **blinds effect** in `main.js` to adjust transition speed or create a different animation.
- Adjust styles in `mobile.css` and `desktop.css` to customize the look and feel of your site for different devices.
- Extend the `versions.php` logic to include more asset types or additional data if needed.

## 🔗 Demo

Check out the live demo: [devdraw.pl/template](https://devdraw.pl/template)

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository, make improvements, and submit a pull request.

## 🌟 Acknowledgments

- **Inspiration**: The project was inspired by the need for a quick, efficient solution for building dynamic websites without the overhead of large CMS systems.
