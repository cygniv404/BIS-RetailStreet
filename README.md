# RetailStreets - Data Access Portal  [Live Version](https://retailstreet.herokuapp.com/) 
> Search Retail Businesses in more than 500 Shopping Centers & 1000 Shopping Streets in Germany.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
NPM version|https://badge.fury.io/{{programming_language:js\|py}}/{{BIS}}.svg|http://badge.fury.io/{{programming_language:js\|py}}/{{BIS}}
[![react version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

[React](https://reactjs.org/) Single-Page app for instant searching and filtering through JSON files.
This website is a part of [the Business Information System Software](https://github.com/cygniv404/BIS-software).
For more information on the Project: You can find [the Documentation](https://www.web-profashion.de/Validation%20and%20Analysis%20for%20Business%20Information%20System.pdf).

You can consult also the Business Information System software following this link.
## build chain

 - webpack (*with `hot reload` for smoother developement*)
 - babel 6+ (*client and server entirely written in ES6/ES2015*)

## front-end

 - ReactJS (ES6)
 - bootstrap
 - CSS3
 - JQuery

*source files in `client/` folder.*
## back-end

 - `NodeJS` (ES6) 
 - `ExpressJS`(* NodeJS server framework used *)

*source files in `/` folder*

## setup and launch

**1. Be sure to have previously installed on your machine:**

 - NodeJS 

**2. Then, just install all packages by:**

 ```bash
npm install
 ```

**3. launch application :**

```bash
npm run dev 
```


**4. Then in your browser go:**
 - `http://localhost:3000/`(*server in on port `5000`*)


## Build

- DEV build
```bash
npm run build
```

- Production buid (*ReactJS will be optimized: NODE_ENV=production*)
```bash
npm run prod
```
## Author

Ahmed Riahi – [@LinkedIn](https://www.linkedin.com/in/ahmed-riahi-24011b85/)
