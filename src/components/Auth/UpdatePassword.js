'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Logo } from '../common/logo';
import supabase from 'src/lib/supabase-browser';

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  async function updatePassword(formData) {
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Logo />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Forgot Password
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              password: '',
            }}
            validationSchema={UpdatePasswordSchema}
            onSubmit={updatePassword}
          >
            {({ errors, touched }) => (
              <Form className='space-y-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  New Password
                </label>
                <Field
                  id='password'
                  name='password'
                  type='password'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.password && touched.password ? (
                  <div className='!mt-0 text-red-600'>{errors.password}</div>
                ) : null}
                <button
                  className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  type='submit'
                >
                  Update Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {errorMsg && <div className='text-red-600'>{errorMsg}</div>}
    </div>
  );
};

export default UpdatePassword;
