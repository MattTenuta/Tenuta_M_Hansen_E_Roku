export default {
    name: 'TheMediaComponent',

    props: ['media'],

    template: `

    <div @click="NavToHome" class="card avatar">
    <div class="card-body text-center">
        <img :src='"images/" + user.avatar' class="rounded-circle img-fluid" alt="user avatar">
        <p class="username">{{user.username}}</p>
    </div>
</div>
    `,

    methods: {
        
    }
}