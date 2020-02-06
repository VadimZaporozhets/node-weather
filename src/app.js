const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define Paths for Express config
const templatesPath = path.join(__dirname, '../templates/views');
const publicAssetsPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicAssetsPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        author: 'MEEE'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'MEEEEE'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'SOMEBODY',
        title: 'About',
        author: 'MEEEe'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Adress wasn\'t provided'
        });
    }

    geocode(req.query.address, (error, {lat = 0, long = 0, location = ''} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(lat, long, (error, forecastData = {}) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMsg: 'Help article not found'
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});