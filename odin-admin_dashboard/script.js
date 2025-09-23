// Small script to make the sample interactive (toggle active nav, basic add action)
const navItems = document.querySelectorAll('.nav li');
navItems.forEach(i => i.addEventListener('click', () => {
navItems.forEach(x => x.classList.remove('active'));
i.classList.add('active');
}));


// Demo: Add button to project-grid creates a simple alert
const addBtn = document.querySelector('.section-actions .btn');
if(addBtn) addBtn.addEventListener('click', () => alert('Add project — implement form here'));