var monthMapping = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

var d = new Date();

var currentDate = d.getDate();
var currentMonth = d.getMonth();

function title(str) {
  return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

function fileName(month, date)
{
  return '../data/'+monthMapping[month]+date+".json";
}

function parse2HTML(years, events)
{
  var HTMLcontent = '';
  var i = 0
  while(typeof years[i] !== "undefined")
  {
    HTMLcontent += '<span class="w3-tag w3-xlarge w3-padding w3-blue-grey" style="transform:rotate(-5deg)">'+years[i]+'</span>\n';
    HTMLcontent += '<p>'+events[i]+'</p><br>\n'
    i ++;
  }
  return HTMLcontent
}

function fetchData(month, date)
{
  document.getElementById('date').innerHTML = title(monthMapping[month]) + ' ' + date;
  document.getElementById('date-bottom').innerHTML = title(monthMapping[month]) + ' ' + date;
  console.log(fileName(month, date))
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var dataObj = JSON.parse(this.responseText);
      var years = dataObj.Year;
      var events = dataObj.Event;
     document.getElementById("content").innerHTML = parse2HTML(years, events);
    }
  };
  xhttp.open("GET", fileName(month, date) , true);
  xhttp.send();
}

function next()
{
  if(currentMonth == 0 || currentMonth == 2 || currentMonth == 4 || currentMonth == 6 || currentMonth == 7 || currentMonth == 12 || currentMonth == 11)
  {
    if(currentDate == 31)
    {
      currentDate = 1;
      currentMonth = (currentMonth+1)%12;
    }
    else
    {
      currentDate += 1;
    }
  }
  else if(currentMonth == 3 || currentMonth == 5 || currentMonth == 8 || currentMonth == 10)
  {
    if(currentDate == 30)
    {
      currentDate = 1;
      currentMonth = (currentMonth+1)%12;
    }
    else
    {
      currentDate += 1;
    }
  }
  else
  {
    if(currentDate == 29)
    {
      currentDate = 1;
      currentMonth = (currentMonth+1)%12;
    }
    else
    {
      currentDate += 1;
    }
  }
  fetchData(currentMonth, currentDate)
}

function prev()
{
  if (currentDate == 1)
  {
    if(currentMonth == 0 || currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10)
    {
      currentDate = 31;
    }
    else if(currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)
    {
      currentDate = 30;
    }
    else
    {
      currentDate = 29;
    }
    currentMonth = (currentMonth+11)%12;
  }
  else
  {
    currentDate -= 1
  }
  fetchData(currentMonth, currentDate)
}

fetchData(currentMonth, currentDate)
console.log(currentDate);
console.log(currentMonth);
