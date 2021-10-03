const URL = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json'

function punto1(dataList) {
    let table1 = document.getElementById("punto1");
    dataList.forEach((element, index) => {
      let row = document.createElement("tr");
      if (element.squirrel) {
        row.classList.add("table-danger");
      }
      let number = document.createElement("th");
      number.setAttribute("scope", "row");
      let node1 = document.createTextNode(`${index + 1}`);
      number.appendChild(node1);
  
      let events = document.createElement("td");
      let node2 = document.createTextNode(`${element.events}`);
      events.appendChild(node2);
  
      let squirrel = document.createElement("td");
      let node3 = document.createTextNode(`${element.squirrel}`);
      squirrel.appendChild(node3);
  
      row.appendChild(number);
      row.appendChild(events);
      row.appendChild(squirrel);
      table1.appendChild(row);
    });
  }
  
  function calculateMCC(data) {
    let TN = data.arr[0];
    let FN = data.arr[1];
    let FP = data.arr[2];
    let TP = data.arr[3];
    let correlation =
      (TP * TN - FP * FN) /
      Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    return { event: data.event, correlation };
  }
  
  function punto2(dataList) {
    let couples = [];
  
    dataList.forEach((row) => {
      row.events.forEach((event) => {
        let search = couples.find((element) => element.event === event);
        if (!search) {
          let current = {
            event: event,
            arr: [0, 0, 0, 0],
          };
          couples.push(current);
        }
      });
    });
  
    dataList.forEach((element) => {
      let squirrel = element.squirrel;
      couples.forEach((couple) => {
        if (!element.events.find((element) => element === couple.event)) {
          if (!squirrel) {
            couple.arr[0] += 1;
          } else {
            couple.arr[2] += 1;
          }
        } else {
          if (!squirrel) {
            couple.arr[1] += 1;
          } else {
            couple.arr[3] += 1;
          }
        }
      });
    });
  
    let correlationDef = couples
      .map(calculateMCC)
      .sort((a, b) => b.correlation - a.correlation);
  
    let table2 = document.getElementById("punto2");
  
    correlationDef.forEach((element, index) => {
      let row = document.createElement("tr");
      let number = document.createElement("th");
      number.setAttribute("scope", "row");
      let node1 = document.createTextNode(`${index + 1}`);
      number.appendChild(node1);
  
      let events = document.createElement("td");
      let node2 = document.createTextNode(`${element.event}`);
      events.appendChild(node2);
  
      let correlation = document.createElement("td");
      let node3 = document.createTextNode(`${element.correlation}`);
      correlation.appendChild(node3);
  
      row.appendChild(number);
      row.appendChild(events);
      row.appendChild(correlation);
      table2.appendChild(row);
    });
  }
  
  fetch(URL)
    .then((data) => {
      return data.json();
    })
    .then((dataList) => {
      punto1(dataList);
      punto2(dataList);
    });