<template>
    <div id="app" :class="{ loaded: loaded }">
        <div class="list-group col-sm-3">
            <a v-for="message in user.message" :id="message.id" @click="messageRead(message.id)" :key="message.id" href="#" :class="'list-group-item list-group-item-action flex-column align-items-start ' + (message.read ? 'list-group-item-light' : 'list-group-item-dark')">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{message.from}}</h5>
                <small>{{message.timeSent}}</small>
                </div>
                <p class="mb-1">{{message.subject}}</p>
                <small>{{message.message.substr(0, 100)}}...</small>
            </a>
        </div>
        <div class="col-sm-9" v-if="messageContent">
            <div>{{messageContent}}</div>
        </div>
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
                messages: null,
                messageContent: null
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
            },
            messageRead(id) {
                fetch('/api/users/' + this.user.username + '/message/' + id)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        document.getElementById(id).classList.remove('list-group-item-dark');
                        document.getElementById(id).classList.add('list-group-item-light');
                        messageContent = this.messages.filter(m => m.id === id)[0].message;
                    }
                    else {
                        console.log("Error Occurred");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>