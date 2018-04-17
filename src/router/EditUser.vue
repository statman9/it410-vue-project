<template>
    <div id="app" :class="{ loaded: loaded }">
        <form v-el:playerForm @submit.prevent="getOtherData" method="PUT" :action="'/api/users/'+ player.username" v-if="user && (user.usertype === 'admin' || user.usertype === 'heacoach')">
            <p>Username: <input type="text" v-model="player.username" name="username" class="form-control" required></p>
            <p>Password: <input type="password" v-model="player.password" name="password" class="form-control" required></p>
            <p>First Name: <input type="text" v-model="player.firstname" name="firstname" class="form-control"></p>
            <p>Middle Name: <input type="text" v-model="player.middlename" name="middlename" class="form-control"></p>
            <p>Last Name: <input type="text" v-model="player.lastname" name="lastname" class="form-control"></p>
            <p>Phone Number: <input type="text" v-model="player.phonenumber" name="phonenumber" class="form-control"></p>
            <p>Email: <input type="text" v-model="player.email" name="email" class="form-control"></p>
            <p>Permissions: <select :value="player.usertype" v-model="usertype" name="usertype" class="form-control">
                <option v-for="permission in permissions" v-bind:key="permission.Name" :value="permission.Value">
                    {{permission.Name}}
                </option>    
            </select></p>
            <p v-if="usertype === 'player' || usertype === 'recruit'">Position: <select v-model="player.position" name="position" class="form-control">
                <option v-for="position in positions" v-bind:key="position.Name" :value="position.Value">
                    {{position.Name}}    
                </option>    
            </select></p>
            <p>Hometown: <input type="text" v-model="player.hometown" name="hometown" class="form-control"></p>
            <p>High School: <input type="text" v-model="player.highschool" name="highschool" class="form-control"></p>
            <p>College (if transfer): <input type="text" v-model="player.lastcollege" name="lastcollege" class="form-control"></p>
            <p>Height (in inches): <input type="text" v-model="player.height" name="height" class="form-control"></p>
            <p>Weight (in pounds): <input type="text" v-model="player.weight" name="weight" class="form-control"></p>
            <p v-if="usertype === 'player'">Current School Class: <input type="text" v-model="player.schoolclass" name="schoolclass" class="form-control"></p>
            <p v-if="usertype === 'player'">Expected Graduation Year: <input type="text" v-model="player.expectedgradyear" name="expectedgradyear" class="form-control"></p>
            <p v-if="usertype === 'recruit'">Expected High School Graduation: <input type="text" v-model="player.highschoolgradyear" name="highschoolgradyear" class="form-control"></p>
            <p><input type="submit" class="btn btn-success" value="Save"></p>
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
                player: null,
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
                        fetch('/api/users/'+this.$route.params.username)
                        .then(player => {
                            this.player = player;
                            this.loaded = true;
                        })
                    });
            },
            logout: function() {
                window.location = '/api/users/logout';
            },
            getOtherData: function() {
                this.$el.playerForm.messages = this.player.messages;
                this.$el.playerForm.depthChartPosition = this.player.depthChartPosition;
                this.$el.playerForm.submit();
            }
        }
    }
</script>

<style scoped>

</style>