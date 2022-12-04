let elForm = document.querySelector(".login-form");
let elEmailInput = document.querySelector(".email-input")
let elPasswordInput = document.querySelector(".password-input")

let url = "https://reqres.in/api/login"


elForm.addEventListener("submit", (e) => {
e.preventDefault();

if(elEmailInput.value !== "eve.holt@reqres.in"){
    alert("User is not defined")
}
else if(!elPasswordInput.value){
    alert("Please write ur password") 
}
fetch(url, {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": JSON.stringify(
    {
      "email": elEmailInput.value,
      "password": elPasswordInput.value
  },
  )
}).then(response => response.json())
.then(data => {
    if(data?.token){
        localStorage.setItem("token", data.token)
        window.location.replace("./home.html")
    }
})

 })


