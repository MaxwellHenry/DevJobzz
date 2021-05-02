
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

const Quote = require('inspirational-quotes');

async function fetchQuote() {
  const response = await fetch('/cowspiration');
  const { cow } = await response.json();

  $('#results').empty().append($(`<pre>${ cow }</pre>`))
}

fetchQuote();


console.log(Quote.getQuote())
// { text: "some random quote", author: "some random author" }