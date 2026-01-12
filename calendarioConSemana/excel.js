const input = document.getElementById('excelInput');

input.addEventListener('change', manejarArchivo);

async function manejarArchivo(event) {
  const file = event.target.files[0];
  if (!file) return;

  console.log('Archivo cargado:', file.name);
  await leerExcel(file);
}

async function leerExcel(file) {
  const workbook = new ExcelJS.Workbook();

  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);

  console.log('Workbook cargado correctamente');

  procesarWorkbook(workbook);
}

function procesarWorkbook(workbook) {
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
        console.warn('No se encontró ninguna hoja en el archivo Excel.');
        return;
    }
    console.log('Procesando hoja:', worksheet.name);
    
    const totalFilas = worksheet.rowCount;
    const totalColumnas = worksheet.columnCount;
    
    console.log(`Total de filas: ${totalFilas} Total de columnas: ${totalColumnas}`);
    
}

