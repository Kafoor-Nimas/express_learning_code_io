
export const createUserValidationSchema = {
  user_name: {
    notEmpty: {
      errorMessage: "User Name must not be empty",
    },
    isLength: {
      options: { min: 5, max: 12 },
      errorMessage: "user name length requirements not met",
    },
    isString: {
      errorMessage: "User name must be a string",
    },
  },
  age: {
    notEmpty: {
      errorMessage: "Age must not be empty",
    },
  },
};
