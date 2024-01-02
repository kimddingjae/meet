const sheetId = "1C_tPlxxIRJc1Mx2W0vgTLPm4f9Rvtx4QIThsoGZoJBs";
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const date = new Date();
const query = encodeURIComponent("Select *");
const combo = document.querySelector("#combo");
const container = document.querySelector("#container");
//let output = document.querySelector(".output");

for (i = 2022; i <= date.getFullYear(); i++) {
  var newOption = document.createElement("option");
  newOption.text = i + "년";
  newOption.value = i + "년";
  combo.appendChild(newOption);
}

const sheetName = `${date.getFullYear()}년`;
combo.value = `${date.getFullYear()}년`;

document.addEventListener("DOMContentLoaded", init);

function init() {
  let url = `${base}&sheet=${combo.value}&tq=${query}`;
  console.log(url);
  const outputChild = document.createElement("table");
  outputChild.className = "output";
  container.prepend(outputChild);
  const output = document.querySelector(".output");

  fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      //Remove additional text and extract only JSON:
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));

      const colz = [];
      const data = [];

      const tr = document.createElement("tr");
      //Extract column labels

      jsonData.table.cols.forEach((heading) => {
        let column = heading.label;
        colz.push(column);
        const th = document.createElement("th");

        if (column === null || column === undefined || column === "") {
          column = "100000000";
          th.style.backgroundColor = "#40d0f0";
          th.style.color = "#40d0f0";
        }

        th.innerText = column;
        tr.appendChild(th);
      });
      output.appendChild(tr);

      //extract row data:
      jsonData.table.rows.forEach((rowData) => {
        const row = {};
        colz.forEach((ele, ind) => {
          row[ele] = rowData.c[ind] != null ? rowData.c[ind].v : "";
          console.log(row[ele])
          if (row[ele] === null || row[ele] === undefined || row[ele] === 0 || row[ele] == 4)
            row[ele] = "";          
          
          if (typeof row[ele] === "number") {
            if(row[ele] == 3){
              row[ele] = "완납";
            }
            else {
              row[ele] = row[ele].toLocaleString("ko-KR");
            }
          } 
        });
        data.push(row);
      });

      processRows(data);
    });

  // document.querySelector("th").innerText = 100000000;
}

function processRows(json) {
  let output = document.querySelector(".output");
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

function yearChange() {
  const output = document.querySelector(".output");
  output.remove();
  init();
}
