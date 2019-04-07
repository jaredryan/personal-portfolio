import React from 'react'

import Navbar from './Components/Navbar'
import Home from './Sections/Home'
import WhyMe from './Sections/WhyMe'
import Resume from './Sections/Resume'
import Projects from './Sections/Projects'
import Contact from './Sections/Contact'

const App = () => {
    const refs = {
        navbar: React.createRef(),
        home: React.createRef(),
        whyMe: React.createRef(),
        resume: React.createRef(),
        projects: React.createRef(),
        contact: React.createRef()
    }

    return (
        <div>
            <Navbar refs={refs}/>
            <Home refs={refs}/>
            <WhyMe refs={refs}/>
            <Resume refs={refs}/>
            <Projects refs={refs}/>
            <Contact refs={refs}/>
        </div>
    )
}

export default App;
