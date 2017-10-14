## Installation and Usage

```bash
$ npm install samson.js
```

### CommonJS or ES6
```js
var Samson = require('samson.js');
var SamsonAppConfig = require('./config');
/*          or          */
import Samson from 'samson.js';
import { SamsonAppConfig } from './config';

Samson.createApp(SamsonAppConfig, function() {

  App.log("Prepare to launch");

  App.launch();

});
```
