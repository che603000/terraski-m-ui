import {observable, action} from 'mobx';
import Task from './task';
import Tasks from './task-list';
import Fotter from './footter';

export const tasks = new Tasks();
export const footer = new Fotter();

