const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api/Users/signup",
  timeout: 30000,
});
function getDataUser() {
  let promise = http.post("/", {
    headers: { "Content-Type": "application/json" },
  });
  promise
    .then((res) => {
      console.log(res.data.content);
      renderDataUser(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderDataUser(arr) {
  let content = "";
  for (let user of arr) {
    const { email, password, name, gioiTinh, phone } = user;
    content += `
        
    `;
  }
}

getDataUser();
