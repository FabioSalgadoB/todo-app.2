(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();let b;const L=new Uint8Array(16);function C(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(L)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function S(e,t=0){return s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function P(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||C)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return S(d)}class g{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new g("Piedra del alama"),new g("Piedra del infinito"),new g("Piedra del tiempo"),new g("Piedra del poder")],filter:a.All},A=()=>{v(),console.log(l),console.log("InitStore")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},I=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},k=e=>{if(!e)throw new Error("Description is requerid");l.todos.push(new g(e)),f()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},D=()=>{l.todos=l.todos.filter(e=>!e.done),f()},O=(e=a.All)=>{l.filter=e,f()},q=()=>l.filter,c={addTodo:k,delecteCompleted:D,delecteTodo:x,getCurrentFilter:q,getTodo:I,initStore:A,loadStore:v,setFilter:O,toggleTodo:U},F=`<section class="todoapp">\r
     <header class="header">\r
          <h1>Tareas</h1>\r
          <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
     </header>\r
\r
     <!-- This section should be hidden by default and shown when there are todos -->\r
     <section class="main">\r
          <input id="toggle-all" class="toggle-all" type="checkbox">\r
          <label for="toggle-all">Mark all as complete</label>\r
          <ul class="todo-list">\r
               <!-- These are here just to show the structure of the list items -->\r
               <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
               <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
               <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
          </ul>\r
     </section>\r
\r
     <!-- This footer should hidden by default and shown when there are todos -->\r
     <footer class="footer">\r
          <!-- This should be "0 items left" by default -->\r
          <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
          <!-- Remove this if you don't implement routing -->\r
          <ul class="filters">\r
               <li>\r
\r
                    <!-- selected  -->\r
                    <a class="filtro" class="selected" href="#/">Todos</a>\r
               </li>\r
               <li>\r
                    <a class="filtro" href="#/active">Pendientes</a>\r
               </li>\r
               <li>\r
                    <a class="filtro" href="#/completed">Completados</a>\r
               </li>\r
          </ul>\r
          <!-- Hidden if no completed items are left ↓ -->\r
          <button class="clear-completed">Borrar completados</button>\r
     </footer>\r
</section>\r
\r
\r
<footer class="info">\r
     <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
     <!-- Change this out with your name and url ↓ -->\r
     <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
     <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,M=e=>{if(!e)throw new Error("A TODO object is requerid");const{done:t,description:i,id:d}=e,o=` 

                <div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""}>
                    <label>${i}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let w;const N=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=c.getTodo(a.Pending).length};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element  ${e}  not found`);h.innerHTML="",t.forEach(i=>{h.append(M(i))})},m={ClearCompletedButton:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const r=c.getTodo(c.getCurrentFilter());H(m.TodoList,r),console.log(r),i()},i=()=>{N(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=F,document.querySelector(e).append(r),t()})();const d=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompletedButton),u=document.querySelectorAll(m.TodoFilters);d.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().lenght!==0&&(c.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",y=r.target.closest("[data-id]");!y||!p||(c.delecteTodo(y.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{c.delecteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(y=>y.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();V("#app");
