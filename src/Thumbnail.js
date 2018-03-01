import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Thumbnail extends Component {
    render(){
        return(
            <div className="thumbnail" id={this.props.id}>
                <Link to={this.props.path}>
                    <div className="thumbnailImg"></div>
                    <h3>{this.props.name}</h3>
                    <h5>{this.props.description}</h5>
                </Link>
            </div>
        );
    }
}

export default Thumbnail;
