// const sheetId = "1C_tPlxxIRJc1Mx2W0vgTLPm4f9Rvtx4QIThsoGZoJBs";

const base = `https://docs.google.com/spreadsheets/d/1C_tPlxxIRJc1Mx2W0vgTLPm4f9Rvtx4QIThsoGZoJBs/gviz/tq?`;

const x = document.querySelector(".x");
const sheetName = "연락망";
const query = encodeURIComponent("Select *");
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener("DOMContentLoaded", init);

x.addEventListener("click", () => {
  var modal = document.getElementsByClassName("modal");
  console.log(modal);
});

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

      let c1 = jsonData.table.rows[0].c[0].v;
      let c2 = jsonData.table.rows[0].c[1].v;

      colz.push(c1);
      const th = document.createElement("th");
      th.innerText = c1;
      tr.appendChild(th);
      output.appendChild(tr);
      colz.push(c2);
      const th2 = document.createElement("th");
      th2.innerText = c2;
      tr.appendChild(th2);
      output.appendChild(tr);

      // jsonData.table.cols.forEach((heading) => {
      //   let column = heading.label;
      //   colz.push(column);
      //   const th = document.createElement("th");
      //   th.innerText = column;
      //   tr.appendChild(th);
      // });
      output.appendChild(tr);

      //extract row data:
      jsonData.table.rows.forEach((rowData, idx) => {
        const row = {};
        if (idx === 0) {
          return;
        }
        colz.forEach((ele, ind) => {
          row[ele] = rowData.c[ind] != null ? rowData.c[ind].v : "";

          if (row[ele] === null || row[ele] === undefined || row[ele] === 0) {
            row[ele] = "";
          }

          // if (typeof row[ele] === "number") {
          //   row[ele] = row[ele].toLocaleString("ko-KR");
          // }
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
      if(key=="번호"){
        td.style.cursor = "pointer";
        td.onclick = function(){
          document.location.href='tel:' + row[key];
        }        
      }
      
      tr.appendChild(td);
    });
    output.appendChild(tr);
  });
}

function close(){
}
