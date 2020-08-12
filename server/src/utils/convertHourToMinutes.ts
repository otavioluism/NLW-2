export default function convertHourToMinutes(time: string) { 

  // 8:00 entao | "8"    "00" |    para  | 8      00 |  
  // dividir os number pelos dois pontos e passar pelos dois e transformar para numero
  const array = time.split(':').map(Number)

  const hour = array[0];
  const minutes = array[1];

  const timeInMinutes = ((hour * 60) + minutes);

  return timeInMinutes;
}