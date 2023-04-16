export default {
    name: 'TheMediaComponent',

    props: ['selectedMovie'],

    template: `
    <div class="card avatar">
        <div class="card-body text-center">
            <h1> {{selectedMovie.title}} </h1>
            <img class="movieImage" :src="selectedMovie.image" alt="Movie Image">
            <p>{{selectedMovie.description}}</p>
        </div>
    </div>

    `,

    created(){
        debugger;
    },

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