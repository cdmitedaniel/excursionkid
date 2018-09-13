const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//localhost:3000/noticias/api
router.get('/api/', (req, res) => {
    knex('noticias')
    .select()
    .then( (noticias)=> {
        res.json({noticias: noticias})
    })
});

router.get('/api/:id', (req, res)=> {
    let id = req.params.id;
    knex('noticias')
    .where('id', id)
    .then( (noticia)=> {
        res.json(noticia)
    })
})
//localhost:3000/noticias GET
router.get('/', (req, res)=> {

    knex('noticias')
    .select()
    .then( (noticias)=>{
        res.render('noticias/listar', {noticias: noticias}); //listar.hbs
    })
})

router.get('/:id', (req, res)=>{

    let id = req.params.id;

    console.log("Estoy recibiendo el id:"+id)

    knex('noticias')
    .where('id', id)
    .first()
    .then( (noticia)=>{
        res.render('noticias/noticia', {noticia:noticia}); //noticia.hbs
    })
})

router.get('/editar/:id', (req, res)=>{

    let id = req.params.id;
    knex('noticias')
        .where('id', id)
        .first()
        .then( (noticia)=>{
            res.render('noticias/editar', {noticia:noticia}); //editar.hbs
    })
})

//localhost:3000/noticias/1 POST
router.post('/:id', (req, res)=>{
    let id = req.params.id;
    let noticia = {
        titulo: req.body.titulo,
        fecha: req.body.fecha
    }
    knex('noticias')
    .update(noticia)
    .where('id', id)
    .then( ()=> {
        res.redirect('/noticias')
    })
})

router.delete('/:id', (req, res)=> {

    let id = req.params.id;
    knex('noticias')
    .del()
    .where('id', id)
    .then( (noticias)=> {

        console.log("Eliminar")
        console.log(noticias)

        res.redirect('/noticias')
    })
})

router.get('/agregar/nuevo', (req, res)=> {
    res.render('noticias/agregar') //agregar.hbs
})

router.post('/', (req, res)=>{

    let noticia = {
        titulo: req.body.titulo,
        fecha: req.body.fecha
    }

    knex('noticias')
    .insert(noticia)
    .then( ()=> {

        res.redirect('/noticias');

    })

})

module.exports = router;
