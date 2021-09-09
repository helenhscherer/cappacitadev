//banco de dados - cadastro de pokemons
const {databaseConnection} = require('./connection')

//função de salvar/cadastrar os pokemons
async function salvarPokemons(pokemon) {
    
    const insertPokemon = {
        nome_pokemon: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia
    }

//query builder do knex - mais segura
   const result = await databaseConnection('cadastro_pokemon').insert(insertPokemon)

   console.log(result)

   if(result){
       return {
           nome_pokemon: pokemon.nome,
           tipo: pokemon.tipo,
           fraqueza: pokemon.fraqueza,
           resistencia: pokemon.resistencia,
           id: result[0]
       }
   }else{
       console.error("Deu erro!")
       return{
           error: "Deu erro na inserção!"
       }
   }

}


//função de mostrar 1 pokemon
async function mostrarPokemon(id) {

    // executar a query builder do knex para mostrar pokemon:
    const result = await databaseConnection('cadastro_pokemon').where({id})

    return result[0]
}

//função mostrar todos os pokemons
async function mostrarPokemons() {
    
// executar a query builder do knex para mostrar pokemons:
    const result = await databaseConnection('cadastro_pokemon')

    return result
}

//atualizar pokemon
async function atualizarPokemon(id, pokemon) {

    const atualizarPokemon = {
        nome_pokemon: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia,
        id

    }

    //query builder para atualização(alteração) do id
    const result = await databaseConnection('cadastro_pokemon').where({id}).update(atualizarPokemon)


   if(result){
       return {
           nome_pokemon: pokemon.nome,
           tipo: pokemon.tipo,
           fraqueza: pokemon.fraqueza,
           resistencia: pokemon.resistencia,
           id
       }
   }else{
       console.error("Deu erro!")
       return{
           error: "Deu erro na atualização!"
       }
   }
}

//deletar um pokemon
async function deletarPokemon(id) {
    
    const result = await databaseConnection('cadastro_pokemon').where({id}).del()

    return result[0] = "Deletado com sucesso."
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
module.exports = { 
    salvarPokemons, 
    mostrarPokemon, 
    mostrarPokemons, 
    atualizarPokemon, 
    deletarPokemon, 
    batalhaPokemon, 
    pocaoCura }
