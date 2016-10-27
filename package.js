Package.describe({
  name: '3stack:react-savoury',
  version: '0.0.2',
  summary: 'Reactively show the user the status of their method call.',
  git: 'https://github.com/3stack-software/meteor-react-savoury',
  documentation: 'README.md'
});

Package.onUse(function(api){
  api.versionsFrom('METEOR@1.4');
  api.use([
    'meteor-base',
    'react@15.0.1'
  ]);
  api.export([
    'ReactSavoury',
    'ReactSavouryAlert'
  ], 'client');
  api.addFiles([
    'react-savoury.jsx'
  ], 'client');
});
