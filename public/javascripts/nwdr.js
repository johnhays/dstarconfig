function mapCheckElement(element,data) {
        var selector = element + '[value="' + data + '"]';
        $(selector).prop("checked",true);
}

function mapSelectElement(element,data) {
        var selector = element + ' option[value="' + data + '"]';
        $(selector).prop("selected",true);
}

function upcase(ele) {
        ele.value = ele.value.toUpperCase();
}


function updateInputs(data,radiobuttons,selects) {
//        console.log("updateInputs: " + JSON.stringify(data));
        for (var p in data) {
                if( data.hasOwnProperty(p) ) {
                        elementID = "#" + p;
                        value = data[p];
                        if ($.inArray(p,radiobuttons) > -1) {
                                mapCheckElement(elementID,value);
                        } else if ($.inArray(p,selects) > -1) {
                                mapSelectElement(elementID,value);
                        } else {
                                $(elementID).val(value);
                        }
                }
        }
}
