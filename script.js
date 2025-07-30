function toggleSection(id) {
    const section = document.getElementById(id);
    const isVisible = section.style.display === 'block';

    
    document.querySelectorAll('.section').forEach(el => el.style.display = 'none');

    if (!isVisible) {
      section.style.display = 'block';
    }
  }
  
