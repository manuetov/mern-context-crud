import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostsContext } from "../context/postContext.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePostsContext();
  const navigate = useNavigate();
  // hooks redirecciona sin refrescar
  const params = useParams();
  // useParams devuelve un objeto y se guarda en una const
  console.log(params);
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null
  });

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
    <div className="flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nuevo Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-ray-500">
            Volver
          </Link>
        </header>

        <Formik
          initialValues={ post }
          // validación de campos del formulario con yup
          enableReinitialize // resetea/refresca para traer los datos del formulario
          validationSchema={Yup.object({
            title: Yup.string().required("debe escribir un título"),
            description: Yup.string().required("debe escribir una descripción"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            navigate("/"); //redirecciona a la pagina principal
          }}
        >
          {({ setFieldValue, handleSubmit  }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold
            text-gray.400 "
              >
                Título
              </label>
              <Field
                name="title"
                placeholder="titulo"
                className="px-3 mb-4 py-2 focus:outline-none rounded bg-gray-500 text-white w-full"
              />

              {/* validador de error => ej. campo formulario vacio */}
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold
              text-gray.400 "
              >
                Descripción
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="descripción"
                className="px-3 py-2 focus:outline-none rounded bg-gray-300 text-white w-full"
                rows={5}
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
              >
                subir
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
