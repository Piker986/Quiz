let questions=[
    {
        numb: 1,
        question:"what does the HTML stands for ?",
        answer: "hyper text markup language",
        options:[
         "hypertext processo language",
         "hyper text markup language",
         "hyper texr transfer language",
         "hyper tool multilanguage"
        ]
     
    },
    {
        numb: 2,
        question:"examples of polymorphism?",
        answer: "methodoverloading and method overriding",
        options:[
         "inheritance",
         "abstraction",
         "methodoverloading and method overriding",
         "ducktyping"
        ]
     
    },
    {
        numb: 3,
        question:"what does the oops stands for ?",
        answer: "object oriented programming",
        options:[
         "object oriented programming",
         "object occasion language",
         "object ops programs",
         "object orentation program"
        ]
     
    },
    {
        numb: 4,
        question:"python is ____ language ?",
        answer: "interpretered language",
        options:[
         "markup language",
         "compiled and dynamic typed language",
         "compiled language",
         "interpretered language"
        ]
     
    },
    {
        numb: 5,
        question:"bootstrap is a ?",
        answer: "css frame work",
        options:[
         "java frame work",
         "css frame work",
         "python frame work",
         "django frame work"
        ]
     
    }  
    ]
    const start_btn=document.querySelector(".start_btn button");
const info_box=document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box=document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
const time_count=document.querySelector(".timer .timer_sec");
const time_line=document.querySelector("header .time_line");
const time_text=document.querySelector(".time_left_txt")
start_btn.onclick=()=>{
    info_box.classList.add("activeInfo")
}
exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo")
}
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activeQuiz")
    showQuestions(0)
    que_last(1)
    startTimer(15)
    startTimerload(0)
    
}
let question_count=0;
let ques_num=1;
let count;
let timervalue=15;
let widthvalue=0;
let userScore=0;
let scoretag;
const next=document.querySelector(".next_btn")
const result_box=document.querySelector(".result_box")
const res_restart=document.querySelector("#resreplay")
const res_quit=document.querySelector("#resquitquiz")
res_quit.onclick=()=>
{
    window.location.reload()
}
res_restart.onclick=()=>
{
    quiz_box.classList.add("activeQuiz")
    result_box.classList.remove("activeResult")
    timervalue=15;
    question_count=0;
    ques_num=1;
    widthvalue=0;
    showQuestions(question_count);
    que_last(ques_num);
    clearInterval(count);
    startTimer(timervalue);
    clearInterval( counttimer)
    startTimerload(widthvalue)
    next.style.display="none";
}

next.onclick=()=>
{
    if(question_count< questions.length-1)
    {
        question_count++;
        ques_num++;
        showQuestions(question_count);
        que_last(ques_num);
        clearInterval(count);
        startTimer(timervalue);
        clearInterval( counttimer)
        startTimerload(widthvalue)
        next.style.display="none";
        time_text.textContent="Time Left";


    }
    else
    {
        clearInterval(count);
        clearInterval( counttimer)
        console.log("questions completed");
        result_Box();
        
    }
   

}
function showQuestions(index)
{
    const que_text=document.querySelector(".que_text")
    que_tag= '<span>'+(question_count+1)+" "+questions[index].question+'</span>'
let option_tag= '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
    +'<div class="option"><span>'+questions[index].options[1] +'</span></div>'
    +'<div class="option"><span>'+questions[index].options[2] +'</span></div>'
    +'<div class="option"><span>'+ questions[index].options[3]+'</span></div>';
    que_text.innerHTML=que_tag
    option_list.innerHTML=option_tag
    const option=option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++)
    {
        option[i].setAttribute("onclick","optionselected(this)")
    }
}
    let tick_icon='<div class="icon tick"><span class="material-icons">check</span></div>';
    let cross_icon='<div class="icon cross"><span class="material-icons">close</span></div>';
    function optionselected(answer)
    {
        next.style.display="block";
        clearInterval(count);
        clearInterval(counttimer);
        let user_answer=answer.textContent;
        let correct_answer=questions[question_count].answer;
        let all_options=option_list.children.length;
        if(user_answer==correct_answer)
        {
            userScore+=1;
            answer.classList.add("correct")
            console.log("correctanswer")
            answer.insertAdjacentHTML("beforeend",tick_icon)
            console.log(userScore)
         
        }
        else
        {
            answer.classList.add("incorrect")
            console.log("wrong answer");
            answer.insertAdjacentHTML("beforeend",cross_icon)

        }
        for (let i=0;i<all_options;i++)
        {
            if(option_list.children[i].textContent==correct_answer)
            {
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tick_icon)
            }
        }
        
        for(let i=0;i<all_options;i++){
            option_list.children[i].classList.add("disabled");
        }
        next.style.display="block";
    }
    function startTimer(time)
    {
        count=setInterval(timer,1000)
        function timer()
        {
            time_count.textContent=time;
            time--;
            if(time<9)
            {
                let addZero=time_count.textContent;
                time_count.textContent="0"+addZero;
            }
            if(time<0)
            {
                clearInterval(count)
                time_text.textContent="Time Off";
            }
        }
       
    }

    function startTimerload(time)
    {
        counttimer=setInterval(timer,29);
        function timer()
        {  
            time+=1;
            time_line.style.width=time +"px";
            if(time>549)
            {
                clearInterval(counttimer);
            }
        }
       
    }
    function result_Box()
    {
        info_box.classList.remove("activeInfo")
        quiz_box.classList.remove("activeQuiz")
        result_box.classList.add("activeResult")
        const score_text=document.querySelector(".score_text")
        if(userScore<=3)
        {
           scoretag='<span> Awesome your score is <p>'+userScore+'</p> of 5 </span>'
           score_text.innerHTML=scoretag;
        }
        else if(userScore==5)
        {
            scoretag='<span>just rocked your score is <p>'+userScore+'</p> of 5 </span>'
            score_text.innerHTML=scoretag;

        }
        else if(userScore<=1)
        {
            scoretag='<span>sorry you score is only  <p>'+userScore+'</p> of 5 </span>'
            score_text.innerHTML=scoretag;

        }
        else
        {
            scoretag='<span> your score is  <p>'+userScore+'</p> of 5 </span>'
            score_text.innerHTML=scoretag;

        }

    }

    

    

    function que_last(index)
    {
    const total_questions_count=document.querySelector(".total_que");
    const change_question_number='<span><p>'+(question_count+1)+'</p><p>of</p><p>'+questions.length+'</p><p>Questions</p></span>'
    total_questions_count.innerHTML=change_question_number;
    }
   