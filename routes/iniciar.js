var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
const youtubeParse = require('js-video-url-parser');
/* GET home page. */
router.get('/', function(req, res, next) {

        knex('usuarios')
        .where('rol', 'N')
        .then(usuarios => {
            console.log(usuarios)
            res.render('iniciar/iniciar', { usuarios: usuarios });
          });
});

router.get('/:id', function(req, res, next) {

    const id = req.params.id;

    knex('excursion')
    .where('id_usuario', id)
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
        //res.render('iniciar/excursiones', { excursiones: excursiones });
      });
    });

    /*console.log(id);

    knex('capitulo')
    .where('id_excursion', id)
    .then(capitulos => {
        
        if(capitulos.length > 0){

            res.render('iniciar/capitulos', { capitulos: capitulos });
            //console.log(capitulos)
        }else{
            console.log("no cap")
        }
        //res.render('iniciar/excursiones', { excursiones: excursiones });
      });

    console.log(id);*/

  //res.render('admin');
});

module.exports = router;
