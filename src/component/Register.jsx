// import React from "react";
// import { useFormik } from "formik";

// export default function Register() {
//   const formik = useFormik({
//     initialValues: {
//       firstname: "",
//       surname: "",
//       email: "",
//     },
//     onSubmit: (values) => {
//       console.log(values );
//     },
//   });

// //   console.log("form values", formik.values);

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="">first name</label>
//           <input
//             type="text"
//             name="firstname"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.firstname}
//             required
//           />
//         </div>
//         <div style={{ padding: "20px 0px" }}>
//           <label htmlFor="">surname </label>
//           <input
//             type="text"
//             name="surname"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.surname}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="">email</label>
//           <input
//             type="text"
//             name="email"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             required
//           />
//         </div>
//         <button style={{ marginTop: 30 }} type="submit">
//           submit
//         </button>
//       </form>
//     </div>
//   );
// }

//validations
// import React from "react";
// import { useFormik } from "formik";

// const initialValues = {
//   firstname: "",
//   surname: "",
//   email: "",
// };
// const onSubmit = (values) => {
//   console.log(values);
// };

// const validate = (values) => {
//   // the kes must be the same with the name  errors.firstname ,errors.email
//   let errors = {};
//   if (!values.firstname) {
//     errors.firstname = "first name field empty";
//   }
//   if (!values.surname) {
//     errors.surname = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Not a valid email";
//   }
//   return errors;
// };

// export default function Register() {
//   const formik = useFormik({
//     initialValues,
//     onSubmit,
//     validate,
//   });
//   //   console.log("form errors", formik.errors);
//   console.log("form errors", formik.touched);

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="">first name</label>
//           <input
//             type="text"
//             name="firstname"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.firstname}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.firstname && formik.errors.firstname ? (
//             <div>{formik.errors.firstname}</div>
//           ) : null}
//         </div>
//         <div style={{ padding: "20px 0px" }}>
//           <label htmlFor="">surname </label>
//           <input
//             type="text"
//             name="surname"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.surname}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.surname && formik.errors.surname ? (
//             <div>{formik.errors.surname}</div>
//           ) : null}
//         </div>
//         <div>
//           <label htmlFor="">email</label>
//           <input
//             type="text"
//             name="email"
//             id=""
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div>{formik.errors.email}</div>
//           ) : null}
//         </div>
//         <button style={{ marginTop: 30 }} type="submit">
//           submit
//         </button>
//       </form>
//     </div>
//   );
// }

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
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("check required")
    .min(2, "too short")
    .max(50, "Too Long!"),
  surname: Yup.string().required("Required"),
  email: Yup.string()
    .required("email is required")
    .matches(isValidEmail, "invalid email"),
});

export default function Register() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log("form values", formik.values);
  //   console.log("form errors", formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="">first name</label>
          <input
            type="text"
            name="firstname"
            id=""
            {...formik.getFieldProps("firstname")}
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
            {...formik.getFieldProps("surname")}
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
            {...formik.getFieldProps("email")}
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
