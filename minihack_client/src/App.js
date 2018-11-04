import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import NewGame from './components/Game/NewGame';
import PlayGame from './components/Game/PlayGame';
import Header from './components/Header';

import './App.css';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Switch>
          <Route path='/game/:gameId' component={PlayGame} />
          <Route exact path='/' component={NewGame} />
        </Switch>
      </Container>
    );
  }
}

export default App;
