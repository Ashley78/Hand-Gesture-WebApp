prediction1=""
prediction2=""

Webcam.set( {
   width=350,
   height=300,
   image_format='png',
   png_quality=90
});

camera=document.getElementById("cam");
Webcam.attach('#cam');

function take_snapshot(){
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SsirYV3oG/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is"+prediction1;
    speak_data2="The second prediction is"+prediction2;
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
       console.log(results);
       document.getElementById("result_gesture_name").innerHTML=results[0].label;
       document.getElementById("result_gesture_name2").innerHTML=results[1].label;
       prediction1=results[0].label;
       prediction2=results[1].label;
       speak();

       if(results[0].label == "Amazing"){
           document.getElementById("update_gesture").innerHTML="&#128072;";
    }
       if(results[0].label == "All the best"){
        document.getElementById("update_gesture").innerHTML= "&#9997;";
    }
    if(results[0].label == "Cheese"){
        document.getElementById("update_gesture").innerHTML="&#9996;";
    }

    }

}