
const fetchJobs = async (requestBody) => {
    try {
      const response = await fetch(`/job-search`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  $("#job-search").on("submit", async (event) => {
    event.preventDefault();
    const requestBody = {
      fulltime: $("#fulltime").val(),
      description: $("#description").val(),
    };
    const jobs = await fetchJobs(requestBody);
    const { results } = await jobs.json();
    renderResults(results);
  });




async function fetchQuote() {
  const response = await fetch('/cowspiration');
  const { cow } = await response.json();

  $('#results').empty().append($(`<pre>${ cow }</pre>`))
}

async function fetchWeather() {
  if (!navigator || !navigator.geolocation) {
    $('#weather').append($('<h3>Weather not available on this browser</h3>'))
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { coords: { latitude, longitude } } = position;

    const response = await fetch(`/weather?lat=${ latitude }&lon=${ longitude }`);
    const { results } = await response.json();

    if (results.daily) {
      $('#weather').empty();

      results.daily.forEach(day => {
        const { weather: [{ icon }] } = day;

        $('#weather').append($(`
          <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" />
        `));
      });
    }
  }, async (error) => {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state == "denied") {
      $('#weather').html(
        $(`<div>
            <h3>You have denied access to location services.</h3>
            <h4>If you wish to see your forecast, update your settings and refresh.</h4>
          </div>`)
      )
    }
  });
}

fetchWeather();

fetchQuote();


console.log(Quote.getQuote())
// { text: "some random quote", author: "some random author" }