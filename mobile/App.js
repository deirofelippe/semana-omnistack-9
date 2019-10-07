import React from 'react';
import { YellowBox } from 'react-native';
/*view é a div do html. 
text é texto, h1, h2, span.  */
// import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
  return <Routes />
}
