<template>
    <div id="app" :class="{ loaded: loaded }">
        <button v-if="user.usertype != 'player' && user.usertype != 'recruit' && user.usertype != 'alumni'" class="btn btn-lg btn-success" @click="addplayer()">Add Player</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>School Year</th>
                    <th>Position</th>
                    <th v-if="user.usertype != 'player' && user.usertype != 'recruit' && user.usertype != 'alumni'"></th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" v-bind:key="player.username">
                    <td>{{player.firstname}}</td>
                    <td>{{player.lastname}}</td>
                    <td>{{player.schoolyear}}</td>
                    <td>{{player.position}}</td>
                    <td v-if="user.usertype != 'player' && user.usertype != 'recruit' && user.usertype != 'alumni'">
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Options
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" :href="'/EditUser/' + player.username">Edit</a>
                                <a class="dropdown-item" :href="'/DeleteUser/'+player.username">Another action</a>
                            </div>
                        </div>
                    </td>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data: function() {
            this.getInitData();
            return {
                loaded: false,
                friends: [],
                user: null,
                players: null
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
                        fetch('/api/users/players')
                            .then(res => res.json())
                            .then(players => {
                                this.players = players;
                            });
                    });
            },
            logout: function() {
                window.location = '/api/users/logout';
            },
            addplayer: function() {
                window.location = '/AddUser'
            }
        }
    }
</script>

<style scoped>

</style>