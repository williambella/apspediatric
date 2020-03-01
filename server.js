const express = require('express');
const path = require('path');
const app = express();

const angular = require('./angular.json');

app.use(express.static(`${__dirname}/${angular.projects.apspediatric.architect.build.options.outputPath}`));

app.get('/*', (req, res)  => {
  res.sendFile(path.join(`${__dirname}/${angular.projects.apspediatric.architect.build.options.outputPath}/index.html`));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
