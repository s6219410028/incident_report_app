document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch('http://192.168.10.32:8000/api/report', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('reportMessage').textContent = data.message;
            if (data.success) {
                this.reset();
            }
        })
        .catch(error => console.error('Error:', error));
});
