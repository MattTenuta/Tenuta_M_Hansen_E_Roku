export default {
    name: 'TheDefaultHomeComponent',

    props: ['user'],

    template: `
    <main class="main">

    <div class="three-items2">
        <button class="Genrebutton">Movies</button>
        <button class="Genrebutton">TV</button>
        <button class="Genrebutton">Music</button>
    </div>

    <mediaTemplate v-for="item in mediaData" :key="item.id" :item="item" class="">

    </mediaTemplate>

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

    data() {
        return {
            mediaData: []
        }
    },
    created() {
        // fetch the appropriate video data from the imdb api
        //and load it into your view -> watch video

        const requestedData = [
            'js/API/60sTop1000.json',
            'js/API/70sTop1000.json',
            'js/API/80sTop1000.json',
            'js/API/90sTop1000.json',
            'js/API/60sTop1000Kids.json',
            'js/API/70sTop1000Kids.json',
            'js/API/80sTop1000Kids.json',
            'js/API/90sTop1000Kids.json',
        ];

        const fetchPromises = requestedData.map(requestedData => fetch(requestedData).then(response => response.json()));

        Promise.all(fetchPromises)
        .then(jsonArray => {
            this.mediaData = jsonArray;
            console.log(jsonArray);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

        // fetch(requestedData)
        //     .then(response => response.json())
        //     .then(data => {
        //     // console.log(databaseLocation);
        //     // Then we can make adData the data we pull from the database
        //     this.mediaData = data;
        //     })
        //     .catch(error => {
        //     console.log(error);
        //     });
    }
}