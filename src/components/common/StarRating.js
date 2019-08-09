import React, {Component} from "react";
import FontAwesome from 'react-fontawesome'

export default class StarRating extends Component {
    render() {
        return (
            <div>{this.props.children} <Stars value={this.props.value}/></div>
        );
    }
}

class Stars extends Component {
    render() {
        const starStyle = {
            paddingLeft: 1, paddingRight: 1
        }
        const stars = []
        for (let i = 0; i < 5; i++) {
            stars.push(<FontAwesome key={i} style={starStyle} className='icons' name={i < this.props.value ? 'star' : 'star-o'}/>)
        }
        return (
            <span style={{whiteSpace: "nowrap"}}>
                {stars}
            </span>
        )
    }
}
