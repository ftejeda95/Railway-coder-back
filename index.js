import express from "express";
import http, { request } from "http";
import useragent from "express-useragent";
import path from "path";
import { engine } from "express-handlebars";
import productos from "./routers/productos.js";
import upload from "./routers/upload.js";
import indexRouter from "./routers/views/index.js";
import { initSocket } from "./socket.js";
import productsTest from "./routers/views-test/index.js";
import cors from "cors";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./model/user.js";
import minimist from 'minimist'
import os from 'os'

//Crear App
const opts = {
  default: {
    port: 8080,
    mode: 'fork',
  },
  alias: {
    p: 'port',
    m: 'mode'
  }
}

const { port: PORT, mode } = minimist(process.argv.slice(2), opts)
// 
if (mode === 'cluster' && cluster.isMaster) { // Require node in version 16 or higher. Other versions call isMaster property.
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} | code ${code} | signal ${signal}`)
    console.log('Starting a new worker...')
    cluster.fork()
  })
} else {
const app = express();
//Crear Puerto
// const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;
//configuro la App



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use("/", express.static(path.join(__dirname, "public/")));
app.use(cors());
//configuro Motor de Plantillas
passport.use(
  "sign-in",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            console.log(`User with ${email} not found.`);

            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            console.log("Invalid Password");

            return done(null, false);
          }
          done(null, user);
        })
        .catch((error) => {
          console.log("Error in sign-in", error.message);

          done(error, false);
        });
    }
  )
);

passport.use(
  "sign-up",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (user) {
            console.log(`User ${email} already exists.`);

            return done(null, false);
          } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            return UserModel.create(req.body);
          }
        })
        .then((newUser) => {
          console.log(newUser);
          if (newUser) {
            console.log(`User ${newUser.email} registration succesful.`);

            done(null, newUser);
          } else {
            throw new Error("User already exists");
          }
        })
        .catch((error) => {
          console.log("Error in sign-up", error.message);
          return done(error);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then((user) => done(null, user))
    .catch(done);
});

app.use(
  session({
    secret: "K&UV1tlls3T0",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(useragent.express());

app.set("views", path.join(__dirname, "views/"));

app.use(
  session({
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 600,
    }),
    secret: "b$x0J77c#20k",
    resave: true,
    saveUninitialized: true,
  })
);
//configuro los Router


app.use("/", indexRouter, productsTest);
app.use("/api", productos, upload);

//configuro Error

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//crear Servidor

const server = http.createServer(app);
initSocket(server, PORT);

//Escucho Servidor

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/ from process ${process.pid}`)
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${ENV}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
}