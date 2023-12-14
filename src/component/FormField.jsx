import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstname: "",
  surname: "",
  email: "",
};
const onSubmit = (values) => {
  console.log(values);
};
const validationSchema = Yup.object({
  firstname: Yup.string().required("check required"),
  surname: Yup.string().required("Required"),
  email: Yup.string().required("email is required"),
});

export default function FormField() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  //   console.log("form errors", formik.errors);
  console.log("form errors", formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="">first name</label>
          <input
            type="text"
            name="firstname"
            id=""
            onChange={formik.handleChange}
            value={formik.values.firstname}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div>{formik.errors.firstname}</div>
          ) : null}
        </div>
        <div style={{ padding: "20px 0px" }}>
          <label htmlFor="">surname </label>
          <input
            type="text"
            name="surname"
            id=""
            onChange={formik.handleChange}
            value={formik.values.surname}
            onBlur={formik.handleBlur}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div>{formik.errors.surname}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="">email</label>
          <input
            type="text"
            name="email"
            id=""
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <button style={{ marginTop: 30 }} type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
