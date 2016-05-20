NWF$(document).ready(function() {
 //var dropdown = NWF$("#"+GovernorateID);
 //console.log(dropdown+'dropdown');
 //dropdown.onchange(setTextBoxFromDropDown);
 NWF$(document.body).on("change","#"+GovernorateID, function (){
  console.log(GovernorateID+"ID...");
  var selected = NWF$(this).find(":selected").text();
 //var selectedItem =NWF$('#'+GovernorateID+'option:selected').text();
 console.log(NWF$('#'+GovernorateID+'option:selected').val());
 console.log(selected +'  /selected item');
    //var selectionText = selection.text();
    NWF$("#" + ValueID).val(selected);
    //NWF$("#" + GovernorateID).prop('selectedIndex', 0);
 });
});


NWF$(document).ready(function() {
var sText = NWF$("select[title='Governorate'] option:selected").text();
});
NWF$("#" + 'ctl00_ctl33_g_6e56442b_1e79_4873_b017_00d3c22fbbdb_ctl00_ListForm2_formFiller_FormView_ctl17_ab60d037_f399_49d9_a19c_024734000923').val();
ctl00_ctl33_g_6e56442b_1e79_4873_b017_00d3c22fbbdb_ctl00_ListForm2_formFiller_FormView_ctl25_lookup50dd69b1_624a_404f_a808_79068f172a3c_Lookup