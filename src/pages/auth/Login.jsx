import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/forms/Input";

import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { loginAuth } from "../../features/auth/authApi";
import { showAlert } from "../../utils/alert";
import { useStateContext } from "../../contexts/contextprovider";
import axiosClient from "../../axiosClient";
setLocale(fr);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isProcessing, error, token } = useSelector((state) => state.auth);

  const { setUser, setToken } = useStateContext();

  const [processing, setProcessing] = useState(false);

  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
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
      await schema.validate(loginUser, { abortEarly: false });
      // console.warn("FRONT-END VALIDATION : Form data is valid!", user);
      setFormErrors({ email: "", password: "" }); // Clear errors

      setProcessing(true);

      // BACK-END
      axiosClient
        .post("/login", loginUser)
        .then((data) => {
          if (data?.data?.errors) {
            setFormErrors({
              email: data.data.errors.email,
              password: "",
            });
          } else {
            setUser(data.data.user);
            setToken(data.data.token);
            navigate("/");
            showAlert("success", "Connecté avec succès!");
          }
        })
        .catch((err) => {
          const response = err.response;
          setFormErrors({
            email: response.data.errors.email,
            password: response.data.errors.password,
          });
        })
        .finally(() => {
          setProcessing(false);
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
    setLoginUser((prevData) => ({
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
              validation={`${formErrors?.email && "is-invalid"}`}
              validationMessage={formErrors?.email}
              value={loginUser.email}
            />

            <Input
              handleChange={handleChange}
              label="Mot de passe"
              name={"password"}
              type="password"
              validation={`${formErrors?.password && "is-invalid"}`}
              validationMessage={formErrors?.password}
              value={loginUser.password}
            />

            <div className="form-floating d-grid mb-2">
              <button
                onClick={handleLogin}
                type="button"
                className="btn btn-outline-primary"
                disabled={processing}
              >
                {processing && (
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
            <NavLink to={"/register"} className="ms-1">
              S'enregistrer
            </NavLink>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
