
const auth =require('../middlewear/auth');
const {Genre, validate}=require('../model/todo');
const mongoose=require('mongoose');
const express= require('express');


const router=express.Router();




router.get('/', async(req, res)=>{
    const genre= await Genre.find().sort('name');

    res.send(genre);
});



 
router.post('/',auth, async(req, res)=>{
    

    const {error}= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({name:req.body.name});
    genre = await genre.save();
    res.send(genre);


 });
 

 
 
router.put('/:id', async(req, res)=>{

   const {error}= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre= await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });
    if (!genre) return res.styatus(404).send('the genre with the given Id was not found');
    
    res.send(genre);


 });


router.delete('/:id', async(req, res)=>{
    //const course=courses.find(c=>c.id===parseInt(req.params.name));
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(400).send('the course with the given id was not found..');
    
    res.send(genre);

 });

router.get('/:id', async(req, res)=>{
    const genre=await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('the genre with the given Id was not found');
    
    res.send(genre);

 });


 

 module.exports=router;