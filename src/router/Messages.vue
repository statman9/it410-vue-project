<template>
    <div id="app" :class="{ loaded: loaded }">
        <form method="POST" action="/api/users">
            <p>Username: <input type="text" name="username" class="form-control" required></p>
            <p>Password: <input type="password" name="password" class="form-control" required></p>
            <p>First Name: <input type="text" name="firstname" class="form-control"></p>
            <p>Last Name: <input type="text" name="lastname" class="form-control"></p>
            <p>Permissions: <input type="text" name="usertype" class="form-control"></p>
            
            <p><input type="submit" class="btn btn-primary"></p>
        </form>
        <!--<h2 v-else>You are not authorized to access this page</h2>-->
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

</style>