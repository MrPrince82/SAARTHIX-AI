const testUser = {
  name: "Test Student",
  email: "teststudent@example.com",
  password: "TestPassword123"
};

fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(testUser)
})
  .then(async (response) => {
    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", text);
  })
  .catch((error) => {
    console.log("Error:", error);
  });