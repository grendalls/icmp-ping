import React from 'react';
import './App.css';
import Login from '../Login';
import Register from '../Register';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../Header';
import Container from 'react-bootstrap/Container';
import DeviceTable from '../DeviceTable';

const PageOne = () => {
  return <div>Page One</div>;
};

const PageTwo = () => {
  return <div>Page Two</div>;
};

function App() {
  return (
    <div className="App vh-100">
      <BrowserRouter>
        <Header />
        <Container>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/table" component={DeviceTable} />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
