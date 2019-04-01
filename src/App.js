import React from 'react'

import Navbar from './Components/Navbar'
import Intro from './Sections/Intro'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'

const App = () => {
    return (
        <div>
            <Navbar />
            <Intro />
            <WhyMe />
            <Resume />
            <Projects />
        </div>
    )
}

export default App;
