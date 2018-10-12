
const User = require('../models/user')

module.exports = function (app){
    
    ////// GET

    app.get('/estudiantes',(req,res)=>{
        
        var query = req.query;
       User.getEstudiantes(query, (err,data)=>{
           res.status(200).json(data);
       })
    })

    
    app.get('/notas/:ccid',(req,res)=>{
        
        var param = req.params.ccid;
       User.getNotas(param, (err,data)=>{
           res.status(200).json(data);
       })
    })

    app.get('/horariofull/:ccid',(req,res)=>{
        
        var param = req.params.ccid;
        
       User.getHorarioFull(param, (err,data)=>{
           res.status(200).json(data);
       })
    })

    app.get('/horario/:ccid',(req,res)=>{
        
        var param = req.params.ccid;
        var query = req.query;
       User.getHorario(param,query, (err,data)=>{
           res.status(200).json(data);
       })
    })

    app.get('/horario/virtual/:ccid',(req,res)=>{
        
        var param = req.params.ccid;
       User.getHorarioVirtual(param, (err,data)=>{
           res.status(200).json(data);
       })
    })

    app.get('/carne/:ccid',(req,res)=>{
        
        var param = req.params.ccid;
       User.getCarne(param, (err,data)=>{
           res.status(200).json(data);
       })
    })


    /////// POST

    app.post('/users',(req,res)=>{
       
        const userData = {
              id:null,
              username:req.body.username
        }
        User.insertUser(userData,(err,data)=>{
            if (data && data.InsertId) {
                res.json({
                    success:true,
                    data:data,
                    msg:'Usuario Insertado'
                })
            } else {
                res.status(500).json({
                    success:false,
                    msg:'Error'
                })
            }
        })
    })

};