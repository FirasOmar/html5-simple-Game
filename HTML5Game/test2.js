NWF$(document).ready(function () {
 var listname="CitiesList";
   
 
     var newfield="Title";
     var Lookupfield="Governorate";
       NWF$(document.body).on("change", ".js-cascading-dropdown-parent", function () {    // find the selected city option
    var selected = NWF$(this).find(":selected").text();
  console.log(selected+' selected ');  
    var DropDown = NWF$(this).parents(".js-cascading-dropdown-panel").find(".js-cascading-dropdown-child select");   NWF$(this).parents(".js-cascading-dropdown-panel").find(".js-cascading-dropdown-child option").remove();
                       
    // Rertive data by caml query<FieldRef Name='ID' />
      var caml = "<View><Query>"
      + "<Where><Eq><FieldRef Name='"+Lookupfield+"' /><Value Type='Lookup'>"+selected+"</Value></Eq></Where>"
       + "</Query>"
       + "<ViewFields><FieldRef Name='"+newfield+"' /></ViewFields>"
       + "</View>";
       console.log(caml+' caml ');
      var ctx = SP.ClientContext.get_current();
      var web = ctx.get_web();
      var list = web.get_lists().getByTitle(listname);
 console.log(list+' list');
      var query = new SP.CamlQuery();
      query.set_viewXml(caml);
      var id='' ;
      var items = list.getItems(query);
   console.log(items+' items ');
      ctx.load(items)
   
      ctx.executeQueryAsync(function() {
      var enumerator = items.getEnumerator();
      var i="";
   var ix="0";
   id = "<option value title data-nfchoicevalue ></option>" ;
      while (true) {
  
      i = enumerator.moveNext();
       if (i != true) break;
    
       var item = enumerator.get_current();
   
   
   
     id += "<option value='" + item.get_item('ID') + "' title='"+ item.get_item(newfield) +"' data-nfchoicevalue='" + item.get_item('ID') + ';#' + item.get_item(newfield) +"'>" + item.get_item(newfield) + "</option>" ;
  
          
  
      }
  
    DropDown.html(id);
      });
           
    });    NWF$(document.body).on("change", ".js-cascading-dropdown-child", function () {                       
      NWF$(this).find(":selected").attr("selected","selected");
                        var selected2 = NWF$(this).find(":selected").text();
      
 });
});
