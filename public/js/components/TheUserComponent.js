export default {
    name: 'TheUserComponent',
    props: ['user'],

    template: `

    <div @click="NavToHome" class="card rounded avatar">
    <div class="card-body text-center">
        <img :src='"images/" + user.avatar' class="rounded-circle img-fluid" alt="user avatar">
        <p>{{user.username}}</p>
    </div>
</div>
    `,

    methods: {
        NavToHome() {
            console.log(this.user);
            //emit an event that triggers the app to save this users data as the current user
            //this will save it top-level in main.js so that its accessable to the entire app
            this.$emit('setcurrentuser', this.user);

            // look at the users permission level and set a route based on the
            //if its less than 3, send them to the kids home page
            // else send them to the default home page

            let targetRoute = 'defaulthome';

            if (this.user.permissions <= 3) {
                targetRoute = "kidshome";
            }

            this.$router.push({name: targetRoute});

        }
    }
}