leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
divino1 = 0;
no1 = 0;
song = "";
video = "";
leftWristScore = 0;
rightWristScore = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model Loaded!!!!!!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 600);
    if (leftWristScore > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristx, leftWristy, 20);
        leftyno = number(leftWristy);
        no1 = floor(leftyno);
        divino1 = no1 / 600;
        song.setVolume(divino1);
        document.getElementById("vol").innerHTML = "Volume = " + volume;
    }
    if (rightWristScore > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(rightWristx, rightWristy, 20);
        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("sped").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("sped").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("sped").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("sped").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("sped").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        if (rightWristy > 500 && rightWristy <= 600) {
            document.getElementById("sped").innerHTML = "Speed = 3x";
            song.rate(3);
        }

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}