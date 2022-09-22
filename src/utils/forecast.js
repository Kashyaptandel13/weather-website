const request = require('request')

const forecast=(latitude,longitud,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=5b5fddb1fa9b49d6afccac2b16840e0f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitud);
    request({url,json:true},(error,{body})=>{
        const data= body;
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(data.error){
            callback(data.error.info,undefined)
        }else{
            callback(undefined,{
                current_time:data.current.observation_time,
                string:`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. There is a ${data.current.precip}% chance of rain`
            })
        }
    })
}

module.exports=forecast;