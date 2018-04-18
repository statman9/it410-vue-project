<template>
    <div id="app" :class="{ loaded: loaded }">
        <button v-if="isAdminOrCoach" class="btn btn-lg btn-success" @click="addplayer()">Add Player</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>School Year</th>
                    <th>Position</th>
                    <th v-if="isAdminOrCoach"></th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" :key="player.username">
                    <td>{{player.firstname}}</td>
                    <td>{{player.lastname}}</td>
                    <td>{{player.schoolyear}}</td>
                    <td>{{player.position}}</td>
                    <td v-if="isAdminOrCoach">
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Options
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" :href="'/' + player.username">Edit</a>
                                <a class="dropdown-item" :href="'/DeleteUser/'+player.username">Another action</a>
                            </div>
                        </div>
                    </td>
                </tr>
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
                players: null,
                isAdminOrCoach: false
            }   
        },
        methods: {
            getInitData: function () {
                fetch('/api/init', { credentials: 'same-origin' })
                    .then(response => response.json())
                    .then(data => {
                        fetch('/api/users/players')
                            .then(response => response.json())
                            .then(players => {
                                this.friends = data.friends;
                                this.user = data.user;
                                if (data.user.usertype != 'player' && data.user.usertype != 'recruit' && data.user.usertype != 'alumni') {
                                    this.isAdminOrCoach = true; 
                                }
                                this.players = players;
                                this.loaded = true;
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