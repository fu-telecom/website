# website
A public website for Fuck You Telecom related stuff.

## Development

### Local web server

To run a web server locally, so you can serve the pages over HTTP, which enables the script to run, open a terminal window and change to the 'website' directory, then run:

  `python -m http.server 8080`

Then you should be able to access the website files at [http://localhost:8080/sign-up.html](http://localhost:8080/sign-up.html)

### HTML debug mode

Adding '?debug' to the URL will show all elements, to make it easier to alter the content/appearance of those elements during development: [http://localhost:8080/sign-up.html?debug](http://localhost:8080/sign-up.html?debug)

### Local back-end API

If you want to run and test the backend API locally, once you have [https://github.com/fu-telecom/phone-number-manager](this repo) running locally, edit config.js to point to the 'localhost' address instead. __NOTE: do NOT commit this change to config.js or it will break the live site!__
