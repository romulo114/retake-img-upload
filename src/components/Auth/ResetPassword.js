'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';
import { Logo } from '../common/logo';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent.');
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
              email: '',
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={resetPassword}
          >
            {({ errors, touched }) => (
              <Form className='space-y-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors.email && touched.email ? (
                  <div className='!mt-0 text-red-600'>{errors.email}</div>
                ) : null}
                <button
                  className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  type='submit'
                >
                  Send Instructions
                </button>
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
        Remember your password? Sign In.
      </button>
    </div>
  );
};

export default ResetPassword;
