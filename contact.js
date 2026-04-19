function sendmail() {
    var params = {
     name: document.getElementById("name").value,
     phone: document.getElementById("phone").value,
     email: document.getEelemntById("email").value,
     car: document.getElementById("car").value,
     messge: document.getElementById("message").value,

    };
    const serviceId = "service_k798ncu";
    const templateId = "template_8t8o6t6";

emailjs.send(serviceId, templateId, params).then(
    (res) => {
   document.getElementById("name").value = " ";
   document.getElementById("phone").value = " ";
   document.getElementById("email").value = " ";
   document.getElementById("car").value = " ";
   document.getElementById("message").value = " ";
   console.log(res);
   alert("Your message has been sent successfully!");
}
).catch((err) => console.log(err));
}

