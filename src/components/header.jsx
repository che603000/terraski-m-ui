import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';


import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Games} from '@material-ui/icons';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


const ToolButton = (item) => {
    const style = {
        marginLeft: -12,
        marginRight: 20,
    }
    const {icon: Icon, props} = item;
    return (
        <IconButton style={style} color="inherit"  {...props}>
            <Icon/>
        </IconButton>
    )
};


@withStyles(styles)
@inject('appTools')
@observer
class Header extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    render() {
        //console.log(this);
        const {classes, appTools} = this.props;

        const toolBar = appTools.map((item) => <ToolButton key={item.id} {...item}/>)

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Home 95
                        </Typography>
                        {toolBar}
                        <Button color="inherit">User</Button>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


export default Header;//withStyles(styles)(Header);