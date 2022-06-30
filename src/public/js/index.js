const $productForm = document.getElementById("productForm");
const $productsTable = document.getElementById("productsTable");
const $productErrors = document.getElementById("productErrors");
const $userForm = document.getElementById("userForm");
const $messageForm = document.getElementById("messageForm");
const $usersQty = document.getElementById("usersQty");
const $inputEmail = document.getElementById("inputEmail");
const $inputMessage = document.getElementById("inputMessage");
const $btnLog = document.getElementById("btn-log");
const $btnSend = document.getElementById("btn-send");
const $messagesWrapper = document.getElementById("messages-wrapper");
const $messageErrors = document.getElementById("messageErrors");
const $compression = document.getElementById("compression");
let template = null;
let user = null;

const { schema, denormalize } = normalizr;

const socket = io({ transports: ["websocket"] });

async function renderTable(file, data) {
  if (template === null) {
    let response = await fetch(file);
    const templateFile = await response.text();
    template = Handlebars.compile(templateFile);
  }
  const html = template(data);
  return html;
}

function renderUsers(data) {
  const { usersQty } = data;
  return usersQty === 1
    ? `<b>1 Usuario Conectado</b>`
    : `<b>${usersQty} Usuarios Conectados</b>`;
}

function renderMessages(data) {
  const { messages } = data;
  let html = "";
  const today = new Date().toLocaleDateString();
  let prevDate;
  messages.forEach(message => {
    const messageDate = new Date(message.timestamp).toLocaleDateString();
    const color = stringToColour(message.author.email);
    if (prevDate !== messageDate) {
      prevDate = messageDate;
      html += `
        <div class="date">
          ${prevDate === today ? "Hoy" : prevDate}
        </div>
        `;
    }
    html += `
      <div class="message-box">
        <div class="color" style="background-color:${color};">
          <img src="${message.author.avatar}" alt="user avatar">
        </div>
        <div class="message">
          <b style="color:${color};">${message.author.email}</b>
          [ <i>${new Date(message.timestamp).toLocaleTimeString()}</i> ] :
          <span>${message.text}</span>
        </div>
      </div>
    `;
  });
  return html;
}

function stringToColour(string) {
  const colors = [
    "#e51c23",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#5677fc",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#259b24",
    "#8bc34a",
    "#afb42b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b"
  ];
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
}

function changeDisabledUserForm(boolean) {
  for (let i = 0; i < $userForm.length; i++) {
    if (i === 1) continue;
    $userForm[i].disabled = boolean;
  }
}

const userSchema = new schema.Entity("users", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("messages", {
  author: userSchema
});

const messageListSchema = [messageSchema];

socket.on("allProducts", async products => {
  $productsTable.innerHTML = await renderTable("/templates/table.hbs", {
    list: products
  });
});

socket.on("productErrors", error => {
  $productErrors.innerText = error;
  $productErrors.classList.add("show");
  setTimeout(() => {
    $productErrors.classList.remove("show");
  }, 4000);
});

let allServersConn = 0;
socket.on("usersCount", usersQty => {
  allServersConn += usersQty;
});

setInterval(() => {
  $usersQty.innerHTML = renderUsers({
    usersQty: allServersConn
  });
  allServersConn = 0;
}, 3000);

socket.on("allMessages", async messages => {
  const denormalizedMessages = denormalize(
    messages.result,
    messageListSchema,
    messages.entities
  );
  const normalizedMsgSize = JSON.stringify(messages).length;
  const denormalizedMsgSize = JSON.stringify(denormalizedMessages).length;
  const compression = (
    (1 - normalizedMsgSize / denormalizedMsgSize) *
    100
  ).toFixed(1);
  $messagesWrapper.innerHTML = renderMessages({
    messages: denormalizedMessages
  });
  $messagesWrapper.scrollTo(0, $messagesWrapper.scrollHeight);
  $compression.innerText = `Factor de Compresión: ${compression}%`;
});

socket.on("messageErrors", error => {
  $messageErrors.innerText = error;
  $messageErrors.classList.add("show");
  setTimeout(() => {
    $messageErrors.classList.remove("show");
  }, 4000);
});

$productForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData($productForm);
  const product = {
    title: data.get("title"),
    price: data.get("price"),
    thumbnail: data.get("thumbnail")
  };
  socket.emit("saveProduct", product);
  $productForm.reset();
});

$userForm.addEventListener("submit", e => {
  e.preventDefault();
  if (user) {
    user = null;
    changeDisabledUserForm(false);
    $inputEmail.classList.remove("logged");
    $btnLog.innerText = "Login";
    $btnLog.classList.remove("logged");
    $userForm.reset();
    $inputMessage.disabled = true;
    $btnSend.disabled = true;
    return;
  }
  const inputValue = $inputEmail.value;
  if (/^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/.test(inputValue)) {
    user = inputValue;
    changeDisabledUserForm(true);
    $inputEmail.classList.add("logged");
    $btnLog.innerText = "Logout";
    $btnLog.classList.add("logged");
    $inputMessage.disabled = false;
    $inputMessage.focus();
    $btnSend.disabled = !$inputMessage.value.trim();
  }
});

$inputMessage.addEventListener("input", e => {
  $btnSend.disabled = !$inputMessage.value.trim();
});

$messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const inputValue = $inputMessage.value;
  if (user && inputValue.trim()) {
    const text = inputValue;
    const message = {
      author: {
        email: user,
        firstName: $userForm["firstName"].value,
        lastName: $userForm["lastName"].value,
        age: $userForm["age"].value,
        alias: $userForm["alias"].value,
        avatar: $userForm["avatar"].value
      },
      text
    };
    socket.emit("newMessage", message);
    $messageForm.reset();
    $inputMessage.focus();
    $btnSend.disabled = !$inputMessage.value.trim();
  }
});

document.getElementById("btn-logout").addEventListener("click", e => {
  location.assign("/logout");
});