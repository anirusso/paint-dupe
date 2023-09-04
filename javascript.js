$(function() {

  $(".colorPicker div").each(function() {
    let text = $(this).attr("id")
    $(this).css("background-color", text)
  })

  //cursor = paint or eraser
  var paint = false;
  var paint_erase = "paint";

  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d");
  var container = $("#container");

  var mouse = {
    x: 0,
    y: 0
  };

  //load saved image
  if (localStorage.getItem("imgCanvas") != null) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.src = localStorage.getItem("imgCanvas");
  };
  //set drawing parameters (lineWidth, lineJoin, lineCap)
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  //click inside container
  container.mousedown(function(e) {
    paint = true;
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  });

  //move the mouse while holding mouse key
  container.mousemove(function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
      if (paint_erase == "paint") {
        //get color input
        let color = $(".chosen").attr("col")
        ctx.strokeStyle = color;
      } else {
        //white color
        ctx.strokeStyle = "white";
      }
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });
  container.mouseup(function() {
    paint = false;
  });

  container.mouseleave(function() {
    paint = false;
  });

  $("#reset").click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
  });

  $("#save").click(function() {
    if (typeof(localStorage) != null) {
      localStorage.setItem("imgCanvas", canvas.toDataURL());
    } else {
      window.alert("Your browser does not support local storage!");
    }
  });

  $("#erase").click(function() {
    if (paint_erase == "paint") {
      paint_erase = "erase";
    } else {
      paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
  });

  $(".color").click(function() {
    let color = $(this).attr("id");
    $(".chosen").attr("col", color);
    $(".chosen").css("background-color", color);
  })

  $("#hidden").change(function() {
    let color = $("#hidden").val();
    $(".chosen").attr("col", color);
    $(".chosen").css("background-color", color);
  })

  //change lineWidth using slider
  $("#slider").slider({
    min: 1,
    max: 30,
    slide: function(event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value;
    }
  });

});
