const signinForm = document.querySelector("form.signin");
const signinBtn = document.querySelector("label.signin");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
    
    signupBtn.onclick = (()=>{
      signinForm.style.marginLeft = "-50%";
    });
    
    signinBtn.onclick = (()=>{
      signinForm.style.marginLeft = "0%";
    });
    
    signupLink.onclick = (()=>{
      signupBtn.click();
      return false;
    });