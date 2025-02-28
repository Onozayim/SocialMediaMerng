const validateRegisterInput = (userName, password, confirmPassword, email) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "User name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email name must not be empty";
  } else {
    const regEx =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (userName, password) => {
  const errors = {};

  if (userName.trim() === "") {
    errors.userName = "User name must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { validateRegisterInput, validateLoginInput };
