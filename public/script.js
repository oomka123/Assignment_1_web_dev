const form = document.getElementById("bmiForm");
const resultDiv = document.getElementById("result");
const bmiValueSpan = document.getElementById("bmiValue");
const categoryText = document.getElementById("categoryText");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  // Basic validation
  if (weight <= 0 || height <= 0) {
    alert("Please enter positive numbers for weight and height.");
    return;
  }

  try {
    const response = await fetch("/calculate-bmi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight, height }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.message);
      return;
    }

    // Display result
    bmiValueSpan.textContent = data.bmi;
    categoryText.textContent = data.category;
    categoryText.className = data.color;

    resultDiv.classList.remove("hidden");
    resultDiv.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    alert("Error calculating BMI. Please try again.");
  }
});
