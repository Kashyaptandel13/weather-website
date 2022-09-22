const path = require("path")
const express = require("express");
const hbs = require("hbs")


const app = express();
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlers engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'kashyap'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT',
        name:'kashyap'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        name:'kashyap'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
      return  res.send ({
            error:'must provide address'
        })
    }

        geocode(req.query.address,(error,{latitude,longitud,location}={})=>{
            if(error){
                return  res.send ({
                    error
                }) ;
            }
           
            forecast(latitude, longitud, (error, forecastdata) => {
                const{current_time,string}=forecastdata
                if(error){
                    return  res.send ({
                        error
                    }) ;
                }
                res.send({
                    forcast:string,
                    location:location,
                    address:req.query.address,
                    Observation_Time:current_time
                });
                console.log('Data ' ,location);
                console.log('Observation_Time', current_time);
                console.log('Data', string)
              })
        })
        
    
    
        
    
    
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        msg:'Help article not found'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search tearm '
        })
    }
    res.send({
        products:[]
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        msg:'MY 404'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
  console.log(`server is on port ${port}.`);
});
