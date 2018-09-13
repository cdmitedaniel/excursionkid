const express = require('express');
const router = express.Router();
const youtubeParse = require('js-video-url-parser');
const knex = require('../db/knex');


var scripts = [{ script: '/js/image.js' }];

/* This router is mounted at /todo */

//localhost:3000/capitulos
router.get('/', (req, res) => {
  knex('capitulo')
    .select()
    .then(capitulos => {

      capitulos.forEach(cap => {

        cap.youtube_url = youtubeParse.parse(cap.youtube_url).id
        
        console.log(cap.youtube_url);
      });

      res.render('capitulos/capitulos', { capitulos: capitulos });
    });
});

router.get('/agregar', (req, res) => {

  knex('excursion')
    .select()
    .then(excursiones => {

      res.render('capitulos/agregar', {scripts: scripts, excursiones:excursiones});
      //res.render('excursiones/agregar', {scripts: scripts,  usuarios: usuarios });
    });

  
});

router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'capitulos/ver');
});

router.get('/:id/ver', (req, res) => {

  const id = req.params.id;
  console.log(id)

  knex('capitulo')
  .where('id', id)
  .first()
  .then(capitulo => {
    
    capitulo.youtube_url = youtubeParse.parse(capitulo.youtube_url).id
    res.json(capitulo);
  });

});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  console.log("Editar"+id)
  respondAndRenderTodo(id, res, 'capitulos/editar');
});

router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (capitulo) => {
    
    knex('capitulo')
      .insert(capitulo, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/capitulos/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  validateTodoRenderError(req, res, (usuario) => {
    const id = req.params.id;
    knex('capitulo')
      .where('id', id)
      .update(usuario, 'id')
      .then(() => {
        res.redirect(`/capitulos/${id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  console.log("Delete"+id);
  if(validId(id)) {
    knex('capitulo')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/capitulos');
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
});

function validateTodoRenderError(req, res, callback) {
  //if(validTodo(req.body)) {
    
    const capitulo = {
      youtube_url: req.body.youtube_url,
      id_excursion: req.body.id_excursion,
      portada: req.body.portada,
      titulo: req.body.titulo
    };

    console.log(capitulo);

    callback(capitulo);
  /*} else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }*/
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {

    knex
    .select('excursion.titulo', 'excursion.descripcion','excursion.portada', 'capitulo.id', 'capitulo.youtube_url', 'capitulo.id_excursion', 'capitulo.portada', 'capitulo.titulo')
    .from('capitulo')
    .innerJoin('excursion', function() {
      this.on('excursion.id', '=', 'capitulo.id_excursion')
    })
    .where('capitulo.id', id)
    .first()
    .then((excursion_cap)=>{

      if(viewName != "capitulos/editar"){
        excursion_cap.youtube_url = youtubeParse.parse(excursion_cap.youtube_url).id
      }

      console.log(excursion_cap)

      res.render(viewName,{excursion_cap: excursion_cap, scripts: scripts} );

    })

    /*knex
    .select('excursion.titulo', 'capitulo.youtube_url', 'capitulo.id_excursion')
    //.from('excursion')
    .innerJoin('excursion', 'excursion.id', '=', 'capitulo.id_excursion')
    .first()
    .then(capitulo=>{

      capitulo.youtube_url = youtubeParse.parse(capitulo.youtube_url).id
      console.log(capitulo)

    })*/

/*
    knex('capitulo')
      .select()
      .where('id', id)
      .first()
      .then(capitulo => {
        console.log(capitulo)

        capitulo.youtube_url = youtubeParse.parse(capitulo.youtube_url).id

        res.render(viewName,{capitulo: capitulo, scripts: scripts} );
      });*/
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validId(id) {
  return !isNaN(id);
}

module.exports = router;
