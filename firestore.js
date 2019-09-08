
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaO947iRR27ATA2CnosYY4xYwNLtHDVU8",
    authDomain: "skyline-9c630.firebaseapp.com",
    databaseURL: "https://skyline-9c630.firebaseio.com",
    projectId: "skyline-9c630",
    storageBucket: "",
    messagingSenderId: "231428382310",
    appId: "1:231428382310:web:988a6dcbac349fb2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);

function query(e) {
    e.preventDefault();
    db.collection("Individual Position").where("Position", "==", `${document.getElementById('qpos').value}`).get().
        then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().UID);
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        }
        )
}

function register(e) {
    e.preventDefault();
db.collection('Queue').doc('Queue Number').update({position: increment})
.then(function () {
    DisplayQ();
}).catch(function(error){
    console.error("Error Queing : ",error);
});
}

function DisplayQ(){

    db.collection("Queue").doc('Queue Number').get().then(function (doc) {

        var randomString = function (length) {

            var text = "";

            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

            for (var i = 0; i < length; i++) {

                text += possible.charAt(Math.floor(Math.random() * possible.length));

            }

            return text;
        }

        // random string length
        var random = randomString(10);
        var d = new Date();
        var n = d.toTimeString();
        console.log(`${doc.id} => ${doc.data().position}`);
        db.collection("Individual Position").add({
            Name: document.getElementById('name').value,
            Work: document.getElementById('work').value,
            Email: document.getElementById('email').value,
            Position: doc.data().position,
            UID: random,
            Time: n
        }).then(function(){
            var str;
            str += `<tr>
            <th>Position</th>
            <th>Time</th>
            <th>Work</th>
            <th>Name</th>
            <th>Email</th>
            <th>UID</th>
        </tr>
        <tr>
            <td>${doc.data().position}</td>
            <td>${new Date().toTimeString()}</td>
            <td>${document.getElementById('work').value}</td>
            <td>${document.getElementById('name').value }</td>
            <td>${document.getElementById('email').value }</td>
            <td>${random}</td>
            </tr>`;
        document.getElementById('show').innerHTML = str;
        }).catch(function (error) {
            console.error(error);
        })
    });
}

function live() {
    db.collection("Individual Position").orderBy('Time').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
           var str = `<tr>
            <td>${doc.data().Position}</td>
            <td>${doc.data().Name}</td>
            <td>${doc.data().Time}</td>
            <td>${doc.data().Email}</td>
            </tr>`;
            document.getElementById("live_details").innerHTML += str;
        });
    });
}

