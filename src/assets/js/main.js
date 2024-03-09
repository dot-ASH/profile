if (typeof window !== "undefined") {
  const c1 = document.getElementById("c1");
  const c2 = document.getElementById("c2");
  const c3 = document.getElementById("c3");
  const about = document.getElementById("about");
  const dpBG = document.querySelectorAll(".dp");
  const yearBG = document.querySelector(".year-text-bg");
  const cookieText = document.querySelectorAll(".cookie-text");
  const aboutTextColor = document.querySelectorAll(".text-color");
  const myImage = document.getElementById("prod");

  if (c1) {
    c1.addEventListener("click", (e) => {
      about.style.color = "#494f42";
      about.style.background =
        "linear-gradient(0deg, rgb(255, 242, 237) 0%,rgba(255, 229, 217, 1) 30%,rgba(255, 201, 176, 1) 100%)";
      dpBG.forEach((element) => {
        element.style.background = "#ffe5d9";
      });
      yearBG.style.background = "#ffe5d9";
      yearBG.style.color = "#5A5549";
      cookieText.forEach((element) => {
        element.style.fill = "#5A5549";
      });
      aboutTextColor.forEach((element) => {
        element.style.color = "#494f42";
      });
      myImage.src = "/icon.png";
    });
  }
  if (c2) {
    c2.addEventListener("click", (e) => {
      about.style.color = "#494f42";
      about.style.background =
        "linear-gradient(0deg, rgba(254,255,254,1) 5%, rgba(224,242,217,1) 64%, rgba(199,222,191,1) 100%)";
      dpBG.forEach((element) => {
        element.style.background = "#E5F4DF";
      });
      yearBG.style.background = "#E5F4DF";
      yearBG.style.color = "#5A5549";
      cookieText.forEach((element) => {
        element.style.fill = "#5A5549";
      });
      aboutTextColor.forEach((element) => {
        element.style.color = "#494f42";
      });
      myImage.src = "/icon.png";
    });
  }

  if (c3) {
    c3.addEventListener("click", (e) => {
      about.style.color = "#ead6d6";
      about.style.background =
        "linear-gradient(0deg, rgba(157,129,137,1) 1%, rgba(127,101,108,1) 57%, rgba(113,86,93,1) 100%)";
      dpBG.forEach((element) => {
        element.style.background = "#947981";
      });
      yearBG.style.background = "#947981";
      yearBG.style.color = "#ffe5d9";
      cookieText.forEach((element) => {
        element.style.fill = "#ffe5d9";
      });
      aboutTextColor.forEach((element) => {
        element.style.color = "#ead6d6";
      });
      myImage.src = "/icon-dark.png";
    });
  }
}
