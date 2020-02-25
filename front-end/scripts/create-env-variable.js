const fs = require("fs");

const PORT = process.env.PORT || 3000;
const jsonContent = "export const environment = {\n" +
  "  production: true,\n" +
  "  port: " + PORT + "\n" +
  "};\n";

fs.writeFile(__dirname + '/../src/environments/environment.prod.ts', jsonContent, 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

fs.writeFile(__dirname + '/../src/environments/environment.ts', jsonContent, 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
