import React, { Component } from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';

import { Switch, BrowserRouter, Route } from "react-router-dom";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";

import Header from './components/Header';
import FrontPage from "./components/pages/FrontPage";
import BookMeeting from "./components/pages/BookMeeting";
import "./App.scss";
import MyMeetings from "./components/pages/MyMeetings";

const store = compose(
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(reducers);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="container">
              <Header />
              <Switch>
                <Route exact path="/" component={FrontPage} />
                <Route exact path="/posts/:type" component={FrontPage} />
                <Route exact path="/book-meeting" component={BookMeeting} />
                <Route exact path="/my-meetings" component={MyMeetings} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
