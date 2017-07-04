var tempindoor, tempoutdoor;
var humabsindoor, humabsoutdoor;

var tempindoor, tempoutdoor;
var humrelindoor, humrelabsoutdoor;

calcHumabs = function() {
  tempindoor   = parseInt($('#temp-indoor-text-input').val());
  humrelindoor = parseInt($('#humrel-indoor-text-input').val());
  humabsindoor = absFeuchte(tempindoor, humrelindoor);

  tempoutdoor   = parseInt($('#temp-outdoor-text-input').val());
  humreloutdoor = parseInt($('#humrel-outdoor-text-input').val());
  humabsoutdoor = absFeuchte(tempoutdoor, humreloutdoor);
  dpoutdoor     = RHtoDP(tempoutdoor, humreloutdoor);
  $('#humabs-indoor-text').html(showgcbm(humabsindoor));
  $('#humabs-outdoor-text').html(showgcbm(humabsoutdoor));
  $('#dp-outdoor-text').html(dpoutdoor);
  $('#humrel-20-text').html(DPtoRH(20, dpoutdoor));

  if (humabsoutdoor > humabsindoor)
  { $('#lueften-ja').hide(); $('#lueften-nein').show(); }
  else
  { $('#lueften-ja').show(); $('#lueften-nein').hide();}

}


$('[id$=door-text-input]').on('change blur keyup mouseup', function() { calcHumabs();} );
$('#btnLoadLocalWeather').click( function() {loadLocalWeather();});

calcHumabs();

loadLocalWeather();

function loadLocalWeather() {
  $("#weather").html('');

  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<h2>'+weather.city+', '+weather.region+'</h2>';
      html += '<p>' + weather.updated + '</p>';
      html += '<img src="'+weather.image+'">';
      html += '<ul><li class="currently">Currently: '+weather.temp+'&deg;C ('+weather.currently+')</li>';
      html += '<li class="currently">Tomorrow: '+weather.forecast[1].low + ' - ' + weather.forecast[1].high +'&deg;C</li>';
      html += '</ul>';

      $("#weather").html(html);

      $('#temp-outdoor-text-input').val(weather.temp);
      $('#humrel-outdoor-text-input').val(weather.humidity);
      calcHumabs();
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

// Quelle: https://www.wetterochs.de/wetter/feuchte.html#f1
// TODO: Lizenz klären
// Dampfdruck in Abhängigkeit von der Temperatur und der relativen Feuchte

function DD(T, r)
{
	return r/100 * SDD(T);
}

// Sättingungsdampfdruck in Abhängigkeit von der Temperatur
function SDD(T)
{
	var a, b;
	if(T >= 0)	// Sättigungsdampfdruck über Wasser
	{
		a = 7.5;
		b = 237.3;
	}
	else
	{
		a = 7.6;
		b = 240.7;
	}

	return 6.1078 * Math.exp(((a*T)/(b+T))/Math.LOG10E);
}

function CelsiusToKelvin(T)
{
	return T + 273.15;
}

function absFeuchte(T,r)
{
  var mw = 18.016;
  var RStern = 8314.3;
  return 100000 * mw/RStern * DD(T, r)/CelsiusToKelvin(T);
}

// rel. Luftfeucht in Taupunkt (DP)
function RHtoDP(T, r)
{
	var dd = DD(T, r);
	var a, b;

	if(T >= 0)
	{
		a = 7.5;
		b = 237.3;
	}
	else
	{
		a = 7.6;
		b = 240.7;
	}

	var c = Math.log(dd/6.1078) * Math.LOG10E;

	var Taupunkt = (b * c) / (a - c);

	return Taupunkt;

}

function DPtoRH(T, TD)
{
	var dd  = SDD(TD);
	var sdd = SDD(T);

	return 100 * (dd / sdd);
}


function relFeuchte(T,absF) {

}

function runde(x, n)
{
	n = Math.pow(10, n);
	x = Math.round(x*n);
	return x/n;
}

function showgcbm(x)
{
	return runde(x,2) + ' g/m&sup3;';
}
