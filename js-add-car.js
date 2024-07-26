document.getElementById('add-car-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var carName = document.getElementById('car-name').value;
    var carType = document.getElementById('car-type').value;
    var carYear = document.getElementById('car-year').value;
    var carPrice = document.getElementById('car-price').value;
    var carImageFile = document.getElementById('car-image').files[0];

    var reader = new FileReader();
    reader.onloadend = function() {
        var carImage = reader.result;

        var car = {
            name: carName,
            type: carType,
            year: carYear,
            price: carPrice,
            image: carImage
        };

        var cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));

        alert('Car added successfully!');
        window.location.href = 'main.html';
    };

    if (carImageFile) {
        reader.readAsDataURL(carImageFile);
    } else {
        alert('Please upload an image.');
    }
});
