// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            sessionType: document.getElementById('session-type').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };
        
        // Show success message
        const formWrapper = document.querySelector('.book-form-wrapper');
        formWrapper.innerHTML = `
            <div class="success-message">
                <h3>🎉 Booking Request Sent!</h3>
                <p>Thanks ${formData.name}! We'll contact you at ${formData.email} within 24 hours to confirm your ${formData.sessionType} session.</p>
                <p style="margin-top: 15px; font-size: 14px;">Can't wait to create magic with you! ✨</p>
            </div>
        `;
        
        // In a real application, you would send this data to a server
        console.log('Booking submitted:', formData);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});