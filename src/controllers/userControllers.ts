import { Request, Response, NextFunction } from "express";
import { query } from "./../db";
import { QueryResult } from "pg";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { users } from "../mockdata";
import { User } from "./../datatypes/User";
import { secret } from "./../configuration/index";

export const getUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = users.find(user => user.userId == parseInt(id));
  res.send({ userId });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Take user data from req.body
    const { username, email, password } = req.body;
    // Check for value in name, email and password - required fields validation
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Username, email or password required." });
    }

    // TODO: Check for expected value in name, email and password - valid data format
    const usernameRegex = RegExp("^[^\\d\\s](\\S+ ){0,1}\\S+$");
    const emailRegex = RegExp("^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    const passwordRegex = RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}");

    if (!usernameRegex.test(username)) {
      console.log(username);
      return res.status(400).send({ message: `Username: ${username} must contain at least two characters, no number at the beginning and no whitespace around.` });
    }

    // email: standard email format validation a@a.a
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: `Email address ${email} must have valid email address format.` });
    }

    if (!passwordRegex.test(password)) {
      console.log(`Password: ${password} does not match the password regex ${passwordRegex}`);
      return res.status(400).send({ message: "Password must contain an uppercase, a lowercase, a special character and a number." })
    }

    // TODO: Don't we have to have Confirm Password field on Register form?
    // If yes, then check if password confirmation matches password field

    // Check that email address does not already exist in DB
    const dbUserCheck: QueryResult<any> = await query(
      `SELECT * 
      FROM users 
      WHERE user_email = $1`,
      [email]);

    if (dbUserCheck.rows[0]) {
      return res.status(400).send({ message: "Registration not successful." })
    }

    // Once registration data checks pass, hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const { rows } = await query(
      `INSERT INTO users (user_name, user_email, password)
      VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );

    const dbUser = rows[0];

    const user = mapToJwtUserModel(dbUser);

    // Once user is created, return success and set access token 
    // Authorization
    const accessToken: string = jwt.sign(user, secret);

    // Return success response
    return res.send({
      message: "User registered successfully",
      token: accessToken,
      username: user.userName,
      email: user.userEmail
    })
  }
  catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // Take user data from req.body
  const { email, password } = req.body;

  // Check for value in name, email and password - required fields validation
  if (!email || !password) {
    return res.status(400).send({ message: "Email or password required." });
  }

  // Find user in DB based on email
  const dbUserCheck: QueryResult<any> = await query(
    `SELECT * 
    FROM users 
    WHERE user_email = $1`,
    [email]
  );

  const dbUser = dbUserCheck.rows[0];

  // If not found, return message, status 404 (Not a good practice, but leave it for now)
  if (!dbUser) {
    return res.status(404).send({ message: "Incorrect credentials, please try again." })
  }

  // If found, check for password match
  const passwordMatch: boolean = await bcrypt.compare(password, dbUser.password);

  // If entered password doesn't match, return 401 message
  if (!passwordMatch) {
    res.status(401).send({ message: "Incorrect credentials, please try again." });
  }
  else {
    // If entered password matches, return success and set access token 
    // Authorization
    const user = mapToJwtUserModel(dbUser);

    const accessToken: string = jwt.sign(user, secret);
    res.send({
      message: "User logged in successfully.",
      token: accessToken
    });
  }
}

function mapToJwtUserModel(dbUser: any): User {
  const user: User = {
    userId: dbUser.userId,
    userName: dbUser.userName,
    userEmail: dbUser.userEmail,
    userImageURL: dbUser.userImageUrl
  };

  return user;
}

export const editUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send("PUT request to the userID " + id);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send("PUT request to taskId" + id);
};
