
const content_container = document.getElementById("info-container");
const btn_proyectos = document.getElementById("btn-proyectos");
const btn_experiencia = document.getElementById("btn-experiencia");
const btn_estudios = document.getElementById("btn-estudios");
const btn_herramientas = document.getElementById("btn-herramientas");
const btn_contacto = document.getElementById("btn-contacto");

function showProyectos(){
    content_container.innerHTML = `<h1>Proyectos<h1/>
    `;
}
btn_proyectos.onclick = showProyectos;
btn_proyectos.addEventListener('click', ()=>{
    content_container.innerHTML = `<h1>Experiencia<h1/>
    `;
});
btn_proyectos.addEventListener('click', ()=>{
    content_container.innerHTML = `<h1>Estudios<h1/>
    `;
});
btn_proyectos.addEventListener('click', ()=>{
    content_container.innerHTML = `<h1>Herramientas<h1/>
    `;
});
btn_proyectos.addEventListener('click', ()=>{
    content_container.innerHTML = `<h1>Contacto<h1/>
    `;
});