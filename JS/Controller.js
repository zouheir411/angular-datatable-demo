
// Define the controller
function DeviceController($scope, $timeout) {
    $scope.initCallback = function(table) {
        console.log('DataTable initialized', table);
        // You can perform any actions here after the DataTable is ready
    };
    var storedDevices = JSON.parse(localStorage.getItem('devices')) || [];
    if (!Array.isArray(storedDevices)) {
        storedDevices = [];
    }
    $scope.devices = storedDevices;

    // Function to add a device
    $scope.AddDevice = function() {
        if ($scope.DeviceName) {
            $scope.isEditMode = false;
            var newId = $scope.devices.length > 0 ? Math.max(...$scope.devices.map(device => device.id)) + 1 : 1;
            // Add the new device with the unique sequential ID
            $scope.devices.push({
                name: $scope.DeviceName,
                id: newId
            }); // Assign the sequential ID;
            localStorage.setItem('devices', JSON.stringify($scope.devices));
            $scope.CloseModal(); // Close the modal
        }
    };

    // Function to delete a device
    $scope.DeleteDevice = function(id) {
        console.log('Delete device called', id); // Debug log
       var result= confirm('Are you sure you want to delete this device?') ;
       if(result){
        $scope.devices = $scope.devices.filter(device => device.id !== id);
        localStorage.setItem('devices', JSON.stringify($scope.devices));
       }
    };
    // Function to edit a device
    $scope.EditDevice = function (id) {
        $scope.isEditMode = true; // Enable edit mode
        const deviceToEdit = $scope.devices.find(device => device.id === id);
        if (deviceToEdit) {
            $scope.DeviceName = deviceToEdit.name; // Populate the input with the device name
            $scope.editingDeviceId = id; // Save the ID of the device being edited
        }
    };
    // Function to update a device
    $scope.UpdateDevice = function () {
        $scope.UpdateDevice = function () {
            const deviceToUpdate = $scope.devices.find(device => device.id === $scope.editingDeviceId);
            if (deviceToUpdate) {
                deviceToUpdate.name = $scope.DeviceName; // Update the device name
                localStorage.setItem('devices', JSON.stringify($scope.devices)); // Save changes to localStorage
                $scope.isEditMode = false; // Exit edit mode
                $scope.CloseModal(); // Close the modal
            }
        };
    };
    // Function to hide the modal
    $scope.CloseModal = function () {
       document.getElementById('AddDeviceModal').style.display = 'none';
       window.location.reload();        
       $scope.DeviceName = ''; // Clear the input
    };
    
}
// Register the controller with the AngularJS app
app.controller('DeviceController', ['$scope', '$timeout', DeviceController]);
