video="";
status="";
objects=[];
object_name="";
function preload()
{
    //video=createVideo('video.mp4');
    //video.hide();
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380)
    video.hide();
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value;
}
function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            //document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected are: "+objects.length;
            fill("#B76E79");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#B76E79");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        if(objects[i].label==object_name)
        {
            //video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("number_of_objects").innerHTML=object_name+" Found";
        }
        else
        {
            document.getElementById("number_of_objects").innerHTML=object_name+" Not Found";
        }
    }
}
function gotResult(error, results)
{
   if(error)
   {
       console.log(error);
   }
   else
   {
       console.log(results);
       objects=results;
   }
}
function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
}