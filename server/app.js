const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
  })
);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// In-memory хранилище для объявлений
let items = [];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

const users = [];
const secretKey = "your_secret_key";

// Middleware для аутентификации пользователя
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Регистрация пользователя
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
});

// Аутентификация пользователя
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Неверные учетные данные" });
  }
});

// Создание нового объявления
app.post("/items", authenticateJWT, upload.single("image"), (req, res) => {
  const { name, description, location, type, ...rest } = req.body;
  const image = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : null;

  // Проверка наличия обязательных полей
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Отсутствуют обязательные поля" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для недвижимости" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для авто" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Отсутствуют обязательные поля для услуг" });
      }
      break;
    default:
      return res.status(400).json({ error: "Недопустимый тип" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    image,
    creator: req.user.username,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  res.json(items);
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id == parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Объявление не найдено");
  }
});

// Обновление объявления по его id
app.put("/items/:id", upload.single("image"), (req, res) => {
  const item = items.find((i) => i.id == parseInt(req.params.id, 10));
  if (item) {
    const { name, description, location, type, ...rest } = req.body;
    const image = req.file
      ? `http://localhost:3000/uploads/${req.file.filename}`
      : item.image;

    Object.assign(item, { name, description, location, type, image, ...rest, creator: item.creator });
    res.json(item);
  } else {
    res.status(404).send("Объявление не найдено");
  }
});

app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id == parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Объявление не найдено");
  }
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static(uploadDir));

app.options("*", cors()); // Enable pre-flight requests for all routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
