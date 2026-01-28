
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Modal elements
        const reservationModal = document.getElementById('reservationModal');
        const colisModal = document.getElementById('colisModal');
        const infoModal = document.getElementById('infoModal');
        
        // Open modal buttons
        const openReservationBtn = document.querySelector('.open-reservation');
        const openColisBtn = document.querySelector('.open-colis');
        const openInfoBtn = document.querySelector('.open-info');
        
        // Close modal buttons
        const closeReservationBtn = document.getElementById('closeReservation');
        const closeColisBtn = document.getElementById('closeColis');
        const closeInfoBtn = document.getElementById('closeInfo');
        
        // Open modals
        openReservationBtn.addEventListener('click', () => {
            reservationModal.classList.add('active');
        });
        
        openColisBtn.addEventListener('click', () => {
            colisModal.classList.add('active');
        });
        
        openInfoBtn.addEventListener('click', () => {
            infoModal.classList.add('active');
        });
        
        // Close modals
        closeReservationBtn.addEventListener('click', () => {
            reservationModal.classList.remove('active');
        });
        
        closeColisBtn.addEventListener('click', () => {
            colisModal.classList.remove('active');
        });
        
        closeInfoBtn.addEventListener('click', () => {
            infoModal.classList.remove('active');
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === reservationModal) {
                reservationModal.classList.remove('active');
            }
            if (e.target === colisModal) {
                colisModal.classList.remove('active');
            }
            if (e.target === infoModal) {
                infoModal.classList.remove('active');
            }
        });
        
        // Tarif calculation for reservation
        const trajetSelect = document.getElementById('trajet');
        const passengersInput = document.getElementById('passengers');
        const priceDisplay = document.getElementById('priceDisplay');
        
        const tarifs = {
            "Ouagadougou-Bobo Dioulasso": 5000,
            "Ouagadougou-Koudougou": 2000,
            "Ouagadougou-Ouahigouya": 3500,
            "Ouagadougou-Fada N'Gourma": 4000,
            "Bobo Dioulasso-Dédougou": 2500,
            "Bobo Dioulasso-Banfora": 1500,
            "Ouagadougou-Kaya": 2500,
            "Ouagadougou-Tenkodogo": 3000
        };
        
        function updatePrice() {
            const selectedTrajet = trajetSelect.value;
            const passengers = parseInt(passengersInput.value) || 1;
            
            if (selectedTrajet && tarifs[selectedTrajet]) {
                const totalPrice = tarifs[selectedTrajet] * passengers;
                priceDisplay.textContent = `${totalPrice.toLocaleString()} FCFA`;
            } else {
                priceDisplay.textContent = "0 FCFA";
            }
            
            // Update ticket preview
            document.getElementById('previewTrajet').textContent = selectedTrajet || "-";
            document.getElementById('previewDate').textContent = document.getElementById('date').value || "-";
            document.getElementById('previewPassengers').textContent = passengers;
            document.getElementById('previewNom').textContent = document.getElementById('nom').value || "-";
        }
        
        trajetSelect.addEventListener('change', updatePrice);
        passengersInput.addEventListener('input', updatePrice);
        document.getElementById('date').addEventListener('change', updatePrice);
        document.getElementById('nom').addEventListener('input', updatePrice);
        
        // Form submissions to WhatsApp
        const reservationForm = document.getElementById('reservationForm');
        const colisForm = document.getElementById('colisForm');
        const infoForm = document.getElementById('infoForm');
        
        const whatsappNumber = "+22677030941";
        
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const trajet = trajetSelect.value;
            const date = document.getElementById('date').value;
            const passengers = document.getElementById('passengers').value;
            const nom = document.getElementById('nom').value;
            const telephone = document.getElementById('telephone').value;
            
            const prix = tarifs[trajet] ? (tarifs[trajet] * parseInt(passengers)).toLocaleString() : "0";
            
            const message = `Nouvelle réservation SARAMAYA:%0A%0A` +
                           `*Trajet:* ${trajet}%0A` +
                           `*Date:* ${date}%0A` +
                           `*Nombre de passagers:* ${passengers}%0A` +
                           `*Nom complet:* ${nom}%0A` +
                           `*Téléphone:* ${telephone}%0A` +
                           `*Prix total:* ${prix} FCFA`;
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Reset form and close modal
            reservationForm.reset();
            reservationModal.classList.remove('active');
            updatePrice();
            
            // Show confirmation alert
            alert("Votre réservation a été préparée. Vous allez être redirigé vers WhatsApp pour l'envoyer à SARAMAYA.");
        });
        
        colisForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const expediteur = document.getElementById('expediteur').value;
            const tel_expediteur = document.getElementById('tel_expediteur').value;
            const destinataire = document.getElementById('destinataire').value;
            const tel_destinataire = document.getElementById('tel_destinataire').value;
            const ville_depart = document.getElementById('ville_depart').value;
            const ville_arrivee = document.getElementById('ville_arrivee').value;
            const description = document.getElementById('description').value;
            const poids = document.getElementById('poids').value;
            const type_colis = document.getElementById('type_colis').value;
            
            const message = `Nouvel envoi de colis SARAMAYA:%0A%0A` +
                           `*Expéditeur:* ${expediteur}%0A` +
                           `*Téléphone expéditeur:* ${tel_expediteur}%0A` +
                           `*Destinataire:* ${destinataire}%0A` +
                           `*Téléphone destinataire:* ${tel_destinataire}%0A` +
                           `*De:* ${ville_depart}%0A` +
                           `*À:* ${ville_arrivee}%0A` +
                           `*Description:* ${description}%0A` +
                           `*Poids:* ${poids} kg%0A` +
                           `*Type:* ${type_colis}`;
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Reset form and close modal
            colisForm.reset();
            colisModal.classList.remove('active');
            
            // Show confirmation alert
            alert("Votre fiche colis a été préparée. Vous allez être redirigé vers WhatsApp pour l'envoyer à SARAMAYA.");
        });
        
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const info_nom = document.getElementById('info_nom').value;
            const info_telephone = document.getElementById('info_telephone').value;
            const info_email = document.getElementById('info_email').value;
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value;
            
            const whatsappMessage = `Demande de renseignements SARAMAYA:%0A%0A` +
                                   `*Nom:* ${info_nom}%0A` +
                                   `*Téléphone:* ${info_telephone}%0A` +
                                   `*Email:* ${info_email}%0A` +
                                   `*Sujet:* ${sujet}%0A` +
                                   `*Message:* ${message}`;
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Reset form and close modal
            infoForm.reset();
            infoModal.classList.remove('active');
            
            // Show confirmation alert
            alert("Votre demande a été préparée. Vous allez être redirigé vers WhatsApp pour l'envoyer à SARAMAYA.");
        });
        
        // Set minimum date to today for reservation
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').setAttribute('min', today);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize price display

        updatePrice();
