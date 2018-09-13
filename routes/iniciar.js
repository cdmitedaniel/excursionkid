var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
const youtubeParse = require('js-video-url-parser');
/* GET home page. */

//localhost:3000/iniciar
router.get('/', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)
    knex('usuarios')
    .where('rol', 'N')
    .then(usuarios => {
        res.render('iniciar/iniciar', { usuarios: usuarios });
    });
});

router.get('/:id', function(req, res, next) {

    const id = req.params.id;

    knex('excursion')
    .select()
    .then(excursiones => {
        console.log(excursiones)
        res.render('iniciar/excursiones', { excursiones: excursiones });
      });

    console.log(id);

  //res.render('admin');
});



router.get('/:id_excursion/jugar', function(req, res, next) {

    const id = req.params.id_excursion;
    knex('excursion')
    .where('id', id)
    .first()
    .then(excursion => {
        
        
        console.log("Excursion:"+excursion)


        knex('capitulo')
        .where('id_excursion', id)
        .orderBy('id', 'asc')
        .then(capitulos => {
            
            if(capitulos.length > 0){

                console.log("Capitulos: "+capitulos)

                capitulos.forEach(capitulo => {

                    console.log(youtubeParse.parse(capitulo.youtube_url))
                    capitulo.youtube_url = youtubeParse.parse(capitulo.youtube_url).id
                });

                res.render('iniciar/capitulos', { excursion:excursion, capitulos: capitulos });
                //res.render('iniciar/iniciar', { capitulos: capitulos, excursion:excursion });
                console.log(excursion)
            }else{
                res.render('iniciar/iniciar');
                //console.log("no cap")
            }
      });
    });
});

module.exports = router;
