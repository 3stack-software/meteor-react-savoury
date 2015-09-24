Package.describe({
  name: '3stack:react-savoury',
  version: '0.0.1',
  summary: '',
  git: 'https://github.com/3stack-software/meteor-react-savoury',
  documentation: 'README.md'
});

Package.onUse(function(api){
  api.versionsFrom('METEOR@1.2');
  api.use([
    'meteor-base',
    'react@0.1.13'
  ]);
  api.export([
    'ReactSavoury',
    'ReactSavouryAlert'
  ], 'client');
  api.addFiles([
    'react-savoury.jsx'
  ], 'client');
});
