import React from 'react';

const GlobalContext = React.createContext<{ url: string }>({ url: 'http://api-biwase.us-east-2.elasticbeanstalk.com/' });

export {GlobalContext};