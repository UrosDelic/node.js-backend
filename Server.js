import { createServer } from "http";
import { readFile, writeFile } from "fs";
let port = 8080;
let host = "localhost";

////   N  O  D  E .  J  S            S  E  R  V  E  R    ////////

const server = createServer((request, response) => {
  // function for writing data
  function writeData(data, file, flag) {
    request
      .on("data", (chunk) => {
        data.push(chunk);
      })
      .on("end", () => {
        data = Buffer.concat(data);
        writeFile(file, data, flag, () => {});
        response.write(data);
        response.end();
      });
  }

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
    writeData(data, "playgrounddata.json", { flag: "a" });
  }
  // POST LOG IN DATA FROM AJAX
  else if (request.method === "POST" && request.url === "/post-login-data") {
    response.setHeader("content-type", "application/json");
    let data = [];
    writeData(data, "logindata.json");
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
