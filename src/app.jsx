import React from 'react';
import {Provider} from 'mobx-react';
import {lightBaseTheme, MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {tasks} from './models';
import commands from './commands';

import Main from './components/main';
import Header from './components/header';
import Info from './components/info';
import TaskList from './components/task-list';
import TaskItem from './components/task-item';


const NoMatch = () => <div>Route not match...</div>

export default class App extends React.Component {
    render() {
        return (
            <Provider tasks={tasks} commands={commands}>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <Router>
                        <div>
                            <Route component={Header}/>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/info" component={Info}/>
                                <Route exact path="/tasks" component={TaskList}/>
                                <Route exact path="/tasks/:id" component={TaskItem}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}