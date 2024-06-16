const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require("./models/item");
const path = require("path");
const nodemailer = require("nodemailer");
const ItemModel = require("./models/item");
// const mongoURI = require("./config/key").admin;

const mongoURI =
  "mongodb+srv://rtos:rtos@rtos.dt3zhlp.mongodb.net/?retryWrites=true&w=majority&appName=RTOS";

// connect to the database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "fanclubofythientv@gmail.com",
    pass: "fyev qkwb hepp dngu",
  },
});

let mailOptions = {
  from: "no113pro@gmail.com",
  to: "hngloc10@gmail.com", // Danh sách các địa chỉ người nhận
  subject: "Chủ đề thư", // Tiêu đề thư
  text: "Nội dung thư dạng text", // Nội dung thư dạng text
  html: "<Chúng tôi đang theo dõi chặt chẽ tình hình thời tiết, và các báo cáo mới nhất từ Trung tâm Khí tượng Thủy văn cho biết một trận mưa lớn đang hình thành và có khả năng gây ra lũ lụt nghiêm trọng trong khu vực của chúng ta trong vòng 24-48 giờ tới. Mực nước dự kiến sẽ tăng nhanh và có thể vượt quá mức báo động.", // Nội dung thư dạng HTML
};

const sendEmail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const app = express();

// use body-parser middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/sensors", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// handle post requests
app.post("/api/sensors", async function (req, res) {
  console.log(req.body);

  const body = req.body;
  const data = body.data.split("-");

  const [distance, rain, tem, hum] = data;

  if (distance < 10 && rain > 50) {
    sendEmail();
  }

  await ItemModel.create({
    temp: tem,
    hum: hum,
    distance: distance,
    rain: rain,
  });

  res.json("Success!");
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
