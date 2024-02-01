import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// raiz de la api
app.get("/", (req, res) => {
  res.send("API NodeJS y Express");
});

// leer todos los datos de la api o BD
app.get("/usuarios", (req, res) => {
  const data = readData();
  res.json(data.usuarios);
});

// leer datos por item o id
app.get("/usuarios/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const usuario = data.usuarios.find((usuario) => usuario.id === id);
  if (!usuario) return res.status(404).send("Usuario no encontrado");
  res.json(usuario);
});

// login con usuarios de la BD

// agregar datos a la api o BD

app.post("/usuarios", (req, res) => {
  const data = readData();
  const body = req.body;
  const newusers = {
    id: data.usuarios.length + 1,
    ...body,
  };
  data.products.push(newproduct);
  writeData(data);
  res.json(newproduct);
});

// actualizar datos de la api o BD

// eliminar datos

app.delete("/usuarios/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);
  data.usuarios.splice(usuarioIndex, 1);
  writeData(data);
  res.json({ message: "Usuario eliminado exitosamente" });
});

app.listen(3001, () => {
  console.log("Servidor escuchando en el puerto 3001");
});
