<template>
    <div id="app" :class="{ loaded: loaded }">
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item" v-if="!user">
                            <a class="nav-link" href="/login">Log In</a>
                        </li>
                        <li class="nav-item dropdown" v-else>
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{user.username}}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/Dashboard">Dashboard</a>
                                <a v-if="user.usertype === 'admin' || user.usertype === 'headcoach'" class="dropdown-item" href="/AddUser">Add User</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/api/users/logout">Log Out</a>
                            </div>
                        </li>
                    </ul>    
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
    import 'bootstrap';

    export default {
        data: function() {
            this.getInitData();
            return {
                loaded: false,
                friends: [],
                user: null,
                userInfo: null
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
    header {
        overflow: auto;
    }
</style>