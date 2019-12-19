var wrapper = document.getElementById("sign"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    /*saveButton = wrapper.querySelector("[data-action=save]"),*/
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    canvas.style.border = "1px gray solid";
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

//saveButton.addEventListener("click", function (event) {
//  if (signaturePad.isEmpty()) {
//      alert("Please provide signature first.");
//  } else {
//     
//     var img_this = document.getElementById('testImg');
//     img_this.onload = function() {
//	       	var width = img_this.width,height = img_this.height;
//			var scale = width / height;
//			width1 = 720;
//			height1 = parseInt(width1 / scale);
//			
//			
//			var canvas = document.getElementById('cans');
//			canvas.width = width1; 
//			canvas.height = height1;
//			var ctx = canvas.getContext('2d');
//			/*ctx.drawImage(img_this,0,0,width,height,0,0,width1,height1);*/
//			
//			ctx.fillStyle = "#fff"; // 填充背景色
//	        ctx.fillRect(0, 0, canvas.width, canvas.height);
//	        
//	       /* •type:指定要转换的图像格式，如 image/png、image/jpeg等。
//			•args:可选参数。例如，如果type为image/jpeg，则args可以是 
//			0.0和0.1之间的值，以指定图像的品质。*/
//	
//			ctx.drawImage(img_this,0,0,width1,height1);
//		    var cropStr = canvas.toDataURL("image/jpeg",0.01);
//		    
//     };
//		img_this.src = signaturePad.toDataURL(); 
////		document.getElementById('signature-pad').style.display='none';
//
//  };
//});


// 从 canvas 提取图片 image  
/*function convertCanvasToImage(canvas) {  
    //新Image对象，可以理解为DOM  
    var image = new Image();  
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持  
    // 指定格式 PNG  
    image.src = canvas.toDataURL("image/png");  
    return image;  
}  */

/*var width = img_this.width,height = img_this.height;
var scale = width / height;
width1 = 720;
height1 = parseInt(width1 / scale);
var canvas = $("#cans");
canvas[0].width = width1; canvas[0].height = height1;
var ctx = canvas[0].getContext('2d');
ctx.drawImage(img_this,0,0,width,height,0,0,width1,height1);
  var cropStr = canvas[0].toDataURL("image/jpeg",0.7)*/