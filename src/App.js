import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Songs from './components/tracks/Songs';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SongProvider } from './contact';

function App() {
  return (
    <SongProvider>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route path='/songs/track/:id' component={Songs} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </SongProvider>
  );
}

export default App;
