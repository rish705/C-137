var status = ""
objects = []

function preload() {

}

function setup() {
    let cnv = createCanvas(380, 380)
    cnv.position(530, 340);
    video = createCapture(VIDEO)
    video.hide()
    video.size(380, 380)
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded())
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_name = document.getElementById("Ygame").value

}

function modelLoaded() {
    console.log("Model is Loaded")
    status = true
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            fill("#ff0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects[i].label == object_name) {
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById("object_status").innerHTML = object_name + " Found"
                synth = window.speechSynthesis
                Utterthis = new SpeechSynthesisUtterance(object_name + " Found")
                synth.speak(Utterthis)
            } else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found"
                synth = window.speechSynthesis
                Utterthis = new SpeechSynthesisUtterance(object_name + " Not Found")
                synth.speak(Utterthis)
            }
        }
    }
}