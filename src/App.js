import React from 'react'

import Navbar from './Components/Navbar'
import Intro from './Sections/Intro'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'
import Contact from './Sections/Contact'

const App = () => {
    return (
        <div>
            <Navbar />
            <Intro />
            <WhyMe />
            <Resume />
            <Projects />
            <Contact />
        </div>
    )
}

export default App;
