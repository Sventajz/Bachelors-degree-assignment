const express = require('express');
const router = express.Router();
const Car = require('../models/car');


//gets back all cars
router.get('/',async(req,res) => {
    try{
        const cars = await Car.find();
        res.json(cars);

    }catch(err){
        res.status(400).json({message: err.message})
    }
});
// submits a single car
router.post('/',async(req,res) => {
    const car = new Car({
        carName: req.body.carName,
        color:req.body.color
    });
    try{
        const newCar = await car.save()
        res.status(201).json(newCar)
    }catch(err){
        res.status(400).json({ message: err.message})
    }

});

// gets back specific post

router.get('/:carID',async(req,res) =>{
    try {
        const car = await Car.findById(req.params.carID);
        res.json(car)
    }catch{
        res.status(400).json({ message: err.message})
    }
});

//delete a specific post

router.delete('/:carID',async(req,res) =>{
    try {
        const removedCar = await Car.remove({_id: req.params.carID});
        res.json(removedCar)
    }catch{
        res.status(400).json({ message: err.message})
    }
});


// update a post

router.patch('/:carID', async(req,res)=>{
    try{
        const updatedCar = await Car.updateOne(
            {_id:req.params.carID},
            {$set: {carName:req.body.carName}}
        );
        res.json(updatedCar);
    }catch(err){
        res.status(400).json({ message: err.message});
    }

})


module.exports = router;