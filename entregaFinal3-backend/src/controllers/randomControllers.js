function num_aleatorios_rango_repeticion(n) {
  n = +n;

  let numeros_generados = [];

  for (let i = 0; i < n; i++) {
    numeros_generados.push(Math.floor(Math.random() * 1000) + 1);
  }
  let contador_de_repeticiones = numeros_generados.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  return contador_de_repeticiones;
}

process.on("exit", () => {
  console.log(`worker #${process.pid} cerrado`);
});

process.on("message", (cant) => {
  const obj = num_aleatorios_rango_repeticion(cant);
  process.send(obj);
  process.exit();
});

process.send("listo");
