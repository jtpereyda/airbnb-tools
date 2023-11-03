// import node-fetch using import instead of require
import fetch from 'node-fetch';
import { table } from 'table';
import chalk from 'chalk';
import pLimit from 'p-limit';

const limit = pLimit(10);

// Call API in a for loop

function format_date(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

async function fetchAndPrintJSON() {
    let turnoverbnb_session1 = process.env.TURNO_SESSION;

    let end = new Date();
    end.setDate(end.getDate() + 1);
    end = format_date(end);
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

    let promises = projects.map(async project => {
        const r = await fetch(`https://app.turno.com/projects/list-details/${project.id}?fromCalendar=true`, {
            headers: {
                'cookie': ` turnoverbnb_session1=${turnoverbnb_session1}`
            }
        });
        if (r.status != 200) {
            console.log(`Error fetching project ${project.id} with status ${r.status}`);
            let notes = "Error, no data";
            let name = project.cleaner_name;
            let date = format_date(new Date(project.date));
            let address = project.property.alias;
            let status = project.completed ? "X" : "";
            let checklist = "Error, no data";

            return { "Date": date, "Name": name, "Location": address, "Status": status, "Checklist": checklist, "Notes": notes };
        }
        const j = await r.json();
        let notes = j.project.notes;
        let name = j.project.cleaner_name;
        let date = format_date(new Date(j.project.date));
        let address = j.project.property.alias;
        let status = project.completed ? "X" : "";
        let checklist = j.project.itemsDone + "/" + j.project.checklist_items_count;

        return { "Date": date, "Name": name, "Location": address, "Status": status, "Checklist": checklist, "Notes": notes };
    }).map(promise => limit(() => promise));

    rows = await Promise.all(promises);

    // // print rows in a human readable table
    // // for (let row of rows) {
    // //     console.log(row.join("\t"));
    // // }
    // const p = new Table({head: ["Date", "Name", "Location", "Status", "Checklist", "Notes"]});

    // for (let row of rows) {
    //     // p.push(row, {color: row.Notes ? "green" : "red"});
    //     p.push(row);
    // }

    // filter out undefined rows
    rows = rows.filter(row => row);
    // For each row in rows, if Notes is empty, color the cell red
    rows = rows.map(row => {
        if (row.Notes) {
            return row;
        } else {
            // use a color library to make this console text red
            row.Notes = chalk.italic(chalk.red("No notes"));
            return row;
        }
    });


    // convert rows to an array of arrays
    rows = rows.map(row => Object.values(row));

    const config = {
        drawHorizontalLine: (lineIndex, rowCount) => {
            return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
        }
    };

    console.log(table(rows, config));

}

fetchAndPrintJSON();

