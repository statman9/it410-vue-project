<template>
    <div>
        <h2>This is the dashboard</h2>
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
                        if (!this.user) {
                            window.location('/login');
                        }
                    });
            },
            logout: function() {
                window.location = '/api/users/logout';
            }
        }
    }
</script>

<style scoped>
    p {
        font-weight: bold;
        color: orange;
    }
</style>