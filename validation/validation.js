// Kiểm tra dữ liệu rỗng
function checkEmptyValue(theThongBao, value) {
  if (value.trim() === "") {
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    theThongBao.style.opacity = 1;
    return false;
  } else {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  }
}

// Kiểm tra độ dài tối thiểu và tối đa của chuỗi
function checkMinMaxValue(theThongBao, value, min, max) {
  const doDaiValue = value.trim().length;
  if (doDaiValue < min || doDaiValue > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} - ${max} ký tự`;
    theThongBao.style.opacity = 1;
    return false;
  } else {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  }
}

// Kiểm tra định dạng email
function checkEmailValue(theThongBao, value) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regexEmail.test(value)) {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng email";
    theThongBao.style.opacity = 1;
    return false;
  }
}

// Kiểm tra mật khẩu có ít nhất 1 ký tự đặc biệt và 1 ký tự viết hoa
function checkPasswordValue(theThongBao, value) {
  const regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (regexPassword.test(value)) {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và 1 ký tự đặc biệt";
    theThongBao.style.opacity = 1;
    return false;
  }
}

// Kiểm tra dữ liệu chỉ chứa chữ cái
function checkAlphabetOnly(theThongBao, value) {
  const regexAlphabet = /^[A-Za-z\s]+$/;
  if (regexAlphabet.test(value)) {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng chỉ nhập chữ cái, không bao gồm số";
    theThongBao.style.opacity = 1;
    return false;
  }
}

// Kiểm tra radio button đã được chọn
function checkRadioSelected(theThongBao, radioGroup) {
  const isSelected = Array.from(radioGroup).some((radio) => radio.checked);
  if (isSelected) {
    theThongBao.innerHTML = "";
    theThongBao.style.opacity = 0;
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng chọn một tùy chọn";
    theThongBao.style.opacity = 1;
    return false;
  }
}
