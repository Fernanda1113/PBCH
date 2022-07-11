import { React, ReactDOMServer, RouteHandler } from "../deps.ts";
import * as colorsModel from "../models/colors.model.ts";
import ColourList from "../views/components/ColourList.tsx";
import ColourForm from "../views/components/ColourForm.tsx";
import Title from "../views/components/Title.tsx";

export const getHome: RouteHandler = async req => {
  const list = colorsModel.getAll();
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8"
    }),
    body: ReactDOMServer.renderToString(
      <html lang="es">
        <head>
          <meta charSet="UTF-8" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          <title>Parte 23</title>
        </head>
        <body
          style={{
            backgroundColor: "#D3D3D3",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Title />
          <ColourForm />
          <ColourList list={list} />
        </body>
      </html>
    )
  });
};

export const postColor: RouteHandler = async req => {
  const data = (await req.formData()).value("color");
  if (data) colorsModel.save(data);
  await req.redirect("/");
};