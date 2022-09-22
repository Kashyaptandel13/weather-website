const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messageFour=document.querySelector('#message-4')
messageOne.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading...'
    const locatiion = search.value;
    fetch('/weather?address='+locatiion).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        messageOne.textContent=`forcast=${data.forcast}`
        messageTwo.textContent=`locatiion=${data.location}`
        messageThree.textContent=`address=${data.address}`
        messageFour.textContent=`Observation_Time=${data.Observation_Time}`
        // <p>${data.locatiion}</p>
        // <p>${data.address}</p>
        // <p>${Observation_Time}</p>`
    })
})
    console.log(locatiion);
    // result.appendChild(list)
})