// Create mobile-friendly data table by setting column label as ::before content
// SCSS:
// div.table.split > table, table.split {
//     @include media-breakpoint-down(md) {
//        thead, tr:first-child { display: none; }
//        tr { padding: 0; background: none !important; }
//        tr, td { display: block; border-right: none; }
//        tr td:last-child { border-bottom: none; }
//        tr td { display: flex; }
//        tr td:first-child {
//         background: $table-head-bg;
//         color: $table-head-color;
//       }
//       td:before {
//         content: attr(data-label);
//         display: block;
//         font-weight: bold;
//         flex: 0 1 50%;
//       }
//     }
//   }
function setupTables() {
    var tables = document.querySelectorAll('div.table.split, table.split');
    [...tables].forEach(table => {
        // find first row
        var allRows = table.getElementsByTagName('tr');
        var firstRow = allRows[0];
        const [, ...dataRows] = allRows;

        dataRows.forEach(data => {
            var cells = [...(data.getElementsByTagName('td'))];
             for (let [index, cell] of cells.entries()) {
                 var cellItem = cell;
                 cellItem.setAttribute('data-label', firstRow.children[index].textContent)
             }
         });
    });
}

export {setupTables}