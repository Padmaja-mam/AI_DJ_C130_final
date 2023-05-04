song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song1Status = "";
song2Status = "";

function preload()
{
 song1 = loadSound("NaatuNaatu.mp3");
 song2 = loadSound("Janani.mp3");
}

function setup()
{
  canvas = createCanvas(600,500);
  canvas.position(550, 220);
  
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  scoreLeftWrist =  results[0].pose.keypoints[9].score;
  console.log("Score of Left Wrist : " + scoreLeftWrist);

  scoreRightWrist =  results[0].pose.keypoints[10].score;
  console.log("Score of Right Wrist : " + scoreRightWrist);
  }
}

function draw()
{
  image(video,0,0,600,600);

  song1Status = song1.isPlaying();
  console.log("Song1 Status : " + song1Status);

  song2Status = song2.isPlaying();
  console.log("Song2 Status : " + song2Status);


  if(scoreLeftWrist > 0.2)
  {
    stroke("red");
    fill("blue");
    circle(floor(leftWristX),floor(leftWristY),30);

    song2.stop();
  
  
    if(song1Status = "false")
    {
    song1.play();
    document.getElementById("song_name").innerHTML = "Naatu-Naatu";
    }

  }
  if(scoreRightWrist > 0.2)
  {
   stroke("magenta");
   fill("yellow");
   circle(floor(rightWristX),floor(rightWristY),30);

   song1.stop();
  

   if(song2Status = "false")
   {
    song2.play();
    document.getElementById("song_name").innerHTML = "Janani";
   }

  }

}
