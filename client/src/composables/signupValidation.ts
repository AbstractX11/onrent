import axios from "axios";

export default async function signupValidation(
  form: any,
  confirm: any,
  errors: any
) {
  console.log(form);
  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:8080/register", {
      username: form.username,
      email: form.email,
      password: form.password,
    });
    return data;
  };

  errors.passwordError =
    form.password.length < 8 && "Password must be 8 chars long";
  errors.confirmError = form.password !== confirm && "Passwords do not match";
  if (!errors.passwordError && !errors.confirmError) {
    console.log("validpassword");
    const data = await handleSubmit();
    return { errors: null, data };
  }
  return { errors, data: null };
}
