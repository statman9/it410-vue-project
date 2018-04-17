<template>
    <div id="app" :class="{ loaded: loaded }">
        <form method="POST" action="/api/users" v-if="user && (user.usertype === 'admin' || user.usertype === 'heacoach')">
            <p>Username: <input type="text" v-model="player.username" name="username" class="form-control" required></p>
            <p>Password: <input type="password" name="password" class="form-control" required></p>
            <p>First Name: <input type="text" name="firstname" class="form-control"></p>
            <p>Middle Name: <input type="text" name="middlename" class="form-control"></p>
            <p>Last Name: <input type="text" name="lastname" class="form-control"></p>
            <p>Phone Number: <input type="text" name="phonenumber" class="form-control"></p>
            <p>Email: <input type="text" name="email" class="form-control"></p>
            <p>Permissions: <select v-model="usertype" name="usertype" class="form-control">
                <option v-for="permission in permissions" v-bind:key="permission.Name" :value="permission.Value">
                    {{permission.Name}}
                </option>    
            </select></p>
            <p v-if="usertype === 'player' || usertype === 'recruit'">Position: <select name="position" class="form-control">
                <option v-for="position in positions" v-bind:key="position.Name" :value="position.Value">
                    {{position.Name}}    
                </option>    
            </select></p>
            <p>Hometown: <input type="text" name="hometown" class="form-control"></p>
            <p>High School: <input type="text" name="highschool" class="form-control"></p>
            <p>College (if transfer): <input type="text" name="lastcollege" class="form-control"></p>
            <p>Height (in inches): <input type="text" name="height" class="form-control"></p>
            <p>Weight (in pounds): <input type="text" name="weight" class="form-control"></p>
            <p v-if="usertype === 'player'">Current School Class: <input type="text" name="schoolclass" class="form-control"></p>
            <p v-if="usertype === 'player'">Expected Graduation Year: <input type="text" name="expectedgradyear" class="form-control"></p>
            <p v-if="usertype === 'recruit'">Expected High School Graduation: <input type="text" name="lastname" class="form-control"></p>
            <p><input type="submit" class="btn btn-success"></p>
        </form>
        <h2 v-else>You are not authorized to access this page</h2>
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
                userInfo: null,
                usertype: "",
                permissions: [
                    {
                        "Name": "Admin",
                        "Value": "admin"
                    },{
                        "Name": "Head Coach",
                        "Value": "headcoach"
                    },{
                        "Name": "Offensive Coordinator",
                        "Value": "offensivecoordinator"
                    },{
                        "Name": "Defensive Coordinator",
                        "Value": "defensivecoordinator"
                    },{
                        "Name": "Assistant Coach",
                        "Value": "assistantcoach"
                    },{
                        "Name": "Player",
                        "Value": "player"
                    },{
                        "Name": "Recruit",
                        "Value": "recruit"
                    }
                ],
                positions: [
                    {
                        "Name": "Quarterback",
                        "Value": "QB"
                    },{
                        "Name": "Running Back",
                        "Value": "RB"
                    },{
                        "Name": "Wide Receiver",
                        "Value": "WR"
                    },{
                        "Name": "Tight End",
                        "Value": "TE"
                    },{
                        "Name": "Offensive Lineman",
                        "Value": "OL"
                    },{
                        "Name": "Defensive Lineman",
                        "Value": "DL"
                    },{
                        "Name": "Linebacker",
                        "Value": "LB"
                    },{
                        "Name": "Defensive Back",
                        "Value": "DB"
                    },{
                        "Name": "Kicker",
                        "Value": "K"
                    },{
                        "Name": "Punter",
                        "Value": "P"
                    }
                ]
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
                fetch('/api/users/info/' + this.$r.params.username)
                    .then(res => res.json())
                    .then(players => {
                        this.players = players;
                    });
            },
            logout: function() {
                window.location = '/api/users/logout';
            }
        }
    }
</script>

<style scoped>

</style>