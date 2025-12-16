const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS)
app.use(express.static("public"));

// GET / - Render the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST /calculate-bmi - Calculate BMI
app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // Validate inputs
  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.json({
      error: true,
      message: "Please enter valid positive numbers for weight and height.",
    });
  }

  // Calculate BMI
  const bmi = weight / (height * height);
  const bmiValue = bmi.toFixed(2);

  // Determine category
  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    color = "green";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "yellow";
  } else {
    category = "Obese";
    color = "red";
  }

  // Send response
  res.json({
    error: false,
    bmi: bmiValue,
    category: category,
    color: color,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
