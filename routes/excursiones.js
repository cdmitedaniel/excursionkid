const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/image.js' }];

/* This router is mounted at /todo */
router.get('/', (req, res) => {
  knex('excursion')
    .select()
    .then(excursiones => {
      res.render('excursiones/excursiones', { excursiones: excursiones });
    });
});

router.get('/agregar', (req, res) => {

  knex('usuarios')
    .select()
    //.where('rol', 'N')
    .then(usuarios => {
      res.render('excursiones/agregar', {scripts: scripts,  usuarios: usuarios });
    });
});

router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'excursiones/ver');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'excursiones/editar');
});

router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (excursion) => {
    
    //excursion.id_user = parseInt(excursion.id_user);
    knex('excursion')
      .insert(excursion, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/excursiones/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  validateTodoRenderError(req, res, (excursion) => {
    const id = req.params.id;
    knex('excursion')
      .where('id', id)
      .update(excursion, 'id')
      .then(() => {
        res.redirect(`/excursiones/${id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(validId(id)) {
    knex('excursion')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/excursiones');
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
    
    const excursion = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      creditos: req.body.creditos,
      id_usuario: req.body.id_usuario,
      portada: req.body.portada
    };

    console.log(excursion);

    callback(excursion);
  /*} else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }*/
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('usuarios')
    .select()
    //.where('rol', 'N')
    .then(usuarios => {
      knex('excursion')
      .select()
      .where('id', id)
      .first()
      .then(excursion => {
        res.render(viewName,{excursion: excursion, scripts: scripts, usuarios: usuarios} );
      });
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
