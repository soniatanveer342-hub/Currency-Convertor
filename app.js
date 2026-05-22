const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

for(let select of dropdowns){
    for (currcode in countryList ){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && currcode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flagUpdate(evt.target);
        });
}

const flagUpdate = (element)=>{
let currcode = element.value;
let countryCode = countryList[currcode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img")
img.src = newSrc;
};
btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue==="" || amtValue<1){
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`
    let response = await fetch(URL);
    let data = await response.json();

    console.log(data);
})
