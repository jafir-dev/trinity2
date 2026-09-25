/**
 * Trinity Media - Modal functionality
 * Handles registration modal open/close and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
	const modalTrigger = document.querySelector('.trinity-modal-trigger');
	const modal = document.querySelector('.trinity-modal');
	const modalOverlay = document.querySelector('.trinity-modal-overlay');
	const closeButton = document.querySelector('.trinity-modal-close');

	if (!modal || !modalTrigger) return;

	// Open modal on trigger click
	modalTrigger.addEventListener('click', function(e) {
		e.preventDefault();
		modal.classList.add('active');
		if (modalOverlay) modalOverlay.classList.add('active');
		document.body.style.overflow = 'hidden';
	});

	// Close modal on close button click
	if (closeButton) {
		closeButton.addEventListener('click', function(e) {
			e.preventDefault();
			closeModal();
		});
	}

	// Close modal on overlay click
	if (modalOverlay) {
		modalOverlay.addEventListener('click', function(e) {
			if (e.target === modalOverlay) {
				closeModal();
			}
		});
	}

	// Close on ESC key
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closeModal();
		}
	});

	function closeModal() {
		modal.classList.remove('active');
		if (modalOverlay) modalOverlay.classList.remove('active');
		document.body.style.overflow = 'auto';
	}

	// Form submission handler
	const registrationForm = document.querySelector('.trinity-registration-form');
	if (registrationForm) {
		registrationForm.addEventListener('submit', function(e) {
			e.preventDefault();

			// Get form data
			const formData = new FormData(registrationForm);
			const data = {
				name: formData.get('name'),
				email: formData.get('email'),
				phone: formData.get('phone')
			};

			// Validate
			if (!data.name || !data.email || !data.phone) {
				showFormMessage('Please fill all fields', 'error');
				return;
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(data.email)) {
				showFormMessage('Invalid email address', 'error');
				return;
			}

			// Send via WordPress AJAX or API
			fetch(Trinity_Modal.ajaxUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Requested-With': 'XMLHttpRequest'
				},
				body: new URLSearchParams({
					action: 'trinity_registration_submit',
					nonce: Trinity_Modal.nonce,
					name: data.name,
					email: data.email,
					phone: data.phone
				})
			})
			.then(response => response.json())
			.then(result => {
				if (result.success) {
					showFormMessage('Registration successful!', 'success');
					registrationForm.reset();
					setTimeout(() => {
						closeModal();
					}, 1500);
				} else {
					showFormMessage(result.data || 'Registration failed', 'error');
				}
			})
			.catch(error => {
				showFormMessage('Error submitting form', 'error');
				console.error('Form error:', error);
			});
		});
	}

	function showFormMessage(message, type) {
		let messageEl = document.querySelector('.trinity-form-message');

		if (!messageEl) {
			messageEl = document.createElement('div');
			messageEl.className = 'trinity-form-message';
			registrationForm.insertBefore(messageEl, registrationForm.firstChild);
		}

		messageEl.textContent = message;
		messageEl.className = `trinity-form-message trinity-form-${type}`;

		if (type === 'success') {
			setTimeout(() => {
				messageEl.remove();
			}, 3000);
		}
	}
});
