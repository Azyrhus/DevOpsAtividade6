// Funções de conversão de unidades (temperatura e distância).
// Funciona no Node.js (testes) e no navegador (site publicado).

function validar(valor) {
  if (typeof valor !== 'number' || Number.isNaN(valor)) {
    throw new Error('O valor deve ser um número');
  }
}

function celsiusParaFahrenheit(celsius) {
  validar(celsius);
  return (celsius * 9) / 5 + 32;
}

function fahrenheitParaCelsius(fahrenheit) {
  validar(fahrenheit);
  return ((fahrenheit - 32) * 5) / 9;
}

function quilometrosParaMilhas(km) {
  validar(km);
  return km / 1.609344;
}

function milhasParaQuilometros(milhas) {
  validar(milhas);
  return milhas * 1.609344;
}

const Conversor = {
  celsiusParaFahrenheit,
  fahrenheitParaCelsius,
  quilometrosParaMilhas,
  milhasParaQuilometros,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Conversor;
} else {
  window.Conversor = Conversor;
}
