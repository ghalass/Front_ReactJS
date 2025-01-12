import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";

import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { loginAuth } from "../../features/auth/authApi";
import { showAlert } from "../../utils/alert";
setLocale(fr);

const Login2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProcessing, error, token } = useSelector((state) => state.auth);

  const [user, setUser] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(2),
  });

  const handleLogin = async () => {
    try {
      // FRONT-END ==> Validate form data
      await schema.validate(user, { abortEarly: false });
      // console.warn("FRONT-END VALIDATION : Form data is valid!", user);
      setFormErrors({ email: "", password: "" }); // Clear errors

      // BACK-END
      dispatch(loginAuth({ email: user.email, password: user.password })).then(
        (res) => {
          // CHECH IF NO ERROR FROM BACK-END
          if (res.meta.requestStatus === "fulfilled") {
            showAlert("success", "Connecté avec succès!");
            navigate("/");
            // dispatch(resetErrors());
            setFormErrors({
              email: "",
              password: "",
            });
          } else {
            console.error(res);
            console.error(res?.payload?.message);
            showAlert("warning", res?.payload?.message);
          }
        }
      );
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
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <main id="main" className="main">
        <section style={{ maxWidth: "450px" }} className="section mx-auto">
          <h1 className="text-center">S'authentifier</h1>
          <form>
            <Input
              handleChange={handleChange}
              label="Email"
              name={"email"}
              validation={`${error?.errors?.email && "is-invalid"} ${
                formErrors?.email && "is-invalid"
              }`}
              validationMessage={formErrors?.email || error?.errors?.email}
              value={user.email}
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
              value={user.password}
            />

            <div className="form-floating d-grid mb-2">
              <button
                onClick={handleLogin}
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
            Vous n'avez pas un compte?
            <NavLink to={"/"} className="ms-1">
              Register
            </NavLink>
          </p>
          <p>
            Allez à la page d'accueil
            <NavLink to={"/"} className="ms-1">
              Accueil
            </NavLink>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login2;
