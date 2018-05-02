import React, {Component} from 'react'
import {Paper} from 'material-ui';

export default class Panel extends Component {
    render() {
        const {children} = this.props;
        const style = {
            //margin: '14px',
            //padding: '4px;',
            //paddingTop: '24px;',
            width: '100%'
        }
        return (
            <div style={style}>
                {children}
            </div>
        )
    }
}