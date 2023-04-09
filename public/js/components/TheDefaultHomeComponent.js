export default {
    name: 'TheDefaultHomeComponent',

    props: ['user'],

    template: `
    <main class="main">

    <div class="three-items">
        <h3>Movies</h3>
        <h3>TV</h3>
        <h3>Music</h3>
    </div>

    <section class="pad"> <!-- this section is for subgenre 1 --> 
    <h2> This Section is for subgenre </h2>
    </section>

    <section class="pad"> <!-- this section is for subgenre 2 --> 
    <h2> This Section is for subgenre </h2>
    </section>

    <section class="pad"> <!-- this section is for subgenre 3 -->
    <h2> This Section is for subgenre </h2> 
    </section>

    </main>
    `,

    created() {
        // fetch the appropriate video data from the imdb api
        //and load it into your view -> watch video
    }
}