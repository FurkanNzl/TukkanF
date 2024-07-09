import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [error,setError] = useState("") 
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: values.username,
          password: values.password,
        });
        if (response.data?.token) {
          router.push("/home")
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error.response.data);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`block w-full p-3 rounded border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500`}
              placeholder="you@example.com"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`block w-full p-3 rounded border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500`}
              placeholder="********"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
            {error ? (<div className="text-red-500 text-sm mt-1">{error}</div>) : null }
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
