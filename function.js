

let links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', () => {
    
    links.forEach(l => l.classList.remove('active'));
    
   
    link.classList.add('active');
  });
});

const text = document.querySelector(".profession");
const textLoad = ()=>{
    setTimeout(() => {
        text.textContent = "UI/UX designer";
        
    },0);
    setTimeout(() => {
        text.textContent = "Web Developer";
        
    },1000);
    setTimeout(() => {
        text.textContent = "Freelancer";
        
    },2000);
}
textLoad();
setInterval(textLoad,3000);

function contact () {
  
    
    document.querySelector('.discription').innerHTML = 
     `<div class="contact-container">
        <input class="input-contact" type="text" placeholder="Name">
        <input class="input-contact" type="text" placeholder="Email">
        <p class="contact-p">Your Message:</p>
        <textarea type="text" class="msge" placeholder="text here..."></textarea>  
       <div> <button class="send-button">Send</button>
             <button class="delete-button";>Delete</button>
       </div>
       </div>
   
    `;
}
function home(){

 document.querySelector('.discription').innerHTML=
    `
            <img class="home-img" src="profile.jpg" alt="">
        
        <div class="discription-h"> 
            <h2>Hi, I'm <span>Lensen Degife</span></h2>
            <h4><span class="profession">Web developer</span></h4>
            <p class="topic">
             I really want to improve and get to high level in tech industry.<br> I bring ideas to life through clean <br>code and thoughtful design.<br> Share your ideas with me and let's get in touch.<br>Thank you! 🙏
            </p>
            
        </div>
    `;
}
function about(){
 
    
     document.querySelector('.discription').innerHTML=
    `  <div >
            <img class="home-img" src="profile.jpg" alt="">
        </div>
    <div class= "more-me">
  
            <p>Full name: Lensen Degife</p>
            <p>Age: 19 years </p>
            <p>Sex: Male</p>
            <p>Secondary School: BSP</p>
            <p>Entrance Result: 545 out of 600</p>
            <p>Address: South Ethiopia</p>
            <p>University: Addis Ababa University</p>
            <p>Department: Computer Science</p>
        </div> 
    `;
}
function portifolio(){

     document.querySelector('.discription').innerHTML=
     `<div>
     <div>
     <div class="Portifolio-container">
            <div class="Certificates";">Certificates
            <p>Udacity
            <a href="udacity.certificate.pdf" download>Download PDF</a>
            </p>
            <p>Simpli learn
            <a href="simplilearnCertificate.pdf" download>Download PDF</a>
            </p>
            </div>
            <div class="works">Previous Works </div>
            <div class="experience">Experience</div>
        
        </div> 
        <div>
    </div> 
    <div class="languages"> Skills
        <div class="skills" ><P>C++  </P><input class = "input-portifolio" type="range" value="70" disabled></div>
            <div class="skills" ><P>Javascript </P><input class = "input-portifolio" type="range" value="70" disabled></div>
            
            <div class="skills" ><P>Javascript </P><input class = "input-portifolio" type="range" value="70" disabled></div>
            <div class="skills" ><P>HTML and CSS </P><input class = "input-portifolio" type="range" value="70" disabled></div>
    </div> 
        
    `
}
function certificateImg(){
  
     document.querySelector('.Portifolio-container').innerHTML=
     `   
            <div class="Portifolio-container">
            <div class="Certificates-download" ">
         
           <p>Udacity
          <a href="udacity.certificate.pdf" download>Download PDF</a></p>
           </div>
            <div class="works">Previous Works</div>
            <div class="languages">Learnt languages</div>
            <div class="experience">Experience</div>
        </div>  
    `
   
      
}

