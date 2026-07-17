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
          column = "";
          th.classList.add("is-blank");
          th.setAttribute("aria-hidden", "true");
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
          
          if (
            row[ele] === null ||
            row[ele] === undefined
            // || row[ele] === 0 // 0을 공백 처리하던 부분
          )
            row[ele] = "";          
          
          if (typeof row[ele] === "number") {
            if(row[ele] == 220000){
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
  const carryoverEl = document.querySelector("#carryover");
  const carryoverValueEl = document.querySelector("#carryoverValue");
  const carryoverLabelEl = document.querySelector("#carryoverLabel");

  if (carryoverEl) {
    carryoverEl.hidden = true;
  }
  if (carryoverValueEl) {
    carryoverValueEl.textContent = "";
  }

  const selectedYear = parseInt(String(combo.value).replace(/\D/g, ""), 10);
  const prevYearLabel =
    Number.isFinite(selectedYear) ? `${selectedYear - 1}년 이월 금액` : "이월 금액";
  if (carryoverLabelEl) {
    carryoverLabelEl.textContent = prevYearLabel;
  }

  const getLabel = (row) => {
    const keys = Object.keys(row);
    return String(row[keys[0]] ?? "").trim();
  };

  const zone2Labels = new Set(["이자", "소계", "달별 지출"]);
  const zone3Labels = new Set(["총 지출", "잔액"]);

  const zone1 = [];
  const zone2 = [];
  const zone3 = [];

  json.forEach((row) => {
    const label = getLabel(row);

    if (label === "이월 금액" || label === "이월금액") {
      const keys = Object.keys(row);
      let amount = "";
      for (let i = 1; i < keys.length; i++) {
        const value = row[keys[i]];
        if (value !== "" && value !== null && value !== undefined) {
          amount = value;
          break;
        }
      }
      if (carryoverEl && carryoverValueEl) {
        carryoverValueEl.textContent =
          amount === "" ? "-" : `${amount}원`;
        carryoverEl.hidden = false;
      }
      return;
    }

    if (zone3Labels.has(label)) {
      zone3.push(row);
    } else if (zone2Labels.has(label)) {
      zone2.push(row);
    } else {
      zone1.push(row);
    }
  });

  // 2구역 순서: 이자 → 소계 → 달별 지출
  const zone2Order = ["이자", "소계", "달별 지출"];
  zone2.sort(
    (a, b) => zone2Order.indexOf(getLabel(a)) - zone2Order.indexOf(getLabel(b))
  );

  // 3구역 순서: 총 지출 → 잔액
  const zone3Order = ["총 지출", "잔액"];
  zone3.sort(
    (a, b) => zone3Order.indexOf(getLabel(a)) - zone3Order.indexOf(getLabel(b))
  );

  const withWon = (value) => {
    if (value === "" || value === null || value === undefined) return value;
    const text = String(value);
    if (text.endsWith("원")) return text;
    return `${text}원`;
  };

  const appendRow = (row, zoneClass) => {
    const tr = document.createElement("tr");
    const keys = Object.keys(row);
    const isPaidRow = keys.some((key) => row[key] === "완납");
    const appendWon = zoneClass === "is-zone-2";

    tr.classList.add(zoneClass);
    if (isPaidRow) {
      tr.classList.add("is-paid-row");
    }

    // 완납 행: 2열~마지막 열 병합
    if (isPaidRow && keys.length > 1) {
      const nameTd = document.createElement("td");
      const nameValue = row[keys[0]];
      nameTd.textContent = nameValue;
      if (nameValue !== "" && nameValue != null) {
        nameTd.classList.add("has-value");
      } else {
        nameTd.classList.add("is-empty");
      }
      tr.appendChild(nameTd);

      const paidTd = document.createElement("td");
      paidTd.colSpan = keys.length - 1;
      paidTd.textContent = "완납";
      paidTd.classList.add("has-value", "is-paid", "is-merged");
      tr.appendChild(paidTd);
      output.appendChild(tr);
      return;
    }

    keys.forEach((key, index) => {
      const td = document.createElement("td");
      let value = row[key];

      const hasValue =
        value !== "" && value !== null && value !== undefined;

      if (
        appendWon &&
        hasValue &&
        index > 0 &&
        value !== "완납" &&
        /[\d,]/.test(String(value))
      ) {
        value = withWon(value);
      }

      td.textContent = value;

      if (!hasValue) {
        td.classList.add("is-empty");
      } else {
        td.classList.add("has-value");
        if (row[key] === "완납") {
          td.classList.add("is-paid");
        } else if (
          typeof row[key] === "string" &&
          /[\d,]/.test(String(row[key])) &&
          index > 0
        ) {
          td.classList.add("is-num");
        }
      }

      tr.appendChild(td);
    });
    output.appendChild(tr);
  };

  const renderSummary = (rows) => {
    const summaryEl = document.querySelector("#ledgerSummary");
    if (!summaryEl) return;

    summaryEl.innerHTML = "";
    if (!rows.length) {
      summaryEl.hidden = true;
      return;
    }

    rows.forEach((row) => {
      const keys = Object.keys(row);
      const label = String(row[keys[0]] ?? "").trim();
      let amount = "";
      for (let i = 1; i < keys.length; i++) {
        const value = row[keys[i]];
        if (value !== "" && value !== null && value !== undefined) {
          amount = withWon(value);
          break;
        }
      }

      const item = document.createElement("div");
      item.className = "ledger-summary-row is-zone-3";

      const labelEl = document.createElement("span");
      labelEl.className = "ledger-summary-label";
      labelEl.textContent = label;

      const valueEl = document.createElement("span");
      valueEl.className = "ledger-summary-value";
      valueEl.textContent = amount;

      item.appendChild(labelEl);
      item.appendChild(valueEl);
      summaryEl.appendChild(item);
    });

    summaryEl.hidden = false;
  };

  zone1.forEach((row) => appendRow(row, "is-zone-1"));
  zone2.forEach((row) => appendRow(row, "is-zone-2"));
  renderSummary(zone3);
}

function yearChange() {
  const output = document.querySelector(".output");
  output.remove();
  init();
}
