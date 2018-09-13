const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const path  = require('path')
var scripts = [{ script: '/js/pregunta_imagen.js' }];

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
});

router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'preguntas/ver');
});

router.get('/consultar/:id', (req, res)=> {

  let id = req.params.id;
  console.log("--->"+id)
  
  knex('pregunta')
  .where('id_capitulo', id)
  .then((data)=>{
    res.json(data);
  })
  

})

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


  let pregunta = {
    id_capitulo: req.body.id_capitulo,
    pregunta: req.body.pregunta,
    respuesta: req.body.respuesta,
    pregunta_1_img : req.body.pregunta_1_img_,
    pregunta_2_img : req.body.pregunta_2_img_,
    pregunta_3_img : req.body.pregunta_3_img_,
    pregunta_4_img : req.body.pregunta_4_img_,
  };

  let pregunta_audio = req.files.pregunta_audio;
  if(pregunta_audio!=undefined){
    console.log(pregunta_audio)

    pregunta_audio.mv(path.join(__dirname, '../public')+'/audios/'+pregunta_audio.name, function(err) {
      if (err)
        return res.status(500).send(err);
  
      
      pregunta.pregunta_audio = "/audios/"+pregunta_audio.name;

      callback(pregunta)
      //res.send('File uploaded!');
    });
  }else{
    pregunta["pregunta_audio"] = "/audios/pregunta.mp3"
    console.log("No hay audio")
  }
    
    console.log(pregunta);
    callback(pregunta);
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
