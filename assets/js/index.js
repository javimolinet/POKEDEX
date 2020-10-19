$(document).ready(function () {

    consultaApi('snorlax')
    var pokemones;


    $('button').click(() => {
        let ingreso = $('#cajita').val()
        consultaApi(ingreso)
    })

    function consultaApi(nombrepokemon) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${nombrepokemon}`,
            success: function (data) {
                pokemones = data


                $('#informacion').text(data.name);

                $('#imagenes').html(`<img src="${pokemones.sprites.front_default}" alt="" style="height:145px; margin-left:20px;"> <img src="${pokemones.sprites.back_default}" alt="" style="height:145px">`)

                let pesokg = pokemones.weight / 10
                let alturamt = pokemones.height / 10

                $('#pesoyaltura').html(`Peso : ${pesokg} [kg] <br> Altura : ${alturamt} [mt]`)

                var chart = new CanvasJS.Chart("chartContainer", {
                    backgroundColor: 'transparent',
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas",
                        fontFamily: 'Audiowide',
                        horizontalAlign: "center"
                    },
                    data: [{
                        type: "doughnut",
                        startAngle: 60,
                        //innerRadius: 60,
                        indexLabelFontFamily: 'Audiowide',
                        indexLabelFontSize: 17,
                        indexLabelFontColor: '#000000',
                        indexLabel: "{label} - #percent%",
                        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                        dataPoints: []
                    }]


                });
                $.each(pokemones.stats, function (index, value) {
                    if (index == 4) {
                        chart.options.data[0].dataPoints.push(
                            { y: value.base_stat, label: value.stat.name, color: 'pink' }
                        )
                    }
                    else {
                        chart.options.data[0].dataPoints.push(
                            { y: value.base_stat, label: value.stat.name }
                        )


                    }
                });

                chart.render();


            },

            dataType: 'json',
        });

    }
});

