const express = require ("express");
const router = express.Router();
const uuid = require("uuid")

let trucks = [    
]

router.get("/trucks",(req,res)=>{
    res.send(trucks);
});
router.post("/trucks",(req,res)=>{      
    const truck =  {...req.body,id:uuid.v4() };
    trucks.push(truck);
    res.send(truck);
});
router.put("/:id",(req,res) =>{
    const { id } = req.params;
    let trc = trucks.find((t) => t.id === id);
    trc = req.body;
    res.send(trc);
})
router.delete("/:id",(req,res)=>{
    const id  = req.params.id.replace('trucks','');     
    trucks=trucks.filter((tr) => {
        return tr.id !== id
    });
    res.send({id:id,msg:`Truck id ${id} deleted`});
});
module.exports = router;