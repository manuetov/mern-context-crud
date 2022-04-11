import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostsContext } from "../context/postContext.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export function PostForm() {
  const { createPost, getPost, updatePost } = usePostsContext();
  const navigate = useNavigate();   // hooks redirecciona sin refrescar
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  const params = useParams();   // useParams devuelve un objeto y se guarda en una const
  console.log(params);

  // comprueba si el params.id existe, llama a getPost() y le pasa el params.id
  // para que lo pase al contexto y lo muestra por consola
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
  }, [params.id, getPost]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          enableReinitialize // resetea/refresca para traer los datos del formulario
          validationSchema={Yup.object({ // validación de campos del formulario con yup
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
            // image: Yup.mixed().required("The image required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            // actions.resetForm();
            actions.setSubmitting(false);
            navigate("/"); //redirecciona a la pagina principal
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Title
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Post title"
                name="title"
                // autoFocus
              />
              {/** validador de error => ej. campo formulario vacio */}
              <ErrorMessage 
                component="p"
                name="title"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                id="description"
                placeholder="Write a description"
                rows="3"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="image"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <ErrorMessage
                component="p"
                name="image"
                className="text-red-400 text-sm"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
