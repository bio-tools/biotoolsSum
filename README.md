For running this project, you need to install [node package manager](https://www.npmjs.com/get-npm).

THIS IS README CREATED WITH BASIC TEMPLATE, IT DOES NOT CONTAIN ANY INFORMATION ABOUT THIS PROJECT YET.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)

- [Deployment](#deployment)
  - [Static Server](#static-server)
  - [Other Solutions](#other-solutions)
  - [Serving Apps with Client-Side Routing](#serving-apps-with-client-side-routing)
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
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.


## Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

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


If you’re using [Apache](https://httpd.apache.org/), you need to create a `.htaccess` file. The whole javascript and css is loaded into a single HTML file. Because of HTML5 `pushState` history API, URL changes are manages internally but Apache doesn't know that. Instead of using this single HTML file, Apache is looking for files on path that corresponds to URL. You should tell Apache that if it doesn't find corresponding file, it should fall back to the single HTML file.
The `.htaccess` file might look like this:

```
  RewriteEngine on
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
```
