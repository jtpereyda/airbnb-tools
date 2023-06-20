// import node-fetch using import instead of require
import fetch from 'node-fetch';
import { printTable, Table } from 'console-table-printer';

// Call API in a for loop

function format_date(date) {
    return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

async function fetchAndPrintJSON() {
    let turnoverbnb_session1 = process.env.TURNO_SESSION;

    let end = format_date(new Date());
    let start = new Date();
    start.setDate(start.getDate() - 30);
    start = format_date(start);
    // start = "2023-05-01";
    // end = "2023-04-31";
    let r = await fetch(`https://app.turno.com/projects/list/pending-and-accepted?filter=all&project_ids=&time_filter_type=ALL&time_filter_value=&date_range_start=${start}&date_range_end=${end}&page=1&per_page=100&desc=false`, {
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
        r = await fetch(`https://app.turno.com/projects/list-details/${project.id}?fromCalendar=true`, {
        headers: {
            'cookie': ` turnoverbnb_session1=${turnoverbnb_session1}`
        }
        });
        
        j = await r.json();
        let notes = j.project.notes;
        let name = j.project.cleaner_name;
        let date = format_date(new Date(j.project.date));
        let address = j.project.property.alias;
        let status = project.completed ? "X" : "";
        let checklist = j.project.itemsDone + "/" + j.project.checklist_items_count;
        rows.push({"Date": date, "Name": name, "Location": address, "Status": status, "Checklist": checklist, "Notes": notes});
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

