window.onload = function() {

	$( "#consultarNumero" ).click(function( event ) {
		event.preventDefault();
		pokeNombre();
		});
				
	$( "#form-poke-tipo" ).click(function( event ) {
		event.preventDefault();
		pokeSubmitTipo();
		});		
} 


function pokeNombre(){
  const pokeId = $('#nombre').val();
  $.ajax({
    url: `http://pokeapi.co/api/v2/pokemon/${pokeId}`}).done(function(pokemon){
	$('#pokecard').empty();
	$('#pokecard').css('display','block');

	let html = '<div class="card text-center m-3 card-pokemon">'
			+ '<div class="card-header bg-secondary">'
				+'<img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemon.id+'.png" alt="Card image cap">'
			+ '</div>'
			+'<div class="card-body">'
			+  '<p class="card-text font-weight-bold">'+pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)+'</p>'
			+  '<p class="card-text"><span class="badge badge-info"> #'+pokemon.id+'</span></p>'
			+'</div>'
		  +'</div>';
    $('#pokecard').append(html);

	//grafico del pokemon
	var chart = new CanvasJS.Chart("grafico", {
		animationEnabled: true,
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		title: {
			text: "Habilidades del pokémon"
		},
		axisY: {
			title: "Puntos",
			suffix: "",
			includeZero: false
		},
		axisX: {
			title: "Habilidades"
		},
		height:298,
		width: 550,
		data: [{
			type: "column",
			yValueFormatString: "#,##0.0#",
			dataPoints: [
				{ label: pokemon.stats[0].stat.name, y: pokemon.stats[0].base_stat},	
				{ label: pokemon.stats[1].stat.name, y: pokemon.stats[1].base_stat },	
				{ label: pokemon.stats[2].stat.name, y: pokemon.stats[2].base_stat },
				{ label: pokemon.stats[3].stat.name, y: pokemon.stats[3].base_stat },	
				{ label: pokemon.stats[4].stat.name, y: pokemon.stats[4].base_stat},
				{ label: pokemon.stats[5].stat.name, y: pokemon.stats[5].base_stat },			
								
			]
		}]
	});
	chart.render();
	
   });
}

function pokeSubmitTipo(){
  const pokeTipo = $('#tipo').val();
  const nombreTipo = $('#tipo').find('option:selected').attr("name");
  $('#pokemon-por-tipo').empty();
  $.ajax({
    url:  `http://pokeapi.co/api/v2/type/${pokeTipo}`}).done(function(tipos){
    const pokemones = tipos.pokemon;

    $('#nombre-tipo').text("Pokemones por tipo "+tipos.name);
    pokemones.forEach(function(item){
      let pokeId = item.pokemon.url.split("/")[6];
      // para excluir los pokemones alola porque no tienen fotografía
      if (item.pokemon.name.split("-").length == 1) {
		//   let html = '<section class="col-sm-3 pokemon-tipo"><h3>'+item.pokemon.name
		// 	  +'</h3><img id="pokeimage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png"></section>';
			let html = '<div class="card text-center m-3" style="width: 13rem;">'
			+ '<div class="card-header bg-secondary">'
				+'<img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png" alt="Card image cap">'
			+ '</div>'
			+'<div class="card-body">'
			+  '<p class="card-text">'+item.pokemon.name.charAt(0).toUpperCase() + item.pokemon.name.slice(1)+'</p>'
			+  '<p class="card-text"><span class="badge badge-info"> #'+pokeId+'</span></p>'
			+'</div>'
		  +'</div>';
          $('#pokemon-por-tipo').append(html);
      }
    });
   });
}






