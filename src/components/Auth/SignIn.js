'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';
import { FacebookIcon, TwitterIcon, GithubIcon } from '../common/socialIcons';
import { Logo } from '../common/logo';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
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
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <button
            className='font-medium text-indigo-600 hover:text-indigo-500'
            onClick={() => setView(VIEWS.SIGN_UP)}
          >
            start your 14-day free trial
          </button>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={signIn}
          >
            {({ errors, touched }) => {
              return (
                <Form className='space-y-6'>
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
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <label
                        htmlFor='remember-me'
                        className='ml-2 block text-sm text-gray-900'
                      >
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm'>
                      <button
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Sign in
                    </button>
                  </div>
                  <div className='mt-6'>
                    <div className='relative'>
                      <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300' />
                      </div>
                      <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-500'>
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className='mt-6 grid grid-cols-3 gap-3'>
                      <div>
                        <a
                          href='#'
                          className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        >
                          <span className='sr-only'>Sign in with Facebook</span>
                          <FacebookIcon />
                        </a>
                      </div>

                      <div>
                        <a
                          href='#'
                          className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        >
                          <span className='sr-only'>Sign in with Twitter</span>
                          <TwitterIcon />
                        </a>
                      </div>

                      <div>
                        <a
                          href='#'
                          className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                        >
                          <span className='sr-only'>Sign in with GitHub</span>
                          <GithubIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {errorMsg && <div className='text-center text-red-600'>{errorMsg}</div>}
    </div>
  );
};

export default SignIn;
