import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { object, string } from "yup";
import EyeClosed from "./eye/EyeClosed";
import EyeOpen from "./eye/EyeOpen";
import { FormButton } from "../button/Button";
import logInUser from "../../api/logInUser"
import styles from "./LogIn.module.scss"
import PropTypes from "prop-types"

import axios from "axios";


function LogIn({ headline, toRegistration, toLogIn }){

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    login: string()
      .required("Поле логіну є обов'язковим для заповнення")
      .min(6, "Логін повинен мати не менше 6 символів")
      .max(16, "Логін повинен мати не більше 16 символів"),
    password: string()
      .required("Поле пароля є обов'язковим для заповнення")
      .min(7, "Пароль має містити від 7 до 30 символів")
      .max(30, "Пароль має містити від 7 до 30 символів")
      .matches(/[a-zA-Z0-9]/, "Дозволені символи для пароля: a-z, A-Z, 0-9")
  })

  const handleUserLogin = (login, password) => {
    dispatch(logInUser(login, password))
      .then(() => {
        navigate(toLogIn);
      })
      .catch((error) => {
        setShowError(true);
      });
  };
  

  return(
    <section className={styles.windowWrapper}>
      <div className={styles.window}>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={`${styles.text} ${styles.headlineText}`}>Введіть логін та пароль, щоб увійти</p>

        <Formik 
          initialValues={{login: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
            handleUserLogin(values.login, values.password);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >

          {({ isSubmitting }) => (
            <Form className={styles.form}>
            <Field name="login">
                {({ field, meta }) => (
                    <input
                      {...field}
                      id="login"
                      className={
                        meta.touched && meta.error
                          ? styles.inputAttention
                          : styles.input
                      }
                      placeholder="Логін"
                    />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <div className={`${styles.passwordWrapper} ${styles.label}`}>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className={
                        meta.touched && meta.error
                          ? styles.inputAttention
                          : styles.input
                      }
                      placeholder="Пароль"
                    />
                    <div
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={styles.iconButton}
                    >
                      {showPassword === false ? <EyeClosed /> : <EyeOpen />}
                    </div>
                  </div>
                )}
              </Field>
              <FormButton type="submit" className={styles.buttonStyle} width="300px" text="Увійти" disabled={isSubmitting}/>
              {/* <button type="submit" className={styles.buttonStyle} width="300px"
              >Увійти
              </button> */}
              {showError && <p className={showError && styles.textAttention}>Такого користувача не існує. Спершу зареєструйтесь</p>}
              <div className={styles.errorsWrapper}>
                <ErrorMessage name="login" component="p" className={styles.textAttention}/>
                <ErrorMessage name="password" component="p" className={styles.textAttention}/>
              </div>
            </Form>
          )}
        </Formik>
        <Link to={toRegistration} className={`${styles.text} ${styles.textRegistration}`}>Зареєструватися</Link> 
      </div>
    </section>
  )
}

LogIn.propTypes = {
  headline: PropTypes.string.isRequired,
  toRegistration: PropTypes.string.isRequired,
  toLogIn: PropTypes.string.isRequired
};

export default LogIn