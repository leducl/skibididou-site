(() => {
    const duckEvent = () => {
        let score = 0;
        const ducks = [];
        const duckIntervals = [];

        const scoreBoard = document.createElement("div");
        scoreBoard.style.position = "fixed";
        scoreBoard.style.top = "10px";
        scoreBoard.style.right = "10px";
        scoreBoard.style.padding = "10px 20px";
        scoreBoard.style.backgroundColor = "rgba(0,0,0,0.7)";
        scoreBoard.style.color = "white";
        scoreBoard.style.fontSize = "24px";
        scoreBoard.style.zIndex = "9999";
        scoreBoard.innerText = `Score: ${score}`;
        document.body.appendChild(scoreBoard);

        const moveDuckRandomly = (duck) => {
            const maxTop = window.innerHeight - 80;
            const maxLeft = window.innerWidth - 80;
            duck.style.top = Math.random() * maxTop + "px";
            duck.style.left = Math.random() * maxLeft + "px";
        };

        const spawnDuck = () => {
            const duck = document.createElement("img");
            duck.src = "images/duck.jpg"; 
            duck.style.position = "fixed";
            duck.style.width = "80px";
            duck.style.height = "80px";
            duck.style.top = Math.random() * (window.innerHeight - 80) + "px";
            duck.style.left = Math.random() * (window.innerWidth - 80) + "px";
            duck.style.cursor = "pointer";
            duck.style.zIndex = "9998";
            duck.style.transition = "top 0.5s linear, left 0.5s linear"; // mouvement fluide

            duck.addEventListener("click", () => {
                score++;
                scoreBoard.innerText = `Score: ${score}`;
                duck.remove();
                ducks.splice(ducks.indexOf(duck), 1);

                // Supprime aussi l'interval lié à ce canard
                clearInterval(duckIntervals[duck]);
                delete duckIntervals[duck];

                spawnDuck();
            });

            document.body.appendChild(duck);
            ducks.push(duck);

            // chaque canard bouge toutes les 800ms
            const interval = setInterval(() => moveDuckRandomly(duck), 800);
            duckIntervals[duck] = interval;
        };

        for (let i = 0; i < 5; i++) {
            spawnDuck();
        }

        // On définit la fonction de cleanup globale
        window.closeCustomEvent = () => {
            scoreBoard.remove();
            ducks.forEach(duck => {
                duck.remove();
                clearInterval(duckIntervals[duck]);
            });
        };
    };

    duckEvent();
})();
