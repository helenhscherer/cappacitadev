const express = require('express')
const app = express()
const dataBase = require('./database')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

//mostrar todos os pokemons
app.get('/pokemons', (req, res) => {
    res.send(dataBase.mostrarPokemons())
})

//mostrar 1 pokemon
app.get('/pokemons/:id', (req, res) => {
    res.send(dataBase.mostrarPokemon(req.params.id))
})

// salvar pokemons
app.post('/pokemons', (req, res) => {
    const pokemon = dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100
    })
    res.send(pokemon)
})

//atualizar pokemons
app.put('/pokemons/:id', (req, res) => {
    const pokemon = dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)
})

//deletar pokemons
app.delete('/pokemons/:id', (req, res) => {
   res.send(dataBase.deletarPokemon(req.params.id))   
})

//batalha pokemon
app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

//Curar Pokemons após a batalha
app.post('/pocaocura/:id', (req, res) => {
    res.send(dataBase.pocaoCura(req.params.id))
})


app.listen(4004)