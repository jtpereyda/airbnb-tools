// import node-fetch using import instead of require
import fetch from 'node-fetch';
import { printTable, Table } from 'console-table-printer';

// Call API in a for loop

async function fetchAndPrintJSON() {
    let turnoverbnb_session1 = "PASTE_TOKEN_HERE";

    let r = await fetch("https://app.turno.com/projects/list/pending-and-accepted?filter=all&project_ids=&time_filter_type=ALL&time_filter_value=&date_range_start=2023-04-01&date_range_end=2023-04-31&page=1&per_page=100&desc=false", {
    "headers": {
        'cookie': ` turnoverbnb_session1=${turnoverbnb_session1}`
    },
    "referrer": "https://app.turno.com/view/projects",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
    });

    let j = await r.json();
    let projects = j.projects;

    let rows = []
    // for project in projects
    for (let project of projects) {
        r = await fetch(`https://app.turno.com/projects/details/${project.id}?fromCalendar=true`, {
        headers: {
            'cookie': ` turnoverbnb_session1=${turnoverbnb_session1}`
        }
        });
        
        j = await r.json();
        let notes = j.data.notes;
        let name = j.data.cleaner.name;
        let date = j.data.date;
        let address = j.data.short_address;
        let status = project.completed ? "✔" : "";
        rows.push({"Date": date, "Name": name, "Address": address, "Status": status, "Notes": notes});
    }

    // print rows in a human readable table
    // for (let row of rows) {
    //     console.log(row.join("\t"));
    // }
    const p = new Table();

    for (let row of rows) {
        p.addRow(row, {color: row.Notes ? "green" : "red"});
    }
    p.printTable();

}

fetchAndPrintJSON();

