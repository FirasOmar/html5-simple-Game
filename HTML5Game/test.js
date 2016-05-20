NWF$(document).ready(function () {
            // bind handler to the change event on each parent drop down. Note: use JQuery 'on' method so that //elements that are dynamically added to page receive handler too.
            NWF$(document.body).on("change", ".js-cascading-dropdown-parent", function () {
 
                        // find the selected city option
                        var selectedCity = NWF$(this).find(":selected").text();
						console.log(selectedCity+'---------');
                        // build the SP REST URL to call
                        busyCursor();
                        var siteUrl = window.location.protocol + "//" + window.location.host+_spPageContextInfo.webServerRelativeUrl;
						console.log(siteUrl+'++++');
						//var test = siteUrl + "/sites/Firas/Lists/CitiesList?$expand=Governorate";	
					   var restQuery = siteUrl + "/lists/_vti_bin/listdata.svc/CitiesList?$expand=Governorate&$filter=Governorate/Cities eq '" +selectedCity + "'";
						console.log(restQuery+'*****');
                         // find the hotel drop down
                         var hotelDropDown = NWF$(this).parents(".js-cascading-dropdown-panel").find(".js-cascading-dropdown-child");
							console.log(hotelDropDown+'0000000');
                        // call the REST service to retrieve hotel options relevant to current city selection
                        NWF$.getJSON(restQuery, function (data) {
 
                                      // build the HTML for the child drop down
                                      var options = "";
                                         NWF$(data.d.results).each(function () {
                                                 options += "<option value='" + this.Id + "'>" + this.Cities + "</option>";
                                          });
 
                                       // set the drop down options
                                       hotelDropDown.html(options);
                                       defaultCursor();
                          });
             })
});
 
function busyCursor() {
    document.body.style.cursor = "wait";
}
 
function defaultCursor() {
    document.body.style.cursor = "default";
}