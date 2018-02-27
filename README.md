**bio.tools Sum** is a client-side web application for rendering views and reports of tool descriptions from the [ELIXIR Tools & Data Services Registry](https://bio.tools), for use on local websites.  For an example see https://biotools-sum.firebaseapp.com/.

For running this project, you need to install [node package manager](https://www.npmjs.com/get-npm).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)

- [Deployment](#deployment)
  - [Building for Relative Paths](#building-for-relative-paths)

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](#deployment) for more information.


## Deployment

`npm run build` creates a `build` directory with a production build of this app. Build itself has a single
HTML file `index.html`, a JavaScript file `config.js` and a folder called static that contains three other
folders – `css`, `js` and `media`. Folder `js` contains one minified JavaScript file that contains whole
application. Folder `css` contains one minified CSS file that contains all styles used in application.
Folder `media` contains all images used inside application. File `index.html` is an entry point of the
application as it contains links to minified JavaScript and CSS files, and a configuration file
`config.js`. You always must have an entry point for these files, but it has not to be `index.html`. It
could be any other HTML file of your choice, but the file must always refer to JavaScript and CSS
files in order for the application to work correctly. Set up your favourite HTTP server so that a
visitor to your site is served entry point HTML file (`index.html` by default), and requests to static
paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js`
file.

### Building for Relative Paths 

By default, this application produces a build assuming it is hosted at the server root.<br>
To override this, specify the `homepage` in the `package.json`, for example:

```js
  "homepage": "http://yourwebsite.com/relativepath",
```

and also specify the `basename` property in the `config` variable in the `/public/config.js` as the relative path:

```js
var config = {
  basename: '/relativepath',
  .
  .
  . 
}
```

You have to specify it in config, because this application is using the HTML5 [`pushState` history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries) under the hood as client-site routing.

This will let this application correctly infer the root path to use in the generated HTML file.


If you’re using [Apache](https://httpd.apache.org/), you need to create a `.htaccess` file. The whole JavaScript and CSS is loaded into a single HTML file (index.html). Because of HTML5 `pushState` history API, URL changes are manages internally but Apache doesn't know that. Instead of using this single HTML file (index.html) for all URLs, Apache is looking for files that correspond to URL. You should tell Apache that if it doesn't find corresponding file, it should fall back to the single HTML file (index.html).
The `.htaccess` file might look like this:

```
  RewriteEngine on
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
```
