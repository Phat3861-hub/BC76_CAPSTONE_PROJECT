function getValueForm() {
  // Lấy các giá trị từ form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gender =
    document.querySelector('input[name="flexRadioDefault"]:checked').value ===
    "true";

  // Tạo đối tượng userData
  const userData = {
    email: email,
    password: password,
    name: name,
    gender: gender,
    phone: phone,
  };

  console.log(userData); // In ra console để kiểm tra
  return userData;
}
document
  .querySelector(".form_submit button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Lấy giá trị từ các trường input và phần tử thông báo
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const genderRadioGroup = document.getElementsByName("flexRadioDefault");
    const [emailMsg, passwordMsg, nameMsg, phoneMsg, genderMsg] =
      document.querySelectorAll(".theThongBao");

    // Kiểm tra từng trường
    const isEmailValid =
      checkEmptyValue(emailMsg, emailInput.value) &&
      checkEmailValue(emailMsg, emailInput.value);
    const isPasswordValid =
      checkEmptyValue(passwordMsg, passwordInput.value) &&
      checkPasswordValue(passwordMsg, passwordInput.value);
    const isNameValid =
      checkEmptyValue(nameMsg, nameInput.value) &&
      checkAlphabetOnly(nameMsg, nameInput.value);
    const isPhoneValid =
      checkEmptyValue(phoneMsg, phoneInput.value) &&
      checkMinMaxValue(phoneMsg, phoneInput.value, 10, 15);
    const isGenderSelected = checkRadioSelected(genderMsg, genderRadioGroup);

    // Nếu tất cả các trường hợp đều hợp lệ, tạo dữ liệu để gửi qua API
    if (
      isEmailValid &&
      isPasswordValid &&
      isNameValid &&
      isPhoneValid &&
      isGenderSelected
    ) {
      const userData = {
        email: emailInput.value,
        password: passwordInput.value,
        name: nameInput.value,
        phone: phoneInput.value,
        gender: document.querySelector('input[name="flexRadioDefault"]:checked')
          .value,
      };

      // Gửi dữ liệu qua API
      axios({
        url: "https://shop.cyberlearn.vn/api/Users/signup",
        method: "POST",
        data: userData,
      })
        .then((res) => {
          console.log(res);

          // Thông báo thành công
          Toastify({
            text: "Đăng ký thành công!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();
        })
        .catch((err) => {
          console.error(err);

          // Thông báo lỗi
          const errorMessage =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "Đã xảy ra lỗi. Vui lòng thử lại.";

          Toastify({
            text: `Đăng ký thất bại: ${errorMessage}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          }).showToast();
        });
    }
  });

function renderThongBao(message, type) {
  let thongBao = document.createElement("div");
  thongBao.className = `alert alert-${type}`;
  thongBao.innerText = message;

  // Thêm thông báo vào DOM
  document.body.appendChild(thongBao);

  // Tự động ẩn thông báo sau vài giây
  setTimeout(() => {
    thongBao.remove();
  }, 3000);
}
