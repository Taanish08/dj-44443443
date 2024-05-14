song1 = "";
song2 = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreleftWrist = 0;
songstatus = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");

    songstatus.isPlaying();


    circle(rightWristX,rightWristY,20);
    
    if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Speed = 0.5x";		
			song.rate(0.5);
		}
		else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Speed = 1x";		
			song.rate(1);
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			song.rate(1.5);
		}
		else if(rightWristY >300 && rightWristY <= 400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2x";		
			song.rate(2);
		}
		else if(rightWristY >400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2.5x";		
			song.rate(2.5);
		}
	}
   
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {

    if(results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
    }
}