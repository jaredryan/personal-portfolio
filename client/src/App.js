import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';

class App extends Component {

    componentDidUpdate() {
        window.scrollTo(0,0);
    }

  render() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/resume" component={Resume}/>
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default App;
