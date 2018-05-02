import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Paper} from 'material-ui';

class Item extends Component {
    render() {
        const {title, url} = this.props;
        const style = {
            height: 100,
            width: 120,
            margin: 5,
            textAlign: 'center',
            display: 'inline-block',
            paddingTop: '40px',
            backgroundColor: '#f77'
        };
        return (
            <Link to={url}>
                <Paper style={style} zDepth={3} title={title}>
                    {title}
                </Paper>
            </Link>

        )
    }
}

export default class Main extends Component {

    render() {
        return (
            <div>
                <Item title={"Информация"} url={"/info"}/>
                <Item title={"Задачи"} url={"/tasks"}/>
                <Item title={"Логирование"} url={"/"}/>
            </div>
        )
    }
}