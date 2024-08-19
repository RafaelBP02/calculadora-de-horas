export class Calculadora {
  entrada: string = '';
  inicioIntervalo: string = '';
  fimIntervalo: string = '';

  static converteStringParaDate(tempo: string): Date {
    const [horas, minutos] = tempo.split(':').map(Number);
    const date = new Date();
    date.setHours(horas, minutos, 0, 0);
    return date;
  }
}
