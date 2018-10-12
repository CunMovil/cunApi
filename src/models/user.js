const mysql = require('mysql');

connection = mysql.createConnection({
    host:'app.cun.edu.co',
    user:'appcun2',
    password:'lO7]}MZR(}Md',
    database:'sistema_de_notas'
})

// SELECT * FROM SRC_ENC_MATRICULA WHERE CEDULA = 1031148001

// SELECT * FROM SRC_GRUPO WHERE NUM_IDENTIFICACION = 1031148001
// SELECT * FROM BAS_TERCERO NUM_IDENTIFICACION = 1031148001
// SELECT * FROM BAS_TERCERO WHERE  NUM_IDENTIFICACION  = 1031148001
// SELECT * FROM CARNET WHERE  IDENTIFICACION  = 1031148001
//SHOW COLUMNS FROM CARNET
// SELECT DISTINCT ESTADO_ALUMNO FROM BAS_TERCERO

// SELECT * FROM BAS_TERCERO WHERE  DIR_EMAIL LIKE "%'+params+'%"'
// SELECT * FROM BAS_TERCERO WHERE  DIR_EMAIL LIKE "%'+param.email+'%"
// SELECT * FROM SRC_GRUPO WHERE NUM_IDENTIFICACION  ='+ ccid + ' AND DIA ='+diatest 
//SELECT CARNET.*, BAS_TERCERO.NOM_UNIDAD,BAS_TERCERO.NOM_SEDE FROM CARNET INNER JOIN BAS_TERCERO ON CARNET.IDENTIFICACION = BAS_TERCERO.NUM_IDENTIFICACION  WHERE  CARNET.IDENTIFICACION  ='+ccid


let userModel = {};
userModel.getEstudiantes = (param,callback) => {

    if(connection){
      connection.query('SELECT * FROM BAS_TERCERO WHERE  DIR_EMAIL LIKE "%'+param.email+'%"' ,
        (err, rows)=> {
            if(err){
                throw err;
            }else{
                callback(null,rows)
            }
        })  
        console.log(param.email);
    }
}
userModel.getNotas = (ccid,callback) =>{

    if(connection){
      connection.query('SELECT * FROM SRC_ENC_MATRICULA WHERE CEDULA ='+ccid ,
    (err, rows)=>{
        if(err){
            throw err;
        }else{
            callback(null,rows)
        }

    })  
    }
}
userModel.getHorario = (ccid,dia,callback) =>{
    console.log(dia)
    if(connection){
      connection.query('SELECT * FROM SRC_GRUPO WHERE NUM_IDENTIFICACION  ='+ ccid + ' AND DIA ="'+dia.day+'" AND NUM_GRUPO NOT LIKE "5%" ORDER BY HORA_INICIAL ASC' ,
    (err, rows)=>{
        if(err){
            throw err;
        }else{
            callback(null,rows)
        }

    })  
    }else{
        alert("error")
    }
}


userModel.getHorarioFull = (ccid,callback) =>{
 
    if(connection){
      connection.query('SELECT * FROM SRC_GRUPO WHERE NUM_IDENTIFICACION  ='+ ccid  ,
    (err, rows)=>{
        if(err){
            throw err;
        }else{
            callback(null,rows)
        }

    })  
    }else{
        alert("error")
    }
}


userModel.getHorarioVirtual = (ccid,callback) =>{
    
    if(connection){
      connection.query('SELECT * FROM (SELECT * FROM SRC_GRUPO WHERE NUM_IDENTIFICACION = '+ccid+') AS SUB WHERE DIA = "Domingo " OR NUM_GRUPO LIKE "5%"' ,
    (err, rows)=>{
        if(err){
            throw err;
        }else{
            callback(null,rows)
        }

    })  
    }else{
        alert("error")
    }
}

userModel.getCarne = (ccid,callback) =>{

    if(connection){
      connection.query('SELECT CARNET.*, BAS_TERCERO.NOM_UNIDAD,BAS_TERCERO.NOM_SEDE FROM CARNET INNER JOIN BAS_TERCERO ON CARNET.IDENTIFICACION = BAS_TERCERO.NUM_IDENTIFICACION  WHERE  CARNET.IDENTIFICACION  ='+ccid ,
    (err, rows)=>{
        if(err){
            throw err;
        }else{
            callback(null,rows)
        }

    })  
    }
}


userModel.insertUser = (userData,callback)=>{
    if (connection) {
        connection.query('INSERT INTO TABLA SET ?',userData,
    (err,result)=>{
        if (err) {
            throw err
        } else {
            callback(null,{
                'InsertId':result.id
            })
        }
    })
    } else {
        
    }
}
module.exports = userModel;