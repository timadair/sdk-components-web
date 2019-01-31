# @senzing/sdk-components-ng

## Overview
This project is for the senzing sdk web components. It provides web component versions built 
off of the components found in [@senzing/sdk-components-ng](https://github.com/Senzing/sdk-components-ng). The components themselves leverage the [rest-api-client-ng package](https://www.npmjs.com/package/@senzing/rest-api-client-ng) which itself is generated from the [OAS specification](https://github.com/Senzing/rest-api-proposal).

The idea is to provide a framework agnostic option of those same components. 

### Web Components
Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

For more information on the subject see the following sites:
* [WebComponents.org](https://www.webcomponents.org/introduction)
* [Web Components | MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
* [Building Components | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/web-components/)

## Installation
```terminal
npm install @senzing/sdk-components-web --save
```

Add the script tag to your html document like so:
```html
  <body> ...
    <script type="text/javascript" src="senzing-components-web.js"></script>
  </body>
</html>
```

And include the component tag in your document like so:
```html
<sz-search name="Guy To LookFor"
  email="GuysEmail@MAIL.COM"></sz-search>
```

## Scripting Components

All the components support all the same inputs and output as the [@senzing/sdk-components-ng](https://github.com/Senzing/sdk-components-ng) package. [See documentation](https://senzing.github.io/sdk-components-ng/)

The only major difference between the two packages is the dependency requirements and the way that eventing is handled outside of the components. The web components are accessible just like any other DOM elements.

To listen for the result of a the search box completed search for example you would add an 
event listener to the dom node ie:
```javascript
document.querySelector('sz-search').addEventListener('resultsChange', function(evt) {
  if(evt.detail){
    var searchResults = evt.detail;
    // check if results > 0
    if(searchResults > 0){
      console.log('SzAttributeSearchResult[]: ', searchResults);
    }
  }
});
```

To see a more complex example(a search box, with a results list, and a detail view) see the example.html file shipped with the npm package.

## Styling
There are some simple themes provided in the themes directory in the package itself. They can be included in the html document like so:
```html
<head>...
  <link rel="stylesheet" href="node_modules/@senzing/sdk-components-web/themes/drab.css">
</head>
```

### Customizing

There are some limitations when using web components. Because of the way that browsers treat the dom inside of the component tags themselves, the content inside a tag is not directly accesible. It means styling a sub element like so:
```css
sz-search-results sz-search-result-card { color: blue; }
```
will *_NOT_* work. 

The elements themselves were created with this limitation in mind and try to provide as many sensible [CSS Variables](https://senzing.github.io/sdk-components-ng/additional-documentation/themes/customizing.html) as makes sense. For more information on CSS Variables See [this article](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care) or [here](https://css-tricks.com/difference-between-types-of-css-variables/).

an example acheiving the same effect as above that _WILL WORK_ would be:
```css
body { 
  --sz-search-results-color: blue;
}
```

Another option is to bake the styles in to the components themselves. This is the extreme option, but skips over the issue entirely. The requirements for doing so are the same as building the sdk-components-ng package from source. The repo is [publicly avaiable](https://github.com/Senzing/sdk-components-ng), fork it and have yourself an afternoon. 


## Dependencies

### REST API Server
These components require the senzing [Senzing REST API Sever](https://github.com/Senzing/rest-api-server-java/) to function. Follow [the instructions](https://github.com/Senzing/rest-api-server-java/) to check out and build the [Senzing REST API Sever](https://github.com/Senzing/rest-api-server-java/) from source or download a pre-built. 


### Example Notes

You'll want to copy the example.html file to some place you can serve up with a webserver. By default the components are configured to access the REST API Server through a CORS request. To the best of my knowledge the components won't be able to send the appropriate Origin header when serving directly off of the file system. This is probably a good thing.

Besides, it's a super easy problem to solve.
```bash
npm install http-server
./node_modules/.bin/http-server node_modules/@senzing/sdk-components-web/example.html --cors
```
