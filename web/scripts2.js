document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const getToken = () => {
        return localStorage.getItem('token');
    };
    // Add New User
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ username, password, role })
            });

            const data = await response.json();

            if (response.ok) {
                alert('User registered successfully!');
                const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
                registerModal.hide();
            } else {
                alert('Failed to register user: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Remove User
    document.getElementById('removeUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('removeUsername').value;
        const token = getToken();
        console.log('Token:', token);
        console.log('Username:', username);
        try {
            const response = await fetch('http://localhost:5000/manage/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}` // Include token in Authorization header
                },
                body: JSON.stringify({ username })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('User removed successfully.');
            } else {
                alert('Failed to remove user: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    // Add New Bus
    document.getElementById('addBusForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const busNumber = document.getElementById('busNumber').value;
        const capacity = document.getElementById('capacity').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/bus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ busNumber, capacity })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bus added successfully!');
                const addBusModal = new bootstrap.Modal(document.getElementById('addBusModal'));
                addBusModal.hide();
            } else {
                alert('Failed to add bus: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Remove Bus
    document.getElementById('removeBusForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const busNumber = document.getElementById('removeBusNumber').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/bus', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ busNumber })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bus removed successfully!');
                const removeBusModal = new bootstrap.Modal(document.getElementById('removeBusModal'));
                removeBusModal.hide();
            } else {
                alert('Failed to remove bus: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Add New Bus Stop
    document.getElementById('addBusStopForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const routeId = document.getElementById('routeId').value;
        const name = document.getElementById('busStopName').value;
        console.log(name);
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        const sequenceNumber = document.getElementById('sequenceNumber').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/bus-stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ routeId, name, latitude, longitude, sequenceNumber })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bus stop added successfully!');
                const addBusStopModal = new bootstrap.Modal(document.getElementById('addBusStopModal'));
                addBusStopModal.hide();
            } else {
                alert('Failed to add bus stop: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Remove Bus Stop
    document.getElementById('removeBusStopForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('removeBusStopName').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/bus-stop', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Bus stop removed successfully!');
                const removeBusStopModal = new bootstrap.Modal(document.getElementById('removeBusStopModal'));
                removeBusStopModal.hide();
            } else {
                alert('Failed to remove bus stop: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Add New Route
    document.getElementById('addRouteForm').addEventListener('submit', async (e) => {
        console.log('addRouteForm found');
        e.preventDefault();
        const name = document.getElementById('routeName').value;
        console.log(name);
        const startPoint = document.getElementById('startPoint').value;
        const endPoint = document.getElementById('endPoint').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ name, startPoint, endPoint })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Route added successfully!');
                const addRouteModal = new bootstrap.Modal(document.getElementById('addRouteModal'));
                addRouteModal.hide();
            } else {
                alert('Failed to add route: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Remove Route
    document.getElementById('removeRouteForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('removeRouteName').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/route', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ name })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Route removed successfully!');
                const removeRouteModal = new bootstrap.Modal(document.getElementById('removeRouteModal'));
                removeRouteModal.hide();
            } else {
                alert('Failed to remove route: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    document.getElementById('addScheduleForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const routeId = document.getElementById('routeid').value;
        console.log(routeId);
        const busId = document.getElementById('busId').value;
        const driverId = document.getElementById('driverId').value;
        const conductorId = document.getElementById('conductorId').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ routeId, busId, driverId, conductorId, startTime, endTime })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Schedule added successfully!');
                const addScheduleModal = new bootstrap.Modal(document.getElementById('addScheduleModal'));
                addScheduleModal.hide();
            } else {
                alert('Failed to add schedule: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    document.getElementById('removeScheduleForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const scheduleId = document.getElementById('scheduleId').value;
        const token = getToken();
        try {
            const response = await fetch('http://localhost:5000/manage/schedule', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({ scheduleId })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Schedule removed successfully!');
                const removeScheduleModal = new bootstrap.Modal(document.getElementById('removeScheduleModal'));
                removeScheduleModal.hide();
            } else {
                alert('Failed to remove schedule: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
    );
});