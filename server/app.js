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
app.use(cors({ origin: "http://localhost:5173" }));
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
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		//https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_file_system_flags
		await fsPromises.writeFile("users.txt", `${email}:${hashedPassword}\n`, {
			flag: "a",
		});
		// 'a' - Open file for appending. The file is created if it does not exist. <- from documentation.
		res.status(200).send("User registered");
	} catch (error) {
		console.error("Error writing to file:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
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
					res.status(200).send("Logged in");
					return;
				}
			}
		}
		res.status(401).send("Unauthorized");
	} catch (error) {
		console.error("Error reading file:", error);
		res.status(500).send("Internal Server Error");
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
