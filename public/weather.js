function setup(){
    let lat, lon;
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
        })
    }else {
        console.log('geolocation not available');
    }
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const data = {lat, lon};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        console.log(data);
        const response = await fetch('http://localhost:3000/api', options);
        const json = await response.json();
        console.log(json);
    })
}
setup();
