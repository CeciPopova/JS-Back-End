const http = require('http');
const homeHtml = require('./views/home/index');
const siteCss = require('./content/styles/site');
const addBreedHtml = require('./views/addBreed');

cats = [
    {
        id: 1,
        name: 'Navcho',
        breed: 'Persian',
        description: 'Very cute cat'
    },
    {
        id: 2,
        name: 'Mishi',
        breed: 'Angora',
        description: 'Fluffy cat'
    },
    {
        id: 3,
        name: 'Garry',
        breed: 'Angora',
        description: 'Fat cat'
    }
];
const catTemplate = ` 
<li>
   <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" alt="Black Cat">
   <h3></h3>
   <p><span>Breed: </span>Bombay Cat</p>
   <p><span>Description: </span>Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.</p>
   <ul class="buttons">
     <li class="btn edit"><a href="">Change Info</a></li>
     <li class="btn delete"><a href="">New Home</a></li>
   </ul>
</li>`;

const server = http.createServer(async (req, res) => {
const url = req.url;
if (url == '/') {
    res.writeHead(200, {
                   //mime type
        'Content-Type': 'text/html'
    });
    res.write(homeHtml);
}else if (url == '/content/styles/site.css'){
    res.writeHead(200, {
        'Content-Type': 'text/css'
    });
    res.write(siteCss);
}else if (url == '/cats/add-breed'){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(addBreedHtml);
}

res.end();
});

server.listen(5000, () => console.log('Server is running on port 5000...'));