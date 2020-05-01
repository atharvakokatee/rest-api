const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', (req,res,next)=>{
    Ninja.aggregate([
        {
        $geoNear: {
            near: {type:'Point',coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            distanceField: "dist.calculated",
            maxDistance: 100000,
            spherical: true
            }
        }
    ])
    .then( ninjas =>{
        res.send(ninjas);
    })
    .catch(next);
});

// add a new ninja to the db
router.post('/ninjas', (req,res,next)=>{
    Ninja.create(req.body)
    .then(ninja =>{
        res.send(ninja);
    })
    .catch(next);
});
// update a ninja in the db
router.put('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body)
    .then( updatedNinja =>{
        Ninja.findById({_id: req.params.id})
        .then( ninja =>{
            res.send(ninja);
        })
        .catch(next);
    })
    .catch(next);
});
// delete a ninja from the db
router.delete('/ninjas/:id',(req,res,next)=>{
    Ninja.findOneAndRemove({_id: req.params.id})
    .then( deletedNinja =>{
        res.send("Successfully deleted the Ninja!");
    })
    .catch(next);
});

module.exports = router;
