const menu = document.getElementById('menu');
                const toggleBtn = document.getElementById('toggleBtn');
        
                toggleBtn.addEventListener('click', toggleMenu);
        
                const tags = document.querySelectorAll('.tag');
        
                tags.forEach(tag => {
                    tag.addEventListener('click', selectTag);
                });
        
                function toggleMenu() {
                    if (menu.style.display === 'none') {
                        const rect = toggleBtn.getBoundingClientRect();
                        menu.style.top = rect.bottom + 'px';
                        menu.style.left = rect.left + 'px';
                        menu.style.width = toggleBtn.offsetWidth + 'px'; 
                        menu.style.display = 'block';
                    } else {
                        menu.style.display = 'none';
                    }
                }
        
                function selectTag(event) {
                    const value = event.target.dataset.value;
                    toggleBtn.textContent = value; 
                    console.log("Selected tag:", value);
                    menu.style.display = 'none'; 
                }
                function initializeCanvas(canvasId, width, height) {
                    const canvas = document.getElementById(canvasId);
                    const ctx = canvas.getContext('2d');
                    let isDrawing = false;
                    let lineWidth = 5;
        
                    canvas.width = width;
                    canvas.height = height;
        
                    canvas.addEventListener('mousedown', startDrawing);
                    canvas.addEventListener('mousemove', draw);
                    canvas.addEventListener('mouseup', stopDrawing);
                    canvas.addEventListener('mouseout', stopDrawing);

                    document.getElementById('lineWidthInput').addEventListener('input', updateLineWidth);
        
                    function startDrawing(e) {
                        isDrawing = true;
                        draw(e);
                    }
        
                    function draw(e) {
                        if (!isDrawing) return;
        
                        ctx.lineWidth = 5;
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = '#000';
                        ctx.lineWidth = lineWidth;
        
                        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                    }
        
                    function stopDrawing() {
                        isDrawing = false;
                        ctx.beginPath();
                    }

                    function updateLineWidth(e) {
                        lineWidth = e.target.value;
                    }
                    
                }

                initializeCanvas('paintCanvas', 1200, 700);