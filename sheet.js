const sheetId = "1C_tPlxxIRJc1Mx2W0vgTLPm4f9Rvtx4QIThsoGZoJBs";
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const date = new Date();
const sheetName = `${date.getFullYear()}년`;
const query = encodeURIComponent("Select *");
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener("DOMContentLoaded", init);

const output = document.querySelector(".output");

function init() {
  fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      //Remove additional text and extract only JSON:
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));

      const colz = [];
      const tr = document.createElement("tr");
      //Extract column labels

      jsonData.table.cols.forEach((heading) => {
        let column = heading.label;
        colz.push(column);
        const th = document.createElement("th");
        th.innerText = column;
        tr.appendChild(th);
      });
      output.appendChild(tr);

      //extract row data:
      jsonData.table.rows.forEach((rowData) => {
        const row = {};
        colz.forEach((ele, ind) => {
          row[ele] = rowData.c[ind] != null ? rowData.c[ind].v : "";
          if (row[ele] === null || row[ele] === undefined || row[ele] === 0)
            row[ele] = "";
          if (typeof row[ele] === "number") {
            row[ele] = row[ele].toLocaleString("ko-KR");
          }
        });
        data.push(row);
      });
      processRows(data);
    });
}

function processRows(json) {
  json.forEach((row) => {
    const tr = document.createElement("tr");

    const keys = Object.keys(row);

    keys.forEach((key) => {
      const td = document.createElement("td");
      td.style.border = "5px";
      td.textContent = row[key];
      tr.appendChild(td);
    });
    output.appendChild(tr);
  });
}
