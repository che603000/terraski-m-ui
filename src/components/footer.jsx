import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {List, HourglassEmpty, LocationOn} from '@material-ui/icons';


const styles = theme => ({
    root: {
        position: 'static',
        bottom: 0,
        display: 'flex',
        'justify-content': 'center'
    },
});

@withStyles(styles, {withTheme:true})
class Footer extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, theme} = this.props;
        const {value} = this.state;


        return (
            <BottomNavigation
                className={classes.root}
                value={value}
                onChange={this.handleChange}
                showLabels
            >
                <BottomNavigationAction label="Задачи" icon={<List/>}/>
                <BottomNavigationAction label="Мониторинг" icon={<HourglassEmpty/>}/>
                <BottomNavigationAction label="События" icon={<LocationOn/>}/>
            </BottomNavigation>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);