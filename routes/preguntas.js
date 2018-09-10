const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/pregunta_imagen.js' }];

/* This router is mounted at /todo */
router.get('/', (req, res) => {
  knex('pregunta')
    .select()
    .then(preguntas => {
      res.render('preguntas/preguntas', { preguntas: preguntas });
    });
});

router.get('/agregar', (req, res) => {

  knex('capitulo')
    .select()
    .then(capitulos => {
      res.render('preguntas/agregar', { capitulos: capitulos , scripts: scripts});
    });

  //res.render('preguntas/agregar', {scripts: scripts});
});

router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'preguntas/ver');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'preguntas/editar');
});

router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (pregunta) => {
    
    console.log(pregunta)
    knex('pregunta')
      .insert(pregunta, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/preguntas/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  validateTodoRenderError(req, res, (pregunta) => {
    const id = req.params.id;
    knex('pregunta')
      .where('id', id)
      .update(pregunta, 'id')
      .then(() => {
        res.redirect(`/preguntas/${id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(validId(id)) {
    knex('pregunta')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/preguntas');
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
    
    const pregunta = {
      id_capitulo: req.body.id_capitulo,
      pregunta: req.body.pregunta,
      pregunta_1: req.body.pregunta_1,
      pregunta_2: req.body.pregunta_2,
      pregunta_3: req.body.pregunta_3,
      pregunta_4: req.body.pregunta_4,
      respuesta: req.body.respuesta,
      pregunta_1_img : req.body.pregunta_1_img_,
      pregunta_2_img : req.body.pregunta_2_img_,
      pregunta_3_img : req.body.pregunta_3_img_,
      pregunta_4_img : req.body.pregunta_4_img_,

    };

    console.log(pregunta);

    callback(pregunta);
  /*} else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }*/
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('pregunta')
      .select()
      .where('id', id)
      .first()
      .then(pregunta => {
        console.log(pregunta)
        res.render(viewName,{pregunta: pregunta, scripts: scripts} );
      });
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
