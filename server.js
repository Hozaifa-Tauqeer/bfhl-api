
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "hozaifa_tauqeer";
const DOB = "05072004";
const EMAIL = "hozaifa.tauqeer2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE0550";

app.get("/bfhl", (req, res) => {
  res.send("API is running. Use POST with JSON body at /bfhl");
});


app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, expected { data: [] }"
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        let num = parseInt(item, 10);
        if (!isNaN(num)) {
          sum += num;
          if (num % 2 === 0) {
            even_numbers.push(item);
          } else {
            odd_numbers.push(item);
          }
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    let concat_string = data
      .filter((ch) => /^[a-zA-Z]+$/.test(ch))
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Server error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
