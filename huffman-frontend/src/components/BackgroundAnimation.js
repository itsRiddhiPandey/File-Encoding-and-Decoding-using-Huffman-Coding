class BackgroundAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dots = [];
        this.numDots = 150; // Adjusted number of dots for a more filled background
        this.mouse = { x: null, y: null };
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createDots();
        this.animate();
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    createDots() {
        this.dots = [];
        for (let i = 0; i < this.numDots; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.dots.push({ x, y, vx: Math.random() * 0.5 - 0.25, vy: Math.random() * 0.5 - 0.25 });
        }
    }

    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createDots(); // Recreate dots on resize for a better fill
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateDots();
        this.drawDots();
        this.connectDots();
    }

    updateDots() {
        for (let dot of this.dots) {
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce dots off the edges
            if (dot.x < 0 || dot.x > this.canvas.width) dot.vx = -dot.vx;
            if (dot.y < 0 || dot.y > this.canvas.height) dot.vy = -dot.vy;
        }
    }

    drawDots() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let dot of this.dots) {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    connectDots() {
        this.ctx.strokeStyle = 'rgba(128, 0, 128, 0.2)'; // Purple lines for better contrast
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) { // Connect dots within a specified distance
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

export default BackgroundAnimation;
