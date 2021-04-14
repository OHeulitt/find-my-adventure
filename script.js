const adventureApp = {};

adventureApp.apiKey = "d2391306-d8e7-4dd8-8ede-38918f5860d1"; 

// adventureApp.stateChosen;

// adventureApp.activityChosen;

// html added dynamically
adventureApp.showResults = function(destinations){

    if (destinations.length >= 1){

        destinations.forEach(function(destination){

            const resultsHTML = `
            <article class="destination clearfix">
                <p class="destinationName">${destination.RecAreaName}</p>
                <p class="destinationDescription">${destination.RecAreaDescription}</p>
                <p class="destinationArea">${destination.RecAreaDirections}</p>
            </article>
            `
            $(".destinationInfo").append(resultsHTML);
        });
    } else {
        const noReultsHTML = `
        <p class="destination noResults">Uh oh! Looks like nothing is fitting what you are looking for... Try a different combination!</p> 
        `
        $(".destinationInfo").append(noReultsHTML);
    }
    
    
};

// define a  method for accepting the values from state and activity params when submitted
// store those in a variable
adventureApp.findMyAdventure = function(){
    $(".chooseYourAdventure").on("submit", function(event){

        event.preventDefault();

        const stateChosen = $("#stateSelect option:selected").val();

        const activityChosen = $("#activitySelect option:selected").val();

        adventureApp.callingAdeventures(activityChosen, stateChosen);
    });
};
  
// ajax request
adventureApp.callingAdeventures = function (activity, state) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method:'GET',
        data: {
            reqUrl: 'https://ridb.recreation.gov/api/v1/recareas',
            params: {
                activity: activity,
                state: state
            },
            proxyHeaders: {
                apikey: adventureApp.apiKey
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function(allTheAdventures) {

        // clear old results
        $(".destinationInfo").empty();

        // data from API call
        const destinationInfo = allTheAdventures.RECDATA;
        console.log(destinationInfo)
        adventureApp.showResults(destinationInfo);
    });
};


// method to kickstart app
adventureApp.init = function() {
    adventureApp.findMyAdventure();
};

// when DOM is loaded - call init
$(function(){
    adventureApp.init();
});