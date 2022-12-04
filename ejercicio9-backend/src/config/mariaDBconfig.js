const objectConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "test",
};

// const objectConfigString = "mysql://coder:house@localhost:3306/coder_clase16";

export const mariaDBconfig = {
  client: "mysql2",
  connection: objectConfig, //Se puede usar objectConfig o objectConfigString;
};
