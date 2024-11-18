var conexao = require("./conexaobanco");
 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
 
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('cadastro');
});

// Rota para a lista de clientes
app.get('/listadecliente', function(req, res) {
    var sql = "SELECT * FROM clientes";
    conexao.query(sql, function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao buscar clientes');
        } else {
            res.render('listadecliente', { clientes: result });
        }
    });
});

//POST continuar
app.post('/', function(req, res){
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var whatsapp = req.body.whatsapp;
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf; // Ajuste o nome da variável para corresponder ao nome do campo no formulário

    var sql = "INSERT INTO clientes (nome,sobrenome, email, whatsapp, cep, logradouro, numero,complemento,bairro,cidade,uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
    conexao.query(sql, [nome,sobrenome, email, whatsapp, cep, logradouro, numero,complemento,bairro,cidade,uf], function(error, result){
        if(error) throw error;
        res.redirect('/listadecliente');
    });
});
  


//deletando dados do banco - Delete
app.get('/delete-clientes', function(req,res){
    var sql = "delete from clientes where codcliente=?";
 
    var codcliente =  req.query.codcliente;
 
    conexao.query(sql,[codcliente], function(error, result){
        if(error)console.log(error);
        res.redirect('/listadecliente');
 
    });
});

//update- alterando dados no bancos de dados 
app.get('/update-clientes',function (req,res){
    var sql = "select * from clientes where codcliente=?";

    var codcliente = req.query.codcliente;

    conexao.query(sql,[codcliente],function(error,result){
        if(error)console.log(error);

        //verficar se a consulta retornou  algum resultado
        if(result && result.length > 0) {
        res.render("alterarclientes", {clientes: result[0]});
        } else{
            res.status(404).send('Cliente não encontrado');
        }
    });
        
});

//Update metodo post para enviar 
app.post('/update-clientes', function(req,res){
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var whatsapp = req.body.whatsapp;
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var codcliente = req.body.codcliente;
       
    var sql = "UPDATE clientes set nome=?, sobrenome=?, email=?, whatsapp=?, cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=? where codcliente=?";



    var sql = "UPDATE clientes SET nome=?, sobrenome=?, email=?, whatsapp=?, cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=? WHERE codcliente=?"; // Query SQL para atualizar um cliente
    conexao.query(sql,[nome,sobrenome, email, whatsapp, cep, logradouro, numero,complemento,bairro,cidade,uf, codcliente], function(error, result){ // Executa a query
        if(error){
            console.error("Erro ao atualizar cliente:", error); // Imprime o erro com mais detalhes
            res.status(500).send("Erro ao atualizar cliente"); // Retorna uma resposta de erro ao cliente
        } else {
            if (result.affectedRows > 0) { // Verifica se algum registro foi afetado
                res.redirect('/listadecliente'); // Redireciona para a lista de clientes
            } else {
                console.warn("Nenhum cliente atualizado."); // Imprime um aviso se nenhum registro foi atualizado
                res.status(404).send("Cliente não encontrado"); // Retorna uma resposta 404 se o cliente não for encontrado
            }
        }
    });
});


app.listen(3000, () => {
    console.log("Conectado na porta 3000");
});
        