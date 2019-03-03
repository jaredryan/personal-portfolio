import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Thumbnail extends Component {
    render(){
        console.log(this.props.imgURL);
        // const imageUrl = require(this.props.imgUrl)
        return(
            <div className="thumbnail" id={this.props.name}>
                <Link to={this.props.path}>
                    <div className="thumbnailImg">
                        <img src={this.props.imgURL} id={this.props.name} alt=""/>
                        <div className="thumbnailOverlay"></div>
                    </div>
                    <h3>{this.props.name}</h3>
                    <h5>{this.props.description}</h5>
                </Link>
            </div>
        );
    }
}

export default Thumbnail;
