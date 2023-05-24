// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

var currentDate=dayjs().format("dddd, MMMM D, YYYY")
$("#currentDay").text(currentDate)

  function createTimeBlock(hourText, state) {
    var timeBlockDiv = $("<div>");
    // timeBlockDiv.attr("id", "hour-11");
    timeBlockDiv.addClass("row time-block " + state);

    var hourDiv = $("<div>");
    hourDiv.addClass("col-2 col-md-1 hour text-center py-3");
    hourDiv.text(hourText)

    var textArea = $("<textarea>");
    textArea.addClass("col-8 col-md-10 description");
    textArea.attr("rows", "3");
    textArea.val(localStorage.getItem(hourText))

    var saveBtn = $("<button>");
    saveBtn.addClass("btn saveBtn col-2 col-md-1");
    saveBtn.attr("aria-label", "save");
    saveBtn.attr("hour-text", hourText)
    saveBtn.on("click", function(){
      var targetHour = $(this).attr("hour-text");
      var targetText = $(this).siblings("textarea").val()

      localStorage.setItem(targetHour, targetText);
    })

    var icon = $("<i>")
    icon.addClass("fas fa-save");
    icon.attr("aria-hidden", "true");

    saveBtn.append(icon);

    timeBlockDiv.append(hourDiv, textArea, saveBtn)


    var mainContainer = $("#main-container");

    mainContainer.append(timeBlockDiv)
  }

  var hourArr = [
    {
      text: "9AM",
      value: 9
    },
    {
      text: "10AM",
      value: 10
    },
    {
      text: "11AM",
      value: 11
    },
    {
      text: "12PM",
      value: 12
    },
    {
      text: "1PM",
      value: 13
    },
    {
      text: "2PM",
      value: 14
    },
    {
      text: "3PM",
      value: 15
    },
    {
      text: "4PM",
      value: 16
    },
    {
      text: "5PM",
      value: 17
    }
  ]

  var currentHour = dayjs().format("H");

  for(i = 0; i < hourArr.length; i++) {
    var state = "";

    if(hourArr[i].value === parseInt(currentHour)) {
      state = "present"
    }
    if(hourArr[i].value > parseInt(currentHour)) {
      state = "future"
    }
    if(hourArr[i].value < parseInt(currentHour)) {
      state = "past"
    }

    createTimeBlock(hourArr[i].text, state);
  }

  // TODO: Add code to display the current date in the header of the page.
});
