let challengesList;
let challengesHTML = "";

window.onload = function () {

    const insertForm = document.getElementById("uploadForm")

    async function createChallenge(event) {

        //Get the data from the form fields
        let challengeName = document.getElementById('name').value;
        let challengePts = document.getElementById('points').value;
        let challengeCourse = document.getElementById('course').value;
        let challengeSession = document.getElementById('session').value;

        fetch(`https://web2-groupbackend-teamteacher.herokuapp.com/challenges`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: challengeName,
                points: challengePts,
                course: challengeCourse,
                session: challengeSession
            })

        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log('Success:', data);
            //Add succes message

            //Update list
            await renderChallenges();
        })
    }

    // When clicking submit on the form
    insertForm.addEventListener('submit', event => {
        event.preventDefault();

        createChallenge(event);

    });

    //Add listener to challenge list
    document.getElementById('challengeList').addEventListener('click', (event)=> {
        //Keep searching for the parent node to register the correct click
        const challengeId = event.target.closest('.challenge').id;
        console.log(event.target)
        
        if(challengeId){
            if(event.target.className.indexOf('edit') !== -1){
                console.log('edit')
                
            }
            
            if(event.target.className.indexOf('trash') !== -1){
                console.log('trash')
            }

        }

    })

    async function renderChallenges() {
        // Clean previous list
        challengesHTML = '';

        let resp = await fetch('https://web2-groupbackend-teamteacher.herokuapp.com/challenges');
        let data = await resp.json();     

        data.forEach(challenge => {
            challengesHTML += `<div class="row challenge" 
            id="${challenge._id}">   
            <div class="col-10">
                <p>${challenge.course} - ${challenge.name} <span class="exp">(${challenge.points} Exp.)</span></p>
            </div>
            <div class="col-1 edit">
                <i class="fas fa-edit"></i> 
            </div>                         
            <div class="col-1 trash">
                <i class="fas fa-trash"></i>
            </div>
        </div>`
        })

        document.getElementById("challengeList").innerHTML = challengesHTML;
        
    }

    renderChallenges();


}