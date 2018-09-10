const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//**API para listar las tareas */
router.get('/', (req, res)=> {
    knex('tareas')
    .select()
    .then( (tareas)=> {
        res.json(tareas)
    })
});

/** Render de una vista y envio de objeto */
router.get('/nuevo', (req, res)=> {
    knex('tareas')
    .select()
    .then( (tareas)=> {
        res.render('tareas/lista', {Tareas : tareas})
    })
})

/** Agrega una tarea por método POST*/
router.post('/', (req, res)=> {
    const tarea = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad
    }
    knex('tareas')
    .insert(tarea)
    .then(()=>{
        res.redirect('tareas/nuevo')
    })
})

/*método eliminar*/ 
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        console.log("delete"+id);
        
        if(validId(id)) {
          knex('tareas')
            .where('id', id)
            .del()
            .then(() => {

              res.redirect('nuevo');
            });
        } else {
          res.status( 500);
          res.render('error', {
            message:  'Invalid id'
          });
        }
      });

//metodo editar
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const titulo = req.body.titulo;
    knex('tareas')
    .update('titulo', titulo)
    .where('id', id)
    .then((tarea)=>{
        res.redirect(200, 'tareas/nuevo')
    })    
  });


module.exports = router;
