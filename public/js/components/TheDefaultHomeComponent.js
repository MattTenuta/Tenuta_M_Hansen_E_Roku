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

    

    <section class="pad"> <!-- this section is for subgenre 1 --> 
    <h2 class="hidden"> This Section is for subgenre </h2>
    <div v-for="item in movieData" :key="item.id" :item="item" class="card avatar">
        <div class="card-body text-center">
            <h1> {{item.title}} </h1>
            <img class="movieImage" :src="item.image" alt="Movie Image">
            <p>{{item.description}}</p>
        </div>
    </div>
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
            movieData: []
        }
    },
    created() {
        // fetch the appropriate video data from the imdb api
        //and load it into your view -> watch video


        // The way this works is unbelieveably dumb

        // Put all of the individual json files into an array called requested data
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

        

        // Then we make a variable and map each of the items inside requested data to it to break it up into pieces.
        const fetchPromises = requestedData.map(requestedData => fetch(requestedData).then(response => response.json()));

        // Then we use this promise.all to load then all in parallel.
        Promise.all(fetchPromises)
        .then(jsonArray => {
            // Here's where it gets complicated. The actual data is nested within two or three levels of arrays. We need to unpack that. But we need a solution where we can map just the individual movies to an array. The issue is the keys are dynamic, so I'm not going to count 1,2,3 to get the data. There has to be a way to select the array within the array, and then select the array within that. This would honestly be so much easier with Lumen.
            const arrayLevelData = jsonArray;
            const movieData = [];
            
            arrayLevelData.map((item) => {

                const objectLevelData = item;

                const realdata = Object.values(objectLevelData);
                
                // Looks like we have all the actual data now
                // But this will be overwritten by the next file, so we need to store it somewhere
                const superRealData = realdata[1];

                // The AI told me to write this
                movieData.push(...superRealData);
            });

            this.movieData = movieData;
            
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