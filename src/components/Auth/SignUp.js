'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';
import { Logo } from '../common/logo';

const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Success! Please check your email for further instructions.');
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Logo />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Start Your 14-day free trial
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <button
            className='font-medium text-indigo-600 hover:text-indigo-500'
            onClick={() => setView(VIEWS.SIGN_IN)}
          >
            already have an account
          </button>
        </p>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              email: '',
              password: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={signUp}
          >
            {({ errors, touched }) => (
              <Form className='space-y-6'>
                <div>
                  <label
                    htmlFor='firstname'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='firstname'
                      name='firstname'
                      type='text'
                      autoComplete='firstname'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  {errors.firstname && touched.firstname ? (
                    <div className='text-red-600'>{errors.firstname}</div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor='lastname'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='lastname'
                      name='lastname'
                      type='text'
                      autoComplete='lastname'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  {errors.lastname && touched.lastname ? (
                    <div className='text-red-600'>{errors.lastname}</div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Email address
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className='text-red-600'>{errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                  <div className='mt-2'>
                    <Field
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className='text-red-600'>{errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {errorMsg && <div className='text-center text-red-600'>{errorMsg}</div>}
      {successMsg && <div className='text-center text-black'>{successMsg}</div>}
      <button
        className='font-medium text-indigo-600 hover:text-indigo-500'
        type='button'
        onClick={() => setView(VIEWS.SIGN_IN)}
      >
        Already have an account? Sign In.
      </button>
    </div>
  );
};

export default SignUp;
