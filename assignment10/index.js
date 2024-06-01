var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var rowData = document.getElementById('row');
var tab = document.getElementById('tab');


var siteList;

if(localStorage.getItem('siteList') != null){
    siteList = JSON.parse(localStorage.getItem('siteList'));

    displaysites(siteList);
}
else{
    siteList = [];
}

function addSite(){
    var site ={
        name : bookmarkName.value,
        url : bookmarkURL.value
    }


    if(bookmarkName.classList.contains('is-valid')&&
    bookmarkURL.classList.contains('is-valid')){
        siteList.push(site);
        console.log(siteList);
    
        localStorage.setItem('siteList', JSON.stringify(siteList));
        displaysites(siteList);
        tab.classList.add('d-none');
    }
    else{
        console.log('false');
        tab.classList.remove('d-none');
    }

    clearForm();
}



function displaysites(list){
    var cartoona ='';
    for(var i=0; i<list.length; i++){
        cartoona+=`
        <tr>
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td>
        <button class="btn btn-success">
            <a href="${list[i].url}" class="text-decoration-none text-light">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit
            </a>
        </button>
    </td>
            <td>
                <button class="btn btn-danger" onclick="deleteSite(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>`
    }
    rowData.innerHTML = cartoona;
}

function validateInputs(element){
    var regex = {
        bookmarkName : /(.*[a-z]){3}/,
        bookmarkURL : /.+\.[a-zA-Z]{2,}/
    };
    if(regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}

function hide(){
    tab.classList.add('d-none');
}

function deleteSite(index){
    siteList.splice(index, 1);

    localStorage.setItem('siteList', JSON.stringify(siteList));

    displaysites(siteList);
}

function clearForm(){
    bookmarkName.value = '';
    bookmarkURL.value = '';
}