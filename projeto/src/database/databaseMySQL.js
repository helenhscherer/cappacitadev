//banco de dados - cadastro de pokemons
const {databaseConnection} = require('./connection')

const pokemons = {}

//função de salvar/cadastrar os pokemons
async function salvarPokemons(pokemon) {
    /*
    pokemon == {
        nome: 'Electabuzz',
        tipo: 'eletrico',
        fraqueza: 'terra',
        resistencia: 'agua'
    }
    */

    const queryInsertPokemon = `INSERT INTO cadastro_pokemon(nome_pokemon, tipo, fraqueza, resistencia) VALUES ('${pokemon.nome}','${pokemon.tipo}','${pokemon.fraqueza}','${pokemon.resistencia}')`

    //executar a query acima
   const result = await databaseConnection.raw(queryInsertPokemon)

   console.log(result)

   if(result){
       return {
           nome: pokemon.nome,
           tipo: pokemon.tipo,
           fraqueza: pokemon.fraqueza,
           resistencia: pokemon.resistencia,
           id: result[0].insertId
       }
   }else{
       console.error("Deu erro!")
       return{
           error: "Deu erro na inserção!"
       }
   }

}


//função de mostrar 1 pokemon
function mostrarPokemon(id) {
    return pokemons[id] || {}
}

//função mostrar todos os pokemons
function mostrarPokemons() {
    return Object.values(pokemons)
}

//atualizar pokemon
function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

//deletar um pokemon
function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

//batalha pokemon
function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

//ataque
    if(pokemon1.hp != 0 && pokemon2.hp != 0) {
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        }
        else if(pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        }
        else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }


//ataque inimigo
    if(pokemon2.hp != 0 && pokemon1.hp != 0) {
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        }
        else if(pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        }
        else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

//pocao de cura
function pocaoCura(id) {
    const pocaoCura = 20
    const pokemonCurado = pokemons[id]

    pokemonCurado.hp = pokemonCurado.hp + pocaoCura
    
    if (pokemonCurado.hp > 100) pokemonCurado.hp = 100

    return `${pokemonCurado.nome}: ${pokemonCurado.hp}hp >>>Me aguarde para a próxima batalha! Iaaaa!!!`
}


//exportando para o server
module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, pocaoCura }
