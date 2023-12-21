document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("oceanCanvas");
    const ctx = canvas.getContext("2d");

    // Fish constructor
    function Fish(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 2 + 1; // Random speed
        this.speedY = Math.random() * 2 - 1;

        this.draw = function() {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, 30, 15, 0, 0, 2 * Math.PI);
            ctx.fill();
        };

        this.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Change direction when hitting canvas borders
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        };
    }

    let fishes = []; // Initialize empty fish array

    // Increment and save the number of fish
    function addFish() {
        let fishCount = localStorage.getItem('fishCount');
        fishCount = fishCount ? parseInt(fishCount) : 0;
        localStorage.setItem('fishCount', fishCount + 1);
    }

    // Retrieve the number of fish
    function getFishCount() {
        let fishCount = localStorage.getItem('fishCount');
        return fishCount ? parseInt(fishCount) : 0;
    }

    // Function to add a new fish
    function createFish(x, y) {
        fishes.push(new Fish(x, y));
        addFish(); // Increment and save fish count
    }

    // Initialize fishes array based on stored fish count
    function initializeFishes() {
        let fishCount = getFishCount();
        for (let i = 0; i < fishCount; i++) {
            // Add fish with random positions
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            fishes.push(new Fish(x, y)); // Directly add fish without incrementing count
        }
    }

    initializeFishes(); // Call this function when the page loads

    // Add a new fish on canvas click
    canvas.addEventListener("click", function(event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        createFish(x, y); // Use the createFish function
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        for (let i = 0; i < fishes.length; i++) {
            fishes[i].update();
            fishes[i].draw();
        }

        requestAnimationFrame(animate); // Request next frame
    }

    animate();
});
