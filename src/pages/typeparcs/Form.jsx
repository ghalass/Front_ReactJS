import { useState } from "react";
import useStoreTypeparcs from "../../app/useStoreTypeparcs";

import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import Input from "../../components/forms/Input";
setLocale(fr);

const Form = () => {
  const { createTypeparc, isProcessing, getTypeparcs, errors } =
    useStoreTypeparcs();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: null,
    description: null,
  });

  const schema = yup.object().shape({
    name: yup.string().required().min(3),
    description: yup.string().required().min(2),
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // FRONT-END ==> Validate form data
      await schema.validate(formData, { abortEarly: false });
      // console.warn("FRONT-END VALIDATION : Form data is valid!", formData);
      setFormErrors({ name: "", description: "" }); // Clear errors

      // BACK-END
      await createTypeparc(formData).then((res) => {
        // console.log(res);

        if (!errors) {
          setFormData({
            name: "",
            description: "",
          });
          getTypeparcs();
        } else {
          console.log(errors);
        }
      });
    } catch (err) {
      console.log(err);

      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setFormErrors(newErrors);
      }
    } finally {
      // console.log(formErrors);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <h1>Form</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            handleChange={handleInputChange}
            label="Type parc"
            name={"name"}
            validation={`${errors?.name && "is-invalid"} ${
              formErrors?.name && "is-invalid"
            }`}
            validationMessage={formErrors?.name || errors?.name}
            value={formData.name}
          />

          <Input
            handleChange={handleInputChange}
            label="Description"
            name={"description"}
            validation={`${errors?.description && "is-invalid"} ${
              formErrors?.description && "is-invalid"
            }`}
            validationMessage={formErrors?.description || errors?.description}
            value={formData.description}
          />

          <button className="btn btn-sm btn-outline-info mt-2 w-100">
            Save {isProcessing && "isProcessing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
