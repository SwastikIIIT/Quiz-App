const que=document.querySelector(".question");  //h2
const options=document.querySelector(".options");  //options ke buttons
const nextButton=document.querySelector(".next"); 

// console.log(nextButton);
var quesIndex=0; 
var score=0;

function displayQuestion(){
    clearPrevOptions();
   
    let  questionData=QuestionCollection[quesIndex];
     que.textContent=(quesIndex+1)+".) "+questionData.question;
    
     nextButton.style.display="none";
     questionData.answers.forEach((itr)=>{       

          //Creating a button and adding it to div class options
          const btn=document.createElement("button");
          btn.textContent=itr.text;
          options.append(btn);

          //Setting a data attribute to isolate correct option buy means of dataset
            if(itr.correct)
             btn.dataset.correct=itr.correct;

          btn.addEventListener("click",(e)=>{
               if(e.target.dataset.correct==="true"){
               e.target.classList.add("correct");
               score++;
               }
               else
               e.target.classList.add("incorrect");
            
               Array.from(options.children).forEach((button)=>{
                  if(button.dataset.correct==="true")
                  button.classList.add("correct");
                
                  // To make other buttons unclickable after getting the answer
                  button.disabled=true;
               }) 
               nextButton.style.display="block";
          })
     })
}

nextButton.addEventListener("click",(e)=>{
       if(quesIndex<QuestionCollection.length){
         quesIndex++;
         if(quesIndex<QuestionCollection.length)
         displayQuestion();

         else{
            clearPrevOptions();
            que.innerHTML=`You have scored ${score} out of ${QuestionCollection.length}`;
            nextButton.innerHTML="Play Again";
        }
    }
    
    else{
        start();
    }
})


function start(){
    quesIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    clearPrevOptions();
    displayQuestion();
}

const clearPrevOptions=()=>{
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
};

start();
