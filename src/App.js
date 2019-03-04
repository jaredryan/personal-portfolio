import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Resume from './Pages/Resume';

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
