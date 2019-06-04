var monthMapping = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

var d = new Date();

var currentDate = d.getDate();
var currentMonth = d.getMonth();
var calDate = d.getDate();
var calMonth = d.getMonth();

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

function makeCalender(month, date)
{
  var days = 29;
  if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 12 || month == 11)
  {
    days = 31;
  }
  else if (month == 3 || month == 5 || month == 8 || month == 10)
  {
    days = 30;
  }
  calenderContent = "<tr>";
  for(i=1; i<=days; i++)
  {
    if(i == date && month==currentMonth)
    {
      calenderContent += '<td class="w3-black w3-center" onclick="fetchData('+month+', '+i+')">'+i+'</td>';
    }
    else
    {
      calenderContent += '<td class="w3-center w3-hover-dark-gray" onclick="fetchData('+month+', '+i+')">'+i+'</td>';
    }
    if(i%7 == 0)
    {
      calenderContent += '</tr><tr>';
    }
  }
  calenderContent += '</tr>';
  return calenderContent;
}

function prevMonth()
{
  calMonth = (calMonth+11)%12;
  document.getElementById('month').innerHTML = title(monthMapping[calMonth]);
  document.getElementById('calender').innerHTML = makeCalender(calMonth, calDate);

}

function nextMonth()
{
  calMonth = (calMonth+1)%12;
  document.getElementById('month').innerHTML = title(monthMapping[calMonth]);
  document.getElementById('calender').innerHTML = makeCalender(calMonth, calDate);
}

function fetchData(month, date)
{
  currentDate = date;
  currentMonth = month;
  calMonth = month;
  calDate = date;
  document.getElementById('date').innerHTML = title(monthMapping[month]) + ' ' + date;
  document.getElementById('date-bottom').innerHTML = title(monthMapping[month]) + ' ' + date;
  document.getElementById('month').innerHTML = title(monthMapping[calMonth]);
  document.getElementById('calender').innerHTML = makeCalender(calMonth, calDate);
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
  $("html, body").animate({scrollTop: 0}, 1000);
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
