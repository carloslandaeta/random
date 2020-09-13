function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function parseSerials(){
    document.querySelector("#checkedSerials").value = "";
    newSerials = document.getElementById('unCheckedSerials').value;
    newSerialsRows = newSerials.split(/\n/);
    for(var i in newSerialsRows){
    newsSerialItem = newSerialsRows[i];
    newsSerialItem.trim();
    // Entrar serial en caja de busqueda y activar 
    runSerial(newsSerialItem);
    // Esperar respuesta del server (numero magico)
    await this.timeout(3000);
    // Copiar estatus
    newSerialStatus = document.querySelector("#clsDeviceHistoryContainer > div > div.row.current_results_container > span > div.curren_device_details > div:nth-child(1) > dl > dd:nth-child(4)").textContent.trim();
    newSerialDate = document.querySelector("#tabRow > td.ng-scope.show-Date > span").textContent.trim();
    newSerialNumber = document.querySelector("#tabRow > td.ng-scope.show-Subscriber > span").textContent.trim();
    // Mover a completado
    checked = document.querySelector("#checkedSerials").value;
    if(checked.length > 0){
        linebreak = '\n';
    }else{
        linebreak = 'serial,status,phone,act_date\n';
    }    
    
    if(i < (newSerialsRows.length - 1)){
        document.querySelector("#checkedSerials").value = checked + linebreak + newSerialsRows[i] +',' + newSerialStatus + ',' + newSerialNumber + ',' + newSerialDate;
        v = i;
        v++;
        document.querySelector("#currentCount").textContent = v;
        document.querySelector("#toCount").textContent = newSerialsRows.length - 1;
    }
    
    // Avisar que termino
    if(i == (newSerialsRows.length - 1)){
            alert("Bache Completado")    
        }
    }
}
function runSerial(serial){
    searchBox = document.getElementById("device-history-search-input");
    searchBox.focus();
    searchBox.value = serial;
    var event = new Event('change');
    // Dispatch it.
    searchBox.dispatchEvent(event);
    var evt = new KeyboardEvent('keydown', { key: 13 });
    searchBox.dispatchEvent(evt); 
    document.getElementById('device-history-btnSearch').click();
}


var html;
html+= '<div style="position: fixed; top:60px;left:0px; display:block; width:18%; height:600px;background-color:#333;border: solid 1px #222;padding:10px;z-index:100"><h3 style="font-family: Arial; color:#FFF">Serials</h3><textarea style="width:100%;height:200px;padding:0;margin:0;font-size:10px;font-family: Arial;" id="unCheckedSerials"></textarea><button onclick="parseSerials();">Go</button></div><div style="position: fixed; top:60px;right:0px; display:block; width:20%; height:600px;background-color:#333;border: solid 1px #222;padding:10px;z-index:100;"><h3 style="font-family: Arial; color:#FFF">Current status <span id="currentCount">0</span>/<span id="toCount">0</span></h3><textarea style="width:100%;height:200px;padding:0;margin:0;font-size:10px;font-family: Arial;" id="checkedSerials"></textarea></div>';
    
var myDiv = document.createElement("div");
//Set its unique ID.
myDiv.id = 'serialChecker';
//Add your content to the DIV
myDiv.innerHTML = html;
//Finally, append the element to the HTML body
document.body.appendChild(myDiv);
