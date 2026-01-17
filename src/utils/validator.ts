

type LoginInput = {
  email: string;
  password: string;
};

type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z]{2,}$/;

const isEmpty = (value: string) => !value.trim();


export const validateLogin = (data: LoginInput) => {
  const errors: Partial<Record<keyof LoginInput, string>> = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};


export const validateSignup = (data: SignupInput) => {
  const errors: Partial<Record<keyof SignupInput, string>> = {};

  if (isEmpty(data.firstName)) {
    errors.firstName = 'First name is required';
  } else if (!nameRegex.test(data.firstName)) {
    errors.firstName = 'First name must contain only letters';
  }

  if (isEmpty(data.lastName)) {
    errors.lastName = 'Last name is required';
  } else if (!nameRegex.test(data.lastName)) {
    errors.lastName = 'Last name must contain only letters';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
