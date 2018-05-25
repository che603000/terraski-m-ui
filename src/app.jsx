import React from 'react';
import {Provider} from 'mobx-react';
import {lightBaseTheme, MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {tasks, message, appTools} from './models';
import commands from './commands';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Message from './components/message';
import Info from './components/info';
import TaskList from './components/task-list';
import TaskItem from './components/task-item';
import CssBaseline from '@material-ui/core/CssBaseline';
import {CMD_TASK_LIST} from "./const";

import AddIcon from '@material-ui/icons/Add';



const NoMatch = () => <div>Route not match...</div>

export default class App extends React.Component {
    render() {
        return (
            <div>
                <CssBaseline/>
                <Provider tasks={tasks} message={message} appTools={appTools} commands={commands}>
                    {/*<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>*/}
                    <Router>
                        <div>
                            <Route component={Header}/>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/info" component={Info}/>
                                <Route exact path="/tasks" component={TaskList}/>
                                <Route exact path="/task" component={TaskItem}/>
                                <Route exact path="/task/:id" component={TaskItem}/>
                                <Route component={NoMatch}/>
                            </Switch>
                            <Route component={Message}/>
                            <Route component={Footer}/>
                        </div>
                    </Router>
                    {/*</MuiThemeProvider>*/}
                </Provider>
            </div>
        );
    }
}