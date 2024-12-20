document.addEventListener('DOMContentLoaded', () => {
    const sheetId = '182y9gDkMGlZHvJ369KFv_RiNta4_DINjxFcINa5x_-0';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    fetch(base)
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data.substr(47).slice(0, -2));
            const rows = json.table.rows;
            const cols = json.table.cols;

            let thead = '<tr>';
            cols.forEach(col => {
                thead += `<th class="text-center">${col.label.toUpperCase()}</th>`;
            });
            thead += '</tr>';
            document.querySelector('#data-table thead').innerHTML = thead;

            let tbody = '';
            rows.forEach(row => {
                if (row.c[0] && row.c[0].v !== null) {
                    tbody += '<tr>';
                    row.c.forEach(cell => {
                        let cellContent = (cell && cell.v !== null) ? cell.v : `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        `;
                        let cellClass = (cell && cell.v !== null) ? 'bg-gray-900 text-white font-semibold' : 'text-center bg-green-500 text-white font-semibold w-2';

                        if (cell && cell.v === 'turno') {
                            cellContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>`;
                            cellClass = 'text-center bg-red-200 text-gray-900 font-semibold w-2';
                        } else if (cell && typeof cell.v === 'string' && cell.v.startsWith('Date')) {
                            const dateParts = cell.v.match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
                            if (dateParts) {
                                const year = parseInt(dateParts[1]);
                                const month = parseInt(dateParts[2]);
                                const day = parseInt(dateParts[3]);
                                const hour = parseInt(dateParts[4]);
                                const minute = parseInt(dateParts[5]);
                                const second = parseInt(dateParts[6]);

                                const date = new Date(year, month, day, hour, minute, second);
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                cellContent = `${hours}:${minutes}`;
                                cellClass = 'text-center bg-gray-900 text-yellow-500 font-semibold';
                            }
                        }

                        tbody += `<td class="border px-10 py-2 ${cellClass}">${cellContent}</td>`;
                    });
                    tbody += '</tr>';
                }
            });
            document.querySelector('#data-table tbody').innerHTML = tbody; 
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});