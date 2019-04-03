import React from 'react'

import Navbar from './Components/Navbar'
import Home from './Sections/Home'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'
import Contact from './Sections/Contact'

const App = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <WhyMe />
            <Resume />
            <Projects />
            <Contact />
        </div>
    )
}

export default App;
