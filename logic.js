function getSeatingChart(){
    let numStudents = document.getElementById("numStudents").value;
    let numCheeses = document.getElementById("numCheeses").value;
    let tablesPer = document.getElementById("numTablesPer").value;
    
    if(checkIfNums(numCheeses, numStudents, tablesPer)){
        let chart = calculateSeatingChart(Number(numStudents), Number(numCheeses), Number(tablesPer));
        document.getElementById("output").innerHTML = "Rounds ->(each student's schedule is a row)<br>" + chart
    }else{
        document.getElementById("output").innerHTML = "One of the values was not a number or negative"
    }

}

function checkIfNums(a, b, c){

  const numA = Number(a);
  const numB = Number(b);
  const numC = Number(c);

  if (Number.isInteger(numA) && numA > 1 && Number.isInteger(numB) && numB > 1 && Number.isInteger(numC) && numC > 1) {
    return true;
  }

  return false;

}

function calculateSeatingChart(numStudents, numCheeses, tablesPer){

    let orders = getOrders(numCheeses);

    let initChart = getJustCheeseChart(numStudents, orders);

    let finalChart = splitCheeses(initChart, tablesPer);

    let finalString = getChartString(finalChart);

    return finalString;


}

function getChartString(chart){
    let i = 0
    let str = ""

    while(i<chart.length){
        str = str + chart[i].toString() + "<br>";
        i++;
    }

    str = str.replaceAll(",", "&emsp;");
    return str;
}

function splitCheeses(chart, tablesPer){
    let numCheeses = chart[0].length;
    let numTables = numCheeses*tablesPer;
    let numStudents = chart.length;
    let maxPerTable = Math.ceil(numStudents/numTables);

    let roundIndex = 0;
    while(roundIndex < numCheeses){
        tableCount = zeroTable(numCheeses, tablesPer);
        console.log(tableCount)
        console.log("tableCount")
        let studentIndex = 0;
        while(studentIndex < numStudents){

            let table = Math.floor(Math.random()*tablesPer);
            let cheese = chart[studentIndex][roundIndex]-1;
            
            if(tableCount[cheese][table] < maxPerTable){

                tableCount[cheese][table]++;
                chart[studentIndex][roundIndex] = chart[studentIndex][roundIndex]+String.fromCharCode(97 + table);

            }else{
                let done = false;
                while(!done){

                    table = (table + 1) % numTables
                    if(tableCount[cheese][table] < maxPerTable){

                        tableCount[cheese][table]++;
                        chart[studentIndex][roundIndex] = chart[studentIndex][roundIndex]+String.fromCharCode(97 + table);
                        done = true;
                    }
                }
            }
            studentIndex++;
        }
        roundIndex++;
    }

    return chart;

}

function zeroTable(numCheeses, tablesPer){
    let table = [];
    let i = 0;
    while(i < numCheeses){
        let j = 0;
        let row = []
        while(j < tablesPer){
            row.push(0);
            j++;
        }
        table.push(row);
        i++;
    }
    return table;
}

function getJustCheeseChart(numStudents, orders){
    let chart = []
    let orderIndex = 0;
    let orderOffset = 0;
    let curentOrder = orders[orderIndex];
    let orderLength = curentOrder.length;
    
    while(chart.length<numStudents){
        chart.push([...curentOrder]);
        
        let val = curentOrder.shift();
        curentOrder.push(val);

        orderOffset++;
        if(orderOffset == orderLength){
            orderOffset = 0;
            orderIndex = (orderIndex + 1)%orders.length;
            curentOrder = orders[orderIndex];
        }
    }

    return chart;

}


function getOrders(numOrders){

    let arr = [];
    let i = 1;
    while(i < numOrders){
        arr.push(i+1);
        i++;
    }
    let perms = permutator(arr);
    i = 0;
    while(i < perms.length){
        perms[i].unshift(1);
        i++;
    }
   return perms;

}

//https://stackoverflow.com/questions/9960908/permutations-in-javascript
function permutator(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
      var cur, memo = memo || [];
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
  
      return results;
    }
  
    return permute(inputArr);
  }