const ghpages = require('gh-pages'); // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line no-console
ghpages.publish('dist', (err) => console.log(err));
