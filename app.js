/* Dependencies
All of those dependencies need to be installed in the server directory
they then appear in the node_modules folder
via the command line 
npm install <dependency name>
along with node itself, found at nodejs.org
*/

//Functions to access the Yelp API
const yelp = require('yelp-fusion');

//LoDash functions library
const _ = require('lodash');

//const bootstrap = require('bootstrap');

//Routing engine
const express = require('express');

//Rendering and templating engine
const exphbs = require('express-handlebars');

//Engine to access info from POST requests
const bodyParser = require('body-parser');

//Engine for multiple paths 
const path = require('path');


//start server and handlebars middleware, start the body parser middleware
const app = express();
app.engine('handlebars', exphbs({ defaultLayout : 'main' }));
app.set('view engine','handlebars');
app.use(bodyParser.urlencoded({extended : false}));


const PORT = process.env.PORT || 3000; 
app.listen(PORT, console.log('server running'));

//default path when accessing the site
app.get('/', (req,res) =>  res.render('index'));


app.post('/', (req,res) => {

const API_KEY= '5crw8ji01-1DA8tZmPVzcGOOGnLsSZzBK13pp-j4sbnXjm8qhAISLGLUFm24d7fnWsm_CqUtzYuvfBNR7FM79DNs_hMFIq-AbIaqiy1r9_XQbnKtG6OjwyZR0StbXHYx'
const client = yelp.client(API_KEY); 

// pick the fields you want to pull from your data
const DESIRED_FIELDS = ['name', 'url', 'phone', 'location.city', "image_url"];

let { inputBox } = req.body;

    client.search({
      term: inputBox,
      location: 'Montreal, QC',
      limit : 5
    })
    .then(response => {
      const items = response.jsonBody.businesses.map(element => _.pick(element, DESIRED_FIELDS));
      var count = response.jsonBody.total;
      res.render('index',{items , count });
    })
    .catch(err => {
      // Failure
      console.log('Error with yelp API: ', err);
    });
  });
