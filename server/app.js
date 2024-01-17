import express from "express";
import helmet from "helmet";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import "dotenv/config";
import fs from "fs";
const fsPromises = fs.promises;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.post("/register", async (req, res) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 15);

	try {
		await fsPromises.writeFile("users.txt", `${email}:${hashedPassword}\n`, {
			flag: "a",
		});
		res.status(200).json({ message: "User registered" });
	} catch (error) {
		console.error("Error writing to file:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required" });
	}
	try {
		const data = await fsPromises.readFile("users.txt", "utf-8");
		const users = data.split("\n");
		for (const user of users) {
			const [storedEmail, storedHashedPassword] = user.split(":");
			if (email === storedEmail) {
				const passwordMatch = await bcrypt.compare(
					password,
					storedHashedPassword
				);
				if (passwordMatch) {
					res.status(200).json({ message: "Logged in" });
					return;
				}
			}
		}
		res.status(401).json({ message: "Unauthorized" });
	} catch (error) {
		console.error("Error reading file:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
