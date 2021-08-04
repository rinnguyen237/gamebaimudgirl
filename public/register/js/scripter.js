function clickRegister() {
    document.getElementById("register-tab-img").src = "./images/tab-dangky-active.png";
    document.getElementById("login-tab-img").src = "./images/tab-dangnhap.png";
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
  }
  function clicklogin() {
    document.getElementById("register-tab-img").src = "./images/tab-dangky.png";
    document.getElementById("login-tab-img").src = "./images/tab-dangnhap-active.png";
    document.getElementById("register").style.display ="none";
    document.getElementById("login").style.display = "block";
  }
  