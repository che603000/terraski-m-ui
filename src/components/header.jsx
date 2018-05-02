import React, {Component, PropTypes} from 'react';
import {AppBar, Paper} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class Header extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    render() {
        console.log(this);
        return (
            <AppBar
                title="Title"
                iconElementRight={<IconButton>
                    <FontIcon className="material-icons">settings</FontIcon>
                </IconButton>}
            />
        )
    }
}