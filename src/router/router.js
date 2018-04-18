'use strict';
import Home from './Home'
import AddUser from './AddUser'
import Login from './Login'
import SendMessage from './SendMessage'
import Messages from './Messages'
import DepthChart from './DepthChart'
import EditUser from './EditUser'
import ViewPlayers from './ViewPlayers'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/addUser', component: AddUser },
        { path: '/SendMessage', component: SendMessage },
        { path: '/Messages', component: Messages },
        { path: '/DepthChart', component: DepthChart },
        { path: '/ViewPlayers', component: ViewPlayers },
        { path: '/:username', component: EditUser, props: true },
        { path: '/Dashboard', redirect: '/' },
    ]
});