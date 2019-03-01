  const request = require('request');

const getFilm = () => {
    return new Promise((resolve, reject) => {
        request.get(`https://swapi.co/api/films/`, (err, response, body) => {
            const pelicula = JSON.parse(body)
            //console.log(response.statusCode == 200)
            response.statusCode == 200
                ? resolve(pelicula)
                : reject('Error en getName')
        });
    });
}


/*const getNameShip = urlShip => {
    return new Promise((resolve, reject) => {
        request.get(urlShip, (err,response, body) => {
            console.log(urlShip);
            const nave = JSON.parse(body)
            response.statusCode == 200
            ? resolve(nave)
            : reject('Error en getNameShip')
        });
    });
}*/


getFilm().then((respuesta)=>{
    const pelis = respuesta.results;
    const filmsNameShips= pelis.map((peli)=>{
        const resp={};
        resp[peli.title] = peli.starships;
        return resp;
    });
    console.log(filmsNameShips);
    //console.log(pelis[0].starships);

    /*const naves = pelis.map((nave)=>{
        return nave.starships;
    })
    console.log(naves);
    return getNameShip(naves);
}).then((naves)=>{
    //console.log(naves.name);*/
}).catch((err)=>{   
    console.log(err)
});
