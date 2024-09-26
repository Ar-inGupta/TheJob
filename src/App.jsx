import React from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import JobPost from './components/JobPost';
import JobSearch from './components/JobSearch';
import JobDetails from './components/JobDetails';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" component={JobSearch}>
        <Route path="/auth" component={Auth} />
        <Route path="/post-job" component={JobPost} />
        <Route path="/job/:id" component={JobDetails} />
        <Route path="/profile" component={Profile} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
