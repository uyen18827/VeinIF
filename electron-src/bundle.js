(()=>{"use strict";let e={id:0,playerName:"",pronouns:{Category:"",subjectPro:"",objectPro:"",possAdj:"",possessivePro:"",reflex:"",is:""}};const t=[{Category:"He/Him",subjectPro:"he",objectPro:"him",possAdj:"his",possessivePro:"his",reflex:"himself",is:"he is"},{Category:"She/Her",subjectPro:"she",objectPro:"her",possAdj:"her",possessivePro:"hers",reflex:"herself",is:"she is"},{Category:"They/Them",subjectPro:"they",objectPro:"them",possAdj:"their",possessivePro:"theirs",reflex:"themselves",is:"they are"}];function o(){let e=document.getElementById("pronouns");if(e){let i=t.length;for(var o=0;o<i;o++){let n=`\n            <input type="radio" id="${t[o].subjectPro}" name="pronouns" value="${t[o].Category}">\n            <label for="${t[o].subjectPro}">${t[o].Category}</label><br>`;e.innerHTML+=n}e.addEventListener("click",n)}}function n(){var e=document.querySelector('input[name="pronouns"]:checked')?.value,o=t.find((t=>t.Category==e));o&&function(e){a.pronouns=e,i(e)}(o),console.log(e),console.log(a)}function i(e){let t=document.querySelectorAll(".playerPronouns");t&&t.forEach((t=>t.innerHTML=`${e.Category}`))}const a={id:0,playerName:"",pronouns:{Category:"",subjectPro:"",objectPro:"",possAdj:"",possessivePro:"",reflex:"",is:""}};function s(){return a}function r(e){a.id=e.id,a.playerName=e.playerName,a.pronouns=e.pronouns}function l(){var e,t=document.getElementById("playerName").value;console.log(`Player Name is: ${t}`),e=t,a.playerName=e,c(t),console.log(a)}function c(e){const t=document.querySelectorAll(".yourName");t&&t.forEach((t=>{t.innerHTML=`${e} `}))}var d,u,m;(m=d||(d={}))[m.show=0]="show",m[m.hidden=1]="hidden",m[m.hideReason=2]="hideReason";class h{constructor(e){this.paragraph=e}}function y(e){return e?e[0].toUpperCase()+e.substr(1).toLowerCase():e}function p(e){e.style.color="#6A6C6E"}!function(e,t,o,n,i){switch(e){case e="stat":case e="item":case e="quest":case e="variable":}}("stat"),function(e){e[e.hide=0]="hide",e[e.show=1]="show"}(u||(u={}));class f extends class{constructor(e,t){this.statName=e,this.value=t}}{constructor(e,t,o){super(e,t),this.style=o}}function g(e){return[{name:"start",content:"This is the first paragraph. <u><b>Welcome to a game!</b></u> This game is a multi choice Interactive fiction. Different choices will lead to different outcomes. Rejoice! Enjoy your time playing here!",choices:[{id:1,content:"Alright then, lead me to the next paragraph",nextName:"wood"}]},{name:"wood",content:`You are walking into the woods and there's no one around.\n        Or so you thought. Your senses tells you that there's something out there, but your conscious mind tries to convince otherwise.\n        After all, there's no reason for anyone to be out at this hour.\n        <br>Or is it?<br>\n        No time for pleasantries, but at the very least, could you tell us a bit about yourself?<br>\n        <input id="playerName" type="text" placeholder="Enter your name here!" aria-label="playerName" value="${e?.playerName}">\n        <div id="pronouns">And your pronouns? <br></div>\n        `,choices:[{id:1,content:"Ooooh! Next!!!!!",nextName:"greeting"},{id:2,content:"I'm scared. Let's go back to the first one!",nextName:"start"}],item:[{itemName:"sword",itemQty:1,description:"An old, rusty sword you found on the ground.",itemCode:"sword"},{itemName:"great sword",itemQty:1,description:"An old, rusty great sword you found on the ground.",itemCode:"great_sword"},{itemName:"very small sword",itemQty:1,description:"A small small sword",itemCode:"smol_sword",precondition:{stat:[{statName:"Meow",value:1}],item:[{itemName:"candied nut",itemQty:1,itemCode:"nut1"}]}}]},{name:"greeting",content:`This is the third paragraph. A guy and his friend, Snail Guy waved at you and said: "This is ${e?.playerName}! ${y(e?.pronouns.is)} finally here! ${y(e?.pronouns.subjectPro)+" "+(t="was",o="were","they"==s().pronouns.subjectPro?o:t)} busy last time you were here, so I couldn't introduce ${e?.pronouns.subjectPro} to you. Oh well, this is the end. Bye ${e?.playerName}!"<br>`,choices:[{id:1,content:"And you continue walking",nextName:"key on ground"}]},{name:"key on ground",content:'<p>You found a box on the ground. There\'s a key inside of the box. Along with some flowers on the ground.</p><p>Just a heads-up. The next paragraph uses update style "append".</p>',choices:[{id:1,content:"Move along",style:"append",nextName:"surprise"}],item:[{itemName:"key",itemQty:1,description:"A small key. You wonder what it's for.",itemCode:"key1"},{itemName:"flowers",itemQty:6,description:"Some nice, wild flowers",itemCode:"wild_flowers"}]},{name:"surprise",content:"<p style=\"color: purple\">There's a bear behind you! AAAAAAAAAAAAAAAAAAAAA!</p>\n        <p>\n        You run to the magic space-time door, which is something that you know will lead you back to the beginning of the game.\n        </p>\n        <p>There's a key hole on the door. The door has an image of a goddess holding 6 flowers. Maybe if you use the key and hold 6 flowers, you might get past this door.</p>",choices:[{id:1,content:"[Use Key] [Hold the flowers] Let's go back from the beginning",nextName:"start",precondition:{item:[{itemName:"key",itemQty:1,itemCode:"key1"},{itemName:"flowers",itemQty:6,itemCode:"wild_flowers"}]},consequence:{item:[{itemName:"key",description:"A small key. You wonder what it's for.",itemQty:-1,itemCode:"key1"}],stat:[{statName:"Meow",value:1,style:u.show},{statName:"hiddenValue",value:1,style:u.hide}]}},{id:2,content:"Or should you just run? Here, take these if you want to go on (1x key, 1x candied nut)",nextName:"oh? you're still here?",consequence:{item:[{itemName:"key",description:"A small key. You wonder what it's for.",itemQty:1,itemCode:"key1"},{itemName:"candied nut",description:"A sweet, sweet treat",itemQty:1,itemCode:"nut1"}]}}]},{name:"oh? you're still here?",content:"<img src=\"../../assets/images/cat.jpg\">\n        <p>Nice attempt, but there's no more content past this point.</p>\n        <p>Enjoyed the game? Didn't enjoy it? Well, there's a reason why I am not a literature major :)</p>",choices:[{id:1,content:"This is truly the end. There's nothing else. Let's just go back",nextName:"start",consequence:{stat:[{statName:"Growl",value:1,style:u.show}]}},{id:2,content:"Trust me on this one my friend.",nextName:"start"},{id:3,content:"This choice is just here to show what it's like if your Stats check had failed.",nextName:"edge",precondition:{item:[{itemName:"key",itemQty:1,itemCode:"key1"}],stat:[{statName:"Athletic",value:10}]}}]},{name:"edge",content:"You leaped across the ledge! And landed successfully. You are safe, for now.",choices:[{id:1,content:"Weeee!",nextName:"start"}]},{name:"cave ahead",content:"You walked south from where you started. You saw a cave",choices:[{id:1,content:"Enter Cave",nextName:"enter cave"},{id:2,content:"Turn back to where you started",nextName:"edge"},{id:3,content:"Stop and think for a moment",nextName:"start"}]},{name:"enter cave",content:"You enter the cave. It's dark, pitch-black in here",choices:[{id:1,content:"Try to adjust your eyes",nextName:"start",precondition:{item:[{itemName:"sword",itemQty:1,itemCode:"sword"}],stat:[]}},{id:2,content:"Turn back to the cave entrance",nextName:"cave ahead"}]}];var t,o}class v{constructor(e,t){this.pickedUpLocation=[],this.item=e,this.pickedUpLocation.push(t)}}let b=[];function N(e){b.push(e)}function w(){return b}function $(){return b.length=0,b}function C(e,t){const o=b.find((t=>t.item.itemCode==e.itemCode));if(o)if(o&&0==o.item.itemQty)o.item.itemQty+=e.itemQty,console.log(`${e.itemName} is already in the inventory. Adding 1 to quantity.`),console.log(b),k(o.item);else if(o.item.itemQty+=e.itemQty,0==o.item.itemQty)!function(e){let t=document.querySelector(`#pills-${e}-tab`),o=document.querySelector(`#pills-${e}`);t.remove(),o.remove()}(o.item.itemCode);else{console.log(`${e.itemName} is already in the inventory. Adding 1 to quantity.`),console.log(b),document.querySelector(`#${e.itemCode}-quantity`).textContent=`Quantity: ${o.item.itemQty}`;let n=o.pickedUpLocation.find((e=>e==t));console.log(n,t),n||o.pickedUpLocation.push(t)}else{let o=new v(e,t);console.log(`${e.itemName} has been added to inventory`),N(o),console.log(b),k(e)}}function k(e){let t=document.querySelector("#inventory-tab"),o=document.querySelector("#inventory-tabContent"),n=`<li class="nav-item" role="presentation">\n        <a class="nav-link" \n        id="pills-${e.itemCode}-tab" \n        data-bs-toggle="pill" \n        href="#pills-${e.itemCode}" \n        role="tab" \n        aria-controls="pills-${e.itemCode}" aria-selected="false">${y(e.itemName)}</a>\n        </li>`;t.innerHTML+=n;let i=`<div class="tab-pane fade" \n    id="pills-${e.itemCode}" \n    role="tabpanel" \n    aria-labelledby="pills-${e.itemCode}-tab">\n    ${e.description}\n    <div id="${e.itemCode}-quantity">Quantity: ${e.itemQty}</div>\n    </div>`;o.innerHTML+=i}function S(){let e=document.querySelector("#inventory-tab"),t=document.querySelector("#inventory-tabContent");e.textContent="",t.textContent=""}let A=[{statName:"Intellect",value:10,style:u.show},{statName:"Endurance",value:4,style:u.show},{statName:"Athletic",value:0,style:u.show}];function L(){return A}function q(e,t,o){let n=new f(e,t,o);L().push(n)}function x(e){e.forEach((e=>q(e.statName,e.value,e.style)))}function E(){return L().length=0,A}function T(e){document.querySelectorAll(".stat").forEach((t=>{t.innerHTML+=`<div id='stat-${e.statName}'>${e.statName}: ${e.value}</div>`}))}function j(){document.querySelector(".stat").textContent=""}function M(e){e.forEach((e=>{switch(e.style){case e.style=u.show:T(e)}}))}function P(e){let t=e.item,o=e.stat;t&&t.forEach((e=>{C(e,V())})),o&&o.forEach((e=>{!function(e){let t=A.find((t=>t.statName==e.statName));if(t){switch(console.log("it is found"),function(e,t){L().find((t=>t.statName==e.statName)).value+=t}(t,e.value),e.style){case e.style=u.hide:break;default:!function(e){document.querySelector(`#stat-${e.statName}`).innerHTML=`<div id='stat-${e.statName}'>${e.statName}: ${e.value}</div>`}(t)}console.log(`Handled! modified ${t.value}`)}if(!t){switch(q(e.statName,e.value,e.style),e.style){case e.style=u.hide:break;default:T(e)}console.log("not found, so added new stat")}}(e)}))}function Q(e,t,o){var n=L().find((e=>e.statName==t));let i=document.querySelector(`#${e}`);return n?n.value<o?(console.log(`Condition not met! ${n.value} < ${o}`),i.innerHTML+=` [Condition not met: ${t} value ${n.value}/${o}]`,Y.failed):n.value>=o?(console.log("Condition met. Proceed."),Y.passed):void 0:(console.log("Condition not met!"),i.innerHTML+=` [Condition not met: player does not have ${t}]`,Y.failed)}function H(e,t,o,n){const i=w().find((e=>e.item.itemCode==t));let a=document.querySelector(e);return i?i&&i.item.itemQty<o?(a.innerHTML+=` [Condition not met: ${n} quantity ${i.item.itemQty}/${o}]`,Y.failed):(console.log(`Condition: ${n} found in inventory! Proceed`),Y.passed):(a.innerHTML+=` [Condition not met: ${n} cannot be found in inventory]`,Y.failed)}function I(e,t){let o,n,i=t.item,a=t.stat;if(i&&i.forEach((t=>{let n=H(`#cid${e.id}`,t.itemCode,t.itemQty,t.itemName);n==Y.failed&&(o=n)})),a&&a.forEach((t=>{let o=Q(`cid${e.id}`,t.statName,t.value);o==Y.failed&&(n=o)})),o==Y.failed||n==Y.failed){let t=document.querySelector(`#cid${e.id}`);p(t),t.classList.add("choice-blocked"),console.log(`${e.id} is blocked`)}}var Y;!function(e){e[e.passed=0]="passed",e[e.failed=1]="failed"}(Y||(Y={}));class O{constructor(e,t,o,n){this.player=e,this.inventory=t,this.currentParagraphName=o,this.stat=n,this.date=(new Date).toLocaleString()}}function B(){let e=new O(s(),w(),V(),L());return JSON.stringify(e)}function U(e){$(),S(),r(e.player),e.inventory.forEach((e=>N(e))),E(),j(),x(e.stat),M(e.stat),W(e.currentParagraphName,e.player),e.inventory.forEach((e=>{e.item.itemQty>0&&k(e.item)})),c(e.player.playerName),i(e.player.pronouns),document.getElementById(`${e.player.pronouns.subjectPro}`)&&function(e){document.getElementById(`${e.subjectPro}`).checked=!0}(e.player.pronouns)}function J(){localStorage.setItem("autoSave",B())}function D(e){let t=JSON.parse(localStorage.getItem(e)).date;document.querySelector(`#saveDesc-${e}`).innerHTML=t}function _(e,t){let o,n,i=t.item,a=t.stat;if(i&&i.forEach((t=>{let n=H(`#${e.itemCode}`,t.itemCode,t.itemQty,t.itemName);n==Y.failed&&(o=n)})),a&&a.forEach((t=>{let o=Q(e.itemCode,t.statName,t.value);o==Y.failed&&(n=o)})),o==Y.failed||n==Y.failed){let t=document.querySelector(`#${e.itemCode}`);p(t),t.classList.add("item-blocked"),console.log(`${e.itemCode} is blocked`)}}let R;function W(e,t){let n=s(),i=g(n).findIndex((t=>t.name==e)),a=new h(g(n)[i]).paragraph;const r=document.getElementById("choices"),c=document.getElementById("items");let d=a.choices,u=null;switch(c.innerHTML=null,document.querySelector("input#playerName")&&document.addEventListener("keyup",(function(e){e.target&&e.target.matches("input#playerName")&&l()})),K=e,t){case"append":R=R+" "+a.content,G(R);break;default:G(null),R=a.content,G(R)}r.textContent=null,u=a.item,function(e,t){if(e){for(let o=0;o<e.length;o++){let n=e[o],i=`<a href="#" \n            class="choices" id="cid${n.id}" >\n            ${n.content} \n            </a><br>`;t.innerHTML+=i,n.precondition&&(console.log(`choice n.${n.id} has condition!`),I(n,n.precondition))}for(let o=0;o<e.length;o++){let n=e[o],i=n.nextName,a=e[o].style,s=t.querySelector(`#cid${n.id}`);s.classList.contains("choice-blocked")||s.addEventListener("click",(function(){n.consequence&&P(n.consequence),function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(document.querySelector("#choices")),W(i,a),J()}))}}}(d,r),u&&function(e,t,o){for(var n=0;n<e.length;n++){let i=e[n],a=w().find((e=>e.item.itemName==i.itemName&&e.item.itemCode==i.itemCode));if(a){console.log(o);let e=a.pickedUpLocation.includes(`${o}`);if(console.log(e),e){let e=`<a href="#" class="items picked" id="${i.itemCode}">[Added to Inventory] You've already picked up ${i.itemName}</a><br>`;console.log(`${i.itemName} is already picked up at this location (${o})`),t.innerHTML+=e}else{let e=`<a href="#" class="items item-new-location" id="${i.itemCode}">You found ×${i.itemQty} ${i.itemName}</a><br>`;t.innerHTML+=e,i.precondition&&_(i,i.precondition)}}else{let e=`<a href="#" class="items" id="${i.itemCode}">You found ×${i.itemQty} ${i.itemName}</a><br>`;t.innerHTML+=e,i.precondition&&_(i,i.precondition)}}for(n=0;n<e.length;n++){let o=e[n],i=t.querySelector(`#${o.itemCode}`),a=i.classList.contains("picked"),s=i.classList.contains("item-new-location"),r=i?.classList.contains("item-blocked");s?i.addEventListener("click",(function(){C(o,V());let e=`[Added to Inventory] You picked up ${o.itemName}`;i.innerHTML=e,i.style.color="#6A6C6E",J()}),{once:!0}):r||(a?i.style.color="#6A6C6E":i.addEventListener("click",(function(){C(o,V()),console.log(o.itemName);let e=`[Added to Inventory] You picked up ${o.itemName}`;i.innerHTML=e,i.style.color="#6A6C6E",J()}),{once:!0}))}}(u,c,e),o()}function G(e){document.getElementById("paragraph").innerHTML=e}let K="start";function V(){return K}function z(){W("start"),$(),r(e),c(e.playerName),i(e.pronouns),S(),E(),j(),x([{statName:"Intellect",value:10,style:u.show},{statName:"Endurance",value:4,style:u.show},{statName:"Athletic",value:0,style:u.show}]),M(L()),J()}window.onload=function(){localStorage.getItem("autoSave")?function(){let e=JSON.parse(localStorage.getItem("autoSave"));e&&U(e)}():(W("start"),M(L()))};const F=document.querySelector("#playerName");F&&F.addEventListener("keyup",l);const X=document.querySelector("#coolbutton");X&&X.addEventListener("click",(function(e){console.log("thing!")})),o(),document.querySelectorAll(".save").forEach((e=>{let t=e.getAttribute("value");e.addEventListener("click",(function(){var e;e=t,"undefined"!=typeof Storage?(console.log(`LocalStorage is supported! Saved file to ${e}`),localStorage.setItem(e,B()),D(e)):console.log("LocalStorage is not supported in this browser! Please export the save code instead.")}))})),document.querySelectorAll(".load").forEach((e=>{let t=e.getAttribute("value");e.addEventListener("click",(function(){var e;e=t,"undefined"!=typeof Storage?(console.log("LocalStorage is supported!"),U(JSON.parse(localStorage.getItem(e)))):console.log("LocalStorage is not supported in this browser! Please export the save code instead.")}))})),document.querySelectorAll(".export").forEach((e=>{let t=e.getAttribute("value");e.addEventListener("click",(function(){!function(e){let t=localStorage.getItem(e),o=document.querySelector("#exportMessage");o.textContent=null,o.innerHTML+=`Save exported from ${e}.<br> \n    Copy and keep the code bellow to load later`;let n=document.querySelector("#saveOutput");n.value="",n.value=`${btoa(t)}`,n.select()}(t)}))})),document.querySelector(".exportSave")?.addEventListener("click",(function(){!function(){let e=document.querySelector("#exportMessage");e.textContent=null,e.innerHTML+=`Save created at ${(new Date).toLocaleString()}.<br> \n    Copy and keep the code bellow to load later`;let t=document.querySelector("#saveOutput");t.value="",t.value+=`${btoa(B())}`,t.select()}()})),document.querySelector(".importSave")?.addEventListener("click",(function(){!function(){let e=document.querySelector("#saveOutput").value;e=atob(e),console.log(e);let t=JSON.parse(e);console.log(t),U(t),document.querySelector("#exportMessage").innerHTML+=`<div class="alert alert-warning alert-dismissible fade show mt-1" role="alert">\n        <strong> Load Success! </strong> Loaded save from ${t.date}.\n            <button type = "button" class="btn-close" data - bs - dismiss="alert" aria - label="Close"> </button>\n                </div>`}()})),document.querySelector(".restartBtn")?.addEventListener("click",(function(){z()}));for(let e=1;e<4;e++)localStorage.getItem(`slot-${e}`)&&D(`slot-${e}`)})();