import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";

import * as yup from "yup";
import { da, fr } from "yup-locales";
import { setLocale } from "yup";
import { loginAuth } from "../../features/auth/authApi";
import { showAlert } from "../../utils/alert";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";
setLocale(fr);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProcessing, error } = useSelector((state) => state.auth);

  const { setUser, setToken } = useStateContext();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  });

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(2),
    password_confirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent correspondre."
      ),
  });

  const handleRegister = async () => {
    try {
      // FRONT-END ==> Validate form data
      await schema.validate(newUser, { abortEarly: false });
      // console.warn("FRONT-END VALIDATION : Form data is valid!", user);
      setFormErrors({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }); // Clear errors

      // BACK-END
      console.log(newUser);

      axiosClient
        .post("/register", newUser)
        .then((data) => {
          console.log(data);

          setUser(data.data.user);
          setToken(data.data.token);

          navigate("/");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
          }
        });

      // dispatch(loginAuth({ email: user.email, password: user.password })).then(
      //   (res) => {
      //     // CHECH IF NO ERROR FROM BACK-END
      //     if (res.meta.requestStatus === "fulfilled") {
      //       showAlert("success", "Connecté avec succès!");
      //       navigate("/");
      //       // dispatch(resetErrors());
      //       setFormErrors({
      //         email: "",
      //         password: "",
      //       });
      //     } else {
      //       console.error(res);
      //       console.error(res?.payload?.message);
      //       showAlert("warning", res?.payload?.message);
      //     }
      //   }
      // );
      // console.log(crudStatus);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setFormErrors(newErrors);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="container-fluid">
        <main id="main" className="main">
          <section style={{ maxWidth: "450px" }} className="section mx-auto">
            <h1 className="text-center">S'enregistrer</h1>
            <form>
              <Input
                handleChange={handleChange}
                label="Nom"
                name={"name"}
                validation={`${error?.errors?.name && "is-invalid"} ${
                  formErrors?.name && "is-invalid"
                }`}
                validationMessage={formErrors?.name || error?.errors?.name}
                value={newUser.name}
              />

              <Input
                handleChange={handleChange}
                label="Email"
                name={"email"}
                validation={`${error?.errors?.email && "is-invalid"} ${
                  formErrors?.email && "is-invalid"
                }`}
                validationMessage={formErrors?.email || error?.errors?.email}
                value={newUser.email}
              />

              <Input
                handleChange={handleChange}
                label="Mot de passe"
                name={"password"}
                type="password"
                validation={`${error?.errors?.password && "is-invalid"} ${
                  formErrors?.password && "is-invalid"
                }`}
                validationMessage={
                  formErrors?.password || error?.errors?.password
                }
                value={newUser.password}
              />

              <Input
                handleChange={handleChange}
                label="Mot de passe"
                name={"password_confirmation"}
                type="password"
                validation={`${
                  error?.errors?.password_confirmation && "is-invalid"
                } ${formErrors?.password_confirmation && "is-invalid"}`}
                validationMessage={
                  formErrors?.password_confirmation ||
                  error?.errors?.password_confirmation
                }
                value={newUser.password_confirmation}
              />

              <div className="form-floating d-grid mb-2">
                <button
                  onClick={handleRegister}
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={isProcessing}
                >
                  {isProcessing && (
                    <span className="text-center">
                      <div
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </span>
                  )}
                  Se connecter
                </button>
              </div>
            </form>

            <p>
              Vous avez un compte?
              <NavLink to={"/login"} className="ms-1">
                Se connecter
              </NavLink>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Register;
