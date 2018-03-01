import React, {Component} from 'react'

class Footer extends Component {    
    render(){
        return(
            <footer>
                <fieldset>
                    <legend>Contact Information</legend>
                    <a href="https://github.com/jaredryan"><i class="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/jared-m-ryan/"><i class="fa fa-linkedin"></i></a>
                    <a href="mailto:jryantennis@gmail.com?subject=Hi, Jared (from the Portfolio Website)"><i class="fa fa-envelope"></i></a>
                    <a href="https://www.facebook.com/jared.ryan.94"><i class="fa fa-facebook-square"></i></a>
                </fieldset>
            </footer>
        );
    }
}

export default Footer;
