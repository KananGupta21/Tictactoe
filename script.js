let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset");
let newGameBtn = document.getElementById("newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");
let scoreOElement = document.getElementById("scoreO");
let scoreXElement = document.getElementById("scoreX");

let turnO = true;
let scoreO = 0;
let scoreX = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const resetBoard = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const newGame = () => {
    resetBoard();
    scoreO = 0;
    scoreX = 0;
    updateScoreboard();
};

const updateScoreboard = () => {
    scoreOElement.innerText = scoreO;
    scoreXElement.innerText = scoreX;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    if (winner === "O") {
        scoreO++;
    } else {
        scoreX++;
    }

    updateScoreboard();
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

resetBtn.addEventListener("click", resetBoard);
newGameBtn.addEventListener("click", newGame);
