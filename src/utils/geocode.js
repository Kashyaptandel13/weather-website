const request = require('request')

const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoia2FzaHlhcDEiLCJhIjoiY2w4NW4wOGlvMDR3NTNubWgydWQ5bDgyNCJ9.8uItSAHtBDIUXP8gRhzdNg'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect with location service!',undefined)
        }else if(body.features[0]==null){
            callback('location not found',undefined);
        }else{
            const result= body.features[0];
       
        callback(undefined,{
            latitude: result.center[1],
            longitud: result.center[0],
            location: result.place_name
        })
        }
    })

}

module.exports=geocode