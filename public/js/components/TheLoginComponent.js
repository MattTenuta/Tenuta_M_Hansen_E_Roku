export default {
    name: 'TheLoginComponent',

    template: `
    <section class="container">
        <div class="jumbotron">
        <img src="images/roku.svg" alt="Roku logo" width="300" class="botPad">
        </div>

        <section class="log-in">
        <div class="pad">
            <h3>Email</h3>
            <label class="sr-only" for="inlineFormInputName">Name</label>
            <input ref="username" v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>
        </div>

        <div class="pad">
            <label class="sr-only" for="inlineFormPassword">Name</label>
            <h3>Password</h3>
            <input ref="password" v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
        </div>
        </section>

        <button
            @click="tryLogIn"
            type="submit" 
            class="btn btn-primary login-submit"
        >Go!
        </button>

        <button v-if="signup"
            @click="trySignUp"
            type="submit" 
            class="btn btn-primary login-submit"
        >Sign Up!
        </button>
  </section>`,

  data() {
    return {
        username: '',
        password: '',
        signup: false
    }
  },

  methods: {
    trySignIn() {

    },
    tryLogIn() {
        //debugger;
        // sanatize out inputs, make sure they are not empty etc
        if (this.username.trim().length == 0) {
            console.log('username input is empty'); 
            this.$refs['username'].classList.add('field-error');
            return; //exits the login function
        }

        if (this.password.trim().length == 0) {
            console.log('password input is empty');
            this.$refs['password'].classList.add('field-error'); 
            return;
        }
        // end input validation
        this.$refs['username'].classList.remove('field-error'); 
        this.$refs['password'].classList.remove('field-error'); 

        let userData = {
            username: this.username,
            password: this.password
        }

        fetch('/ums/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json()) 
            .then(data => {
                console.log(data);
                // check for no user and then present a sign up control
                if (data.message == "no user") {
                    this.signup = true;
                }
                //check for broken password
                if (data.message == "wrong password") {
                    this.$refs['password'].classList.add('field-error');
                    // this.$refs['password'].placeholder = "wrong password";
                }
                //if there is a user in the data object, that measn we logged in successfully
                if (data.user) {
                    // store the user in localStorage
                    // let the app know this user is valid and can have access to everything
                    this.$emit('setauthenticated');
                    window.localStorage.setItem('user', JSON.stringify(data.user));

                    //send the user to the all users page
                    this.$router.push({name: 'allusers'});
                }
            })
        .catch(error => console.error(error));
    }
  }

}