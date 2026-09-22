const userId = "6a7e43f92edc0991eacaf1c4";

async function updateProfile() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/profile/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          education: "MCA",
          skills: [
            "Java",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB",
            "SQL"
          ],
          targetRole: "Full Stack Developer",
          experience: "Fresher",
          projects: [
            "SAARTHIX AI",
            "E-Commerce Website"
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

  } catch (error) {
    console.log("Error:", error);
  }
}

updateProfile();