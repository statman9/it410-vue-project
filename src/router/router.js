'use strict';
import Home from './Home'
import AddUser from './AddUser'
import Login from './Login'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/addUser', component: AddUser },

        { path: '*', redirect: '/' }
    ]
});