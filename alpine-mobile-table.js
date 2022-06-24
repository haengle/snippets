export default () => ({
 
  mobiletable: {
    ['x-init']() {
      var table = this.$el;
          var allRows = table.getElementsByTagName('tr');
          var firstRow = allRows[0];
          const [, ...dataRows] = allRows;

          dataRows.forEach(data => {
              var cells = [...(data.children)];
              for (let [index, cell] of cells.entries()) {
                  var cellItem = cell;
                  cellItem.setAttribute('data-label', firstRow.children[index].textContent)
              }
          });
    },
    [':class']() {
       return 'table--mobile'
    },
  }
  
  });
  
// use in NJK component
//  <div x-data="tables" class="table-wrapper" x-bind="mobiletable">
    // table code
// </div>
