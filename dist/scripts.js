let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e?t.push(e):console.log("pokemon is not correct")}function i(){return t}function n(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.height=e.height,t.weight=e.weight,t.types=[];for(var i=0;i<e.types.length;i++)t.types.push(e.types[i].type.name);t.abilities=[];for(var i=0;i<e.abilities.length;i++)t.abilities.push(e.abilities[i].ability.name)}).catch(function(t){console.error(t)})}function a(t){n(t).then(function(){var e;let i,n,a,o,l,r,s,p,c;console.log(t),e=t,i=$(".modal-body"),n=$(".modal-title"),$(".modal-header"),n.empty(),i.empty(),a=$("<h1>"+e.name+"</h1>"),(o=$('<img class="modal-img" style="width:50%">')).attr("src",e.imageUrlFront),(l=$('<img class="modal-img" style="width:50%">')).attr("src",e.imageUrlBack),r=$("<p>height : "+e.height+"</p>"),s=$("<p>weight : "+e.weight+"</p>"),p=$("<p>types : "+e.types+"</p>"),c=$("<p>abilities : "+e.abilities+"</p>"),n.append(a),i.append(o),i.append(l),i.append(r),i.append(s),i.append(p),i.append(c)})}return document.querySelector("#modal-container"),{add:e,getAll:i,addListItem:function t(e){let i=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("group-list-item");let o=document.createElement("button");o.innerText=e.name,o.classList.add("button-class"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#modal-container"),o.classList.add("btn"),n.appendChild(o),i.appendChild(n),o.addEventListener("click",function(t){a(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){let i={name:t.name,detailsUrl:t.url};e(i),console.log(i)})}).catch(function(t){console.error(t)})},loadDetails:n,showDetails:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});