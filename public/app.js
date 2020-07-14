//=======================================================//
//
//      FIRESTORE INTEGRATION
//
//
//=======================================================//
var count=0;
db.collection("wishes").onSnapshot((snapshot)=>{
    snapshot.docChanges().forEach((a)=>{
            addItem(a.doc);
    })
})

//=======================================================//
//
//      CREATING LI creating function
//
//
//=======================================================//
function addItem(item){
    let list=document.querySelector('#list');
    let list_item=document.createElement('li');

    let data=item.data();

    let id=item.id;
    list_item.setAttribute('id',id);


    //creating the text div
    let text_div=document.createElement('div');
    text_div.classList.add("text");

    let location=document.createElement('span');
    location.innerText=data.location;

    text_div.innerText=data.restaurant;
    text_div.appendChild(location);

    list_item.appendChild(text_div);

    //creating the buttons div
    let button_div=document.createElement('div');
    button_div.classList.add('li');

    let tick=document.createElement('span');
    tick.setAttribute('id','tick');
    tick.innerHTML=`<i class="fa fa-check" aria-hidden="true" ></i>`;
    button_div.appendChild(tick);

    let cross=document.createElement('span');
    cross.setAttribute('id','cross');
    cross.innerHTML=`<i class="fa fa-times" aria-hidden="true"></i>`;
    button_div.appendChild(cross);

    list_item.appendChild(button_div);

    list.appendChild(list_item);

    //changing the bg color on clicking the tick
    tick.addEventListener("click",(e)=>{
        list_item.classList.remove('red');
        list_item.classList.add('green');
        count++;
        //removing the buttons
        tick.parentElement.removeChild(tick);
        cross.parentElement.removeChild(cross);
       
    })
    cross.addEventListener("click",()=>{
        list_item.classList.remove('green');
        list_item.classList.add('red');
         //removing the buttons
         tick.parentElement.removeChild(tick);
         cross.parentElement.removeChild(cross);
        
    })

}
//creating the button

let total=document.querySelector("#total");
total.addEventListener("click",()=>{
    alert(`You've been to ${count} restaurants!!`);
})

//=======================================================//
//
//      Adding items from the form
//
//
//=======================================================//
//here we'll add the items to the database

let add_button=document.querySelector('#add');
let form=document.querySelector("form")
add_button.addEventListener("click",()=>{
    if(form.restaurant.value!=''){
    db.collection("wishes").add({
        restaurant:form.restaurant.value,
        location:form.location.value
    })
    form.restaurant.value='';
    form.location.value='';
}

})
