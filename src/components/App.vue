<template>
    <div id="app" :class="{ loaded: loaded }">
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="/">Home</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li v-if="!user"><a href="/login">Login</a></li>
                            <li v-else class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}} <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Dashboard</a></li>
                                    <li><a href="#">Edit Profile</a></li>
                                    <li><a href="#">Messages</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">Video</a></li>
                                    <li><a @click="logout()">Log Out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <!-- this content is route based -->
        <div id="content-area">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    const bootstrap = require('bootstrap');
    import 'bootstrap/dist/css/bootstrap.css';

    export default {
        data: function() {
            this.getInitData();
            return {
                loaded: false,
                friends: [],
                user: null
            }   
        },
        methods: {
            getInitData: function () {
                fetch('/api/init', { credentials: 'same-origin' })
                    .then(response => response.json())
                    .then(data => {
                        this.friends = data.friends;
                        this.user = data.user;
                        this.loaded = true;
                    });
            },
            logout: function() {
                window.location = '/api/users/logout';
            }
        }
    }
</script>

<style scoped>
    #app {
        opacity: 0;
        transition: opacity 300ms ease-out;
    }
    #app.loaded {
        opacity: 1;
    }
</style>