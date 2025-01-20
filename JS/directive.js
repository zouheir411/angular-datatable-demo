angular.module('MyModule').directive('dataTableDirective', function($timeout) {
    return {
        restrict: 'A', // Attribute directive
        scope: {
            tableId: '@', // Bind the table ID
            onInit: '&'   // Callback for initialization
        },
        link: function(scope, element) {
            // Initialize the DataTable after Angular has rendered the table
            $timeout(function() {
                var dataTable = angular.element(element).DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    pageLength: 5,
                    lengthMenu: [5, 10, 25, 50],
                    responsive: true
                });

                // Expose the DataTable instance to the parent scope
                scope.$parent.getTableInstance = function() {
                    return dataTable;
                };

                // Trigger the callback when initialized
                if (scope.onInit) {
                    scope.onInit({ table: dataTable });
                }
            });
        }
    };
});
