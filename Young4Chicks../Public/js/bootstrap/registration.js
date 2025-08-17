 script
        const emailInput = document.getElementById('email');
        const ninInput = document.getElementById('nin');
        const emailMsg = document.getElementById('emailMsg');
        const ninMsg = document.getElementById('ninMsg');
        const form = document.getElementById('salesAgentForm');

        emailInput.addEventListener('blur', async () =>{
         const res = await fetch('/check-email', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ email: emailInput.value })
         });
        const data = await res.json();
        if(!data.available) emailMsg.textContent = 'Email already in use!';
        else emailMsg.textContent = '';
     });

        ninInput.addEventListener('blur', async () => {
           const res = await fetch('/check-nin', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ nin: ninInput.value })
         });
        const data = await res.json();
        if(!data.available) ninMsg.textContent = 'NIN already in use!';
        else ninMsg.textContent = '';
        });

        form.addEventListener('submit', async (e) => {
        if(emailMsg.textContent || ninMsg.textContent) {
            e.preventDefault();
            alert('Please fix duplicate email or NIN before submitting.');
        }
        });
