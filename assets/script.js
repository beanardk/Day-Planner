let timeElement = $("#currentDay")
let containerElement = $(".container")

let currentTime = moment()
let currentHour = currentTime.format("H")
timeElement.text(currentTime.format("dddd, MMMM Do"))

let eventObject = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
}

let todayStorage = JSON.parse(localStorage.getItem(currentTime.format("MMMM Do, YYYY")))
if(!todayStorage) {
    localStorage.setItem(currentTime.format("MMMM Do, YYYY"), JSON.stringify(eventObject))
    todayStorage = JSON.parse(localStorage.getItem(currentTime.format("MMMM Do, YYYY")))
}

for (let i = 9; i < 18; i++) {
    if(i == currentHour) {
        addTimeBlock("present", i)
    }
    else if(i < currentHour) {
        addTimeBlock("past", i)
    }
    else {
        addTimeBlock("future", i)
    }
}

function addTimeBlock(tense, hour) {
    let timeBlockElement = $("<div>")
    timeBlockElement.addClass("row time-block")
    
    let pElement = $("<p>")
    pElement.addClass("hour col-12 col-md-1")
    pElement.text(`${convertTime(hour)} ${checkSuffix(hour)}`)

    let textAreaElement = $("<textarea>")
    textAreaElement.val(todayStorage[hour])
    textAreaElement.addClass(`description col-12 col-md-10 ${tense}`)
    textAreaElement.attr("data-textHour", hour)

    let buttonElement = $("<button>")
    buttonElement.text("💾")
    buttonElement.data("hour", hour)
    buttonElement.addClass("saveBtn col-12 col-md-1")

    timeBlockElement.append([pElement, textAreaElement, buttonElement])
    containerElement.append(timeBlockElement)
}

function checkSuffix(hour) {
    if(hour < 12) return "AM"

    return "PM"
}

function convertTime(hour) { return moment(hour, 'HH').format('h'); }


containerElement.on("click", "button", (event) => {
    let Button = $(event.target)
    let buttonHour = Button.data("hour")
    let hourTextArea = $(`textarea[data-textHour=${buttonHour}]`, containerElement);
    
    todayStorage[buttonHour] = hourTextArea.val()
    localStorage.setItem(currentTime.format("MMMM Do, YYYY"), JSON.stringify(todayStorage))
})