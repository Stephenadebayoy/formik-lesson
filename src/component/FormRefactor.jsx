// all components

import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  firstname: "",
  surname: "",
  email: "",
  comment: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumber: [""],
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
  address: Yup.string().required("no address"),
});

//single validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Check your comment";
  }
  return error;
};

export default function FormRefactor() {
  //name will handle the value and onChange
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false} // when i click outside it wont run the validation
      validateOnChange={false} // when i type it wont run validation
      //  validateOnBlur validateOnChange if it true until when submit that is when it will validate
    >
      <Form>
        <div>
          <label htmlFor="">first name</label>
          <Field type="text" name="firstname" id="firstname" />
          <ErrorMessage name="firstname" component={TextError} />
        </div>
        <div style={{ padding: "20px 0px" }}>
          <label htmlFor="">surname </label>
          <Field type="text" name="surname" id="surname" />
          <ErrorMessage name="surname" component={TextError} />
        </div>
        <div>
          <label htmlFor="">email</label>
          <Field type="text" name="email" id="email" />
          <ErrorMessage name="email">
            {(errorMsg) => <div style={{ color: "red" }}>{errorMsg}</div>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Address</label>
          <Field type="text" name="address">
            {(props) => {
              const { field, meta } = props;
              return (
                <div>
                  <input
                    style={{ width: "100%", height: 50 }}
                    type="text"
                    id="address"
                    {...field}
                  />
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
                  ) : null}
                </div>
              );
            }}
          </Field>
        </div>
        <div>
          <label htmlFor="">Comments</label>
          <Field
            as="textarea"
            type="text"
            name="comment"
            id="comment"
            validate={validateComments}
          />
          <ErrorMessage name="comment" component={TextError} />
        </div>

        <div>
          <label htmlFor=""> Facebook profile</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>
        <div>
          <label htmlFor=""> Twitter profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>
        <div>
          <label htmlFor="">primary phone</label>
          <Field type="text" id="primaryN" name="phoneNumbers[0]" />
        </div>
        <div>
          <label htmlFor=""> secondary phone</label>
          <Field type="text" id="secondary" name="phoneNumbers[1]" />
        </div>

        <div>
          <label htmlFor=""> List of phone number</label>
          <FieldArray type="text" id="secondary" name="phNumber">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phNumber } = values;
              return (
                <div>
                  {phNumber.map((ph, index) => (
                    // <div key={index}>
                    //   <Field name={`ph[${index}]`} />
                    //   <button type="button" onClick={() => remove(index)}>
                    //     -
                    //   </button>
                    //   <button type="button" onClick={() => push("")}>
                    //     +
                    //   </button>
                    // </div>

                    // for user to be able to delete only if it greater than 0
                    <div key={index}>
                      <Field name={`ph[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      )}

                      <button type="button" onClick={() => push("")}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button style={{ marginTop: 30 }} type="submit">
          submit
        </button>
      </Form>
    </Formik>
  );
}
