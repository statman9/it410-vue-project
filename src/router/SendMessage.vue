<template>
    <div id="app" :class="{ loaded: loaded }">
        <form v-if="isCoach" method="POST" action="/api/users/create/message">
            <p style="display: none;">From: <input type="text" v-model="fullname" name="from" class="form-control" />
            <p>Position: <select v-model="position" name="position">
                <option v-if="user.usertype === 'headcoach'" v-for="pos in positions" :value="pos.Value" :key="pos.Name" class="form-control">
                    {{pos.Name}}
                </option>
                <option v-for="pos in positions" v-else-if="isOCoordinator && (pos.offense === true || pos.Name === 'Offense')" :value="pos.Value" :key="pos.Name" class="form-control">
                    {{pos.Name}}
                </option>
                <option v-for="pos in positions" v-else-if="isDCoordinator && (pos.defense === true || pos.Name === 'Defense')" :value="pos.Value" :key="pos.Name" class="form-control">
                    {{pos.Name}}
                </option>    
            </select></p>
            <p>Subject: <input type="text" v-model="subject" name="subject" class="form-control" /></p>
            <p>Message: <textarea name="message" v-model="message" class="form-control"></textarea>
            <p><input type="submit" value="Send" class="btn btn-primary"></p>
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
                position: null,
                subject: null,
                message: null,
                fullname: null,
                isOCoordinator: null,
                isDCoordinator: null,
                isCoach: null,
                positions: [
                    {
                        "Name": "Coaches",
                        "Value": "coaches"
                    },{
                        "Name": "Team",
                        "Value": "team"
                    },{
                        "Name": "Offense",
                        "Value": "offense"
                    },{
                        "Name": "Defense",
                        "Value": "defense"
                    },{
                        "Name": "Special Teams",
                        "Value": "specialteams"
                    },{
                        "Name": "Quarterback",
                        "Value": "QB",
                        "offense": true
                    },{
                        "Name": "Running Back",
                        "Value": "RB",
                        "offense": true
                    },{
                        "Name": "Wide Receiver",
                        "Value": "WR",
                        "offense": true
                    },{
                        "Name": "Tight End",
                        "Value": "TE",
                        "offense": true
                    },{
                        "Name": "Offensive Lineman",
                        "Value": "OL",
                        "offense": true
                    },{
                        "Name": "Defensive Lineman",
                        "Value": "DL",
                        "defense": true
                    },{
                        "Name": "Linebacker",
                        "Value": "LB",
                        "defense": true
                    },{
                        "Name": "Defensive Back",
                        "Value": "DB",
                        "defense": true
                    },{
                        "Name": "Kicker",
                        "Value": "K",
                        "specialteams": true
                    },{
                        "Name": "Punter",
                        "Value": "P",
                        "specialteams": true
                    },{
                        "Name": "Long Snapper",
                        "Value": "LS",
                        "specialteams": true
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
                        this.fullname = data.user.firstname + " " + data.user.lastname;
                        this.isCoach = data.user.usertype.includes('coach') || data.user.usertype.includes('coordinator');
                        this.isOCoordinator = data.user.usertype === 'offensivecoordinator';
                        this.isDCoordinator = data.user.usertype === 'defensivecoordinator';
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

</style>