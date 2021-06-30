import { createServer } from "http";
import { readFile, writeFile } from "fs";
let port = 8080;
let host = "localhost";

////   N  O  D  E .  J  S            S  E  R  V  E  R    ////////

const server = createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // GET DATA FROM AJAX
  if (request.url === "/get-data" && request.method === "GET") {
    response.setHeader("content-type", "application/json");
    let message = readFile("logindata.json", (error, file) => {
      if (error) {
        throw error;
      } else {
        message = Buffer.from(file);
        response.write(file);
        response.end();
      }
    });
  }
  // POST PLAYGROUND DATA
  else if (request.method === "POST" && request.url === "/post-data") {
    response.setHeader("content-type", "application/json");
    let data = [];
    request
      .on("data", (chunk) => {
        data.push(chunk);
      })
      .on("end", () => {
        data = Buffer.concat(data);
        writeFile("playgrounddata.json", data, { flag: "a" }, () => {});
        response.write(data);
        response.end();
      });
  }
  // POST LOG IN DATA FROM AJAX
  else if (request.method === "POST" && request.url === "/post-login-data") {
    response.setHeader("content-type", "application/json");

    let data = [];

    request
      .on("data", (chunk) => {
        data.push(chunk);
      })
      .on("end", () => {
        data = Buffer.concat(data);
        writeFile("logindata.json", data, () => {});
        response.write(data);
        response.end();
      });
  } else {
    response.end();
  }
});
server.listen(port, host, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server is runing on http://${host}:${port}`);
  }
});
