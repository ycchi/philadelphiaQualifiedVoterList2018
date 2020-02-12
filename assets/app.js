const sampleData = {
    "rows":[
       {
          "black":566,
          "dem":9401,
          "female":4927,
          "hispanic":393,
          "male":4576,
          "other_party":1705,
          "other_race":650,
          "rep":1402,
          "the_geom":null,
          "the_geom_webmercator":null,
          "total":12508,
          "unknown_sex":3005,
          "ward":"WD01",
          "white":4446
       },
       {
          "black":1441,
          "dem":14247,
          "female":7657,
          "hispanic":370,
          "male":6899,
          "other_party":2891,
          "other_race":719,
          "rep":2209,
          "the_geom":null,
          "the_geom_webmercator":null,
          "total":19347,
          "unknown_sex":4791,
          "ward":"WD02",
          "white":5590
       },
       {
          "black":8236,
          "dem":12191,
          "female":5601,
          "hispanic":88,
          "male":3946,
          "other_party":876,
          "other_race":273,
          "rep":339,
          "the_geom":null,
          "the_geom_webmercator":null,
          "total":13406,
          "unknown_sex":3859,
          "ward":"WD03",
          "white":88
       }
    ],
    "time":0.000,
    "fields":{
 
    },
    "total_rows":3
}

const tableHeadings = ["ward", "rep", "dem", "other_party", "total"];

const displayTableData = (tableHeadings, data) => {

    // declare DOM variables
    let table = document.getElementById("voterTable");
    table.setAttribute("class", "table table-striped");
    let thead = document.createElement("thead");
    thead.setAttribute("class", "thead-light");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");

    // clear DOM 
    table.innerHTML = '';

    // generate table headings
    for (let i = 0; i < tableHeadings.length; i ++) {
        tr.insertCell(i).outerHTML= `<th scope="col">${tableHeadings[i].toUpperCase()}</th>`
        thead.appendChild(tr);
        table.prepend(thead);
    }

    // generate rows
    data["rows"].forEach(e => {
        let row = table.insertRow();
        for(let j = 0; j < tableHeadings.length; j++) {
            if (e.hasOwnProperty(tableHeadings[j])) {
                let td = `<td>${e[tableHeadings[j]]}</td>`;
                row.insertCell().outerHTML = td;
            }
        }

        tbody.appendChild(row);
        table.appendChild(tbody);
    })

}

const getApiData = async () => {
    const apiURL = "https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+qualified_voter_listing_2018_primary_by_ward&filename=qualified_voter_listing_2018_primary_by_ward&format=json&skipfields=cartodb_id"
    let response = await fetch(apiURL);
    if (response.ok) {
        let result = await response.json();
        return displayTableData(tableHeadings, result);
    } else {
        alert(`HTTP ERROR: ${response.status}`)
    }
}

