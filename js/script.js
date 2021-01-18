var today = luxon.DateTime.local();
var planner = {};
var sameRow = false;

//set date
var setDate = function() {
    var day = today.get('day');
    date = today.toLocaleString({ weekday: 'long'}) + ", " + today.toLocaleString({ month: 'long',}) + " " + ordinal_suffix_of(day);
    $("#currentDay").text(date);
  };

//get the ordinal ex: 1st, 2nd, 3rd as luxon does not do this
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

setDate();
var hour = today.get('hour');
for (i = 9; i < 18; i++) {
//console.log(rowNum);
    var temp = "#" + i;
    
     if (i === hour) {
         $(temp).addClass("present");
     }
     else if (i < hour) {
         $(temp).addClass("past");
     }
     else if (i > hour) {
         $(temp).addClass("future");
    };
};

$(".description").on("click", function() {
    if (sameRow === false) {
        sameRow = true;
        console.log($(this));
        var row = $(this).attr("id")
            var temp = "#" + row;
            var text = $(this)
                .text()
                .trim();
            var textInput = $("<textarea>")
                //.addClass("form-control")
                .val(text);
            $(temp).text("");
            $(this).append(textInput);
            textInput.trigger("focus");
    };
    
});

$(".description").on("blur", "textarea", function() {
// get the text area's current value/text
var text = $(this)
    .val()
    .trim();
console.log(text);
var row = $(this).closest(".description").attr("id")
var temp = "#" + row;
console.log(temp);
$(temp).text(text);

console.log($(this).closest(".description").text());
planner[$(this).closest(".description").attr("id")] = text;
$(this).remove();
sameRow = false;

});

$("button").on("click", function() {
    var row = $(this).closest(".row").attr("id").replace('row-','');
    var text = "#" + row;
    text = $(text).text();
    planner[row] = text;
    savePlanner();
    console.log(planner);
    console.log("Hey");
});

var savePlanner = function() {
localStorage.setItem("Planner", JSON.stringify(planner));
};

var loadTasks = function() {
    planner = JSON.parse(localStorage.getItem("Planner"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!planner) {
        planner = {
        9: ["test"], 10: [], 11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: []
        };
    }
    console.log("hi");
    // loop over object properties
    $.each(planner, function(list, arr) {
    console.log(list, arr);
    temp = "#" + list;
    $(temp).text(arr);
    });
    //set the current date
    setDate();
    var hour = today.get('hour');
    //var hour = 10; //use for testing, comment out above
    for (i = 9; i < 18; i++) {
    //console.log(rowNum);
        var temp = "#" + i;
        
         if (i === hour) {
             $(temp).addClass("present");
         }
         else if (i < hour) {
             $(temp).addClass("past");
         }
         else if (i > hour) {
             $(temp).addClass("future");
        };
    };
};
loadTasks();