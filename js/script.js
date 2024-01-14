

function init() {

    document.addEventListener("keyup", frogDirection)
    document.addEventListener("keyup", handleRestartOption)

// *---------- Audio ----------*
    let isMuted = false
    // let gameTune = new Audio ("https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3")
    let collisionSound = new Audio ("https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg")
    let fellInRiverSound = new Audio ("https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg")
    let reachedHomeSound = new Audio ("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav")


    const originalVolume = 1.0
    collisionSound.volume = originalVolume
    fellInRiverSound.volume = originalVolume
    reachedHomeSound.volume = originalVolume

    const muteButton = document.getElementById("muteButton")
    muteButton.addEventListener("click", toggleMute)


    function toggleMute() {
        isMuted = !isMuted

        collisionSound.volume = isMuted ? 0 : originalVolume
        fellInRiverSound.volume = isMuted ? 0 : originalVolume
        reachedHomeSound.volume = isMuted ? 0 : originalVolume

        muteButton.innerText = isMuted ? "unmute" : "mute"
        this.blur()
    }

// *---------- Game Variables ----------*
    let timeOut = false
    let winner = false
    let gameOver = false
    let lives = 3
    const startingLivesArray = [251, 252, 253]
    let livesArray = startingLivesArray
    const message = document.querySelector("#gridMessage")
    message.style.display = "none"

// *---------- Frog Variables ----------*
    const startingPosition = 229
    let currentPosition = startingPosition
    let frogInHomeCount = 0

    const startingFrogFamilyArray = [239, 240, 241, 242]
    let frogFamilyArray = startingFrogFamilyArray

// *---------- Car Variables ----------*
    let newPositionRowOne
    let positionRowOne
    let newPositionRowTwo
    let positionRowTwo
    let newPositionRowThree
    let positionRowThree
    let newPositionRowFour
    let positionRowFour
    const startingCarPositionRowOne = [204, 210, 216]
    const startingCarPositionRowTwo = [189, 195, 201]
    const startingCarPositionRowThree = [171, 175, 180, 184]
    const startingCyclistPositionRowFour = [153, 154, 155, 159, 160, 161, 165, 166]

    let currentCarPositionRowOne = startingCarPositionRowOne
    let currentCarPositionRowTwo = startingCarPositionRowTwo
    let currentCarPositionRowThree = startingCarPositionRowThree
    let currentCyclistPositionRowFour = startingCyclistPositionRowFour
    let rowOneInterval = 600
    let rowTwoInterval = 600
    let rowThreeInterval = 600
    let rowFourInterval = 700

// *---------- Lorry Variables ----------*
    const startingLorryPosition = [137, 138, 139, 143, 144, 145, 149, 150, 151]
        // lorryOne: [137, 138, 139],
        // lorryTwo: [144, 145, 146],
        // lorryThree: [150, 151, 152],
    let currentLorryPosition = startingLorryPosition
    let newPositionRowFive
    let positionRowFive
    let lorryInterval = 600

// *---------- River Variables ----------*
    let riverArray = []
    const bank = [17, 18, 20, 21, 23, 24, 26, 27, 29, 30, 32, 33]
    const homes = [19, 22, 25, 28, 31]

// *---------- River Object Variables ----------*
    const startingLilyPadPositionRowOne = [102, 103, 104, 108, 109, 113, 114, 115]
    const startingLilyPadPositionRowFour = [51, 52, 56, 57, 60, 61, 65, 66]
    const startingLogPositionRowTwo = [85, 86, 89, 90, 93, 94, 95, 98, 99]
    const startingLogPositionRowThree = [68, 69, 70, 71, 74, 75, 76, 80, 81, 82, 83]
    const startingLilyPadPositionRowFive = [36, 37, 38, 42, 43, 44, 48, 49, 50]

    let currentLilyPadPositionRowOne = startingLilyPadPositionRowOne
    let currentLogPositionRowTwo = startingLogPositionRowTwo
    let currentLogPositionRowThree = startingLogPositionRowThree
    let currentLilyPadPositionRowFour = startingLilyPadPositionRowFour
    let currentLilyPadPositionRowFive = startingLilyPadPositionRowFive

    let newPositionRiverRowOne
    let newPositionRiverRowTwo
    let newPositionRiverRowThree
    let newPositionRiverRowFour
    let newPositionRiverRowFive

    const width = 17
    const height = 15
    let cellCount = width * height
    let cellsIndex = []

    const grid = document.querySelector(".grid")

    function createGrid() {
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement("div")
            cell.id = i 
            // cell.innerText = i

            if (i >= 0 && i <= 33) {
                cell.classList.add("bank")
            } else if (i >= 34 && i <= 118) {
                cell.classList.add("river")
            } else if (i >= 119 && i <= 135) {
                cell.classList.add("grass") 
            } else if (i >= 136 && i <= 220) {
                cell.classList.add("road")
            } else if (i >= 221 && i <= 254) {
                cell.classList.add("grass")
            }
                grid.appendChild(cell)
                cellsIndex.push(cell)
                // gameTune.play()
        }
    }

    const timerWidth = 60
    const timerHeight = 1
    let timerCellCount = timerWidth * timerHeight
    let timerIndex = []
    const startingSecondsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
                        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                        51, 52, 53, 54, 55, 56, 57, 58, 59]
    let secondsArray = startingSecondsArray

    const timer = document.querySelector(".timer")

    function createTimer() {
        for (let i = 0; i < timerCellCount; i++) {
            const timerCell = document.createElement("div")
            timerCell.id = i

            if (i === 0) {
                timerCell.classList.add("lastSecond")
            }
            timer.appendChild(timerCell)
            timerIndex.push(timerCell)
        }
    }

    function addTimer() {
        secondsArray = startingSecondsArray
        for (let i = 0; i < secondsArray.length; i++) {
            timerIndex[secondsArray[i]].classList.add("second")
            console.log("timer added")
        }
    }

    createGrid()
    createTimer()
    addTimer()
    addHomes()
    addFrogFamily()
    addLives()
    addFrog(currentPosition)

    function addHomes() {
        const homes = [19, 22, 25, 28, 31]

        for (i = 0; i < homes.length; i++) {
            cellsIndex[homes[i]].classList.remove("bank")
            cellsIndex[homes[i]].classList.add("home")
        }
    }

    // *---------- Intervals ----------*

    intervalDuration = 1000

    let timerLoop = setInterval(timerCountDown, intervalDuration)

    setInterval(checkForCarCollision, 10)
 
    setInterval(moveCarOne, rowOneInterval)
    setInterval(moveCarTwo, rowTwoInterval)
    setInterval(moveCarThree, rowThreeInterval)
    setInterval(moveCyclists, rowFourInterval)
    setInterval(moveLorrys, lorryInterval)

    setInterval(lilyPadMovementRowOne, 900)
    setInterval(logMovementRowTwo, 600)
    setInterval(logMovementRowThree, 600)
    setInterval(lilyPadMovementRowFour, 800)
    setInterval(lilyPadMovementRowFive, 600)
    setInterval(checkIfFrogReachesHome, 600)

    function timerCountDown() {
        const lastSecond = document.querySelector(".lastSecond")

        if(!gameOver) {
            if (lastSecond.classList.contains("second")) {
                timerIndex[secondsArray.pop()].classList.remove("second")
                timeOut = false
            } else if (!lastSecond.classList.contains("second") && timeOut === false) {
                console.log("time run out")
                clearInterval(timerLoop)
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()
                timeOut = true
                resetTimer()
            }
        }
    }

    function resetTimer() {
        clearInterval(timerLoop)
        secondsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59]
        console.log(secondsArray)
        console.log(startingSecondsArray)
        for (let i = 0; i < secondsArray.length; i++) {
            timerIndex[secondsArray[i]].classList.add("second")
            console.log("timer reset")    
        }
        timeOut = false
        timerLoop = setInterval(timerCountDown, intervalDuration)
    }

    function addFrog(position) {
        cellsIndex[position].classList.add("frog")
    }

    function removeFrog() {
        cellsIndex[currentPosition].classList.remove("frog")
    }

    function addFrogFamily() {
        for (let i = 0; i < frogFamilyArray.length; i++) {
            cellsIndex[frogFamilyArray[i]].classList.add("frog")

        }
    }

    function addLives() {
        for (let i = 0; i < livesArray.length; i++) {
            cellsIndex[livesArray[i]].classList.add("heart")
        }
    }

    function frogDirection(event) {
        const key = event.keyCode

        const up = 38
        const down = 40
        const left = 37
        const right = 39

        // removeFrog()

        if (key === up && currentPosition >= width) {
            removeFrog()
            currentPosition -= width
        } else if (key === down && currentPosition + width <= cellCount - 18) {
            removeFrog()
            currentPosition += width
        } else if (key === left && currentPosition % width !== 0) {
            removeFrog()
            currentPosition--
        } else if (key === right && currentPosition % width !== width -1) {
            removeFrog()
            currentPosition++
        } else {
            console.log("INVALID KEY")
        }
        addFrog(currentPosition)
        // checkIfFrogOnLily()
    }

    function moveCarOne() {
  
        for (let i = 0; i < currentCarPositionRowOne.length; i++) {
            cellsIndex[currentCarPositionRowOne[i]].classList.remove("carOne")
        }
    
        currentCarPositionRowOne = currentCarPositionRowOne.map(positionRowOne => {
            newPositionRowOne = (positionRowOne - 1 < 204) ? 220 : positionRowOne - 1
            return newPositionRowOne;
        })
    
        for (let i = 0; i < currentCarPositionRowOne.length; i++) {
            cellsIndex[currentCarPositionRowOne[i]].classList.add("carOne")
        }
    }

    function moveCarTwo() {
  
        for (let i = 0; i < currentCarPositionRowTwo.length; i++) {
            cellsIndex[currentCarPositionRowTwo[i]].classList.remove("carTwo")
        }
    
        currentCarPositionRowTwo = currentCarPositionRowTwo.map(positionRowTwo => {
            newPositionRowTwo = (positionRowTwo - 1 < 187) ? 203 : positionRowTwo - 1
            return newPositionRowTwo
        })
    
        for (let i = 0; i < currentCarPositionRowTwo.length; i++) {
            cellsIndex[currentCarPositionRowTwo[i]].classList.add("carTwo")
        }
    }

    function moveCarThree() {
        for (let i = 0; i < currentCarPositionRowThree.length; i++) {
            cellsIndex[currentCarPositionRowThree[i]].classList.remove("carThree")
        }

        currentCarPositionRowThree = currentCarPositionRowThree.map(positionRowThree => {
            newPositionRowThree = (positionRowThree + 1 > 186) ? 170 : positionRowThree + 1
            return newPositionRowThree
        })

        for (let i = 0; i < currentCarPositionRowThree.length; i++) {
            cellsIndex[currentCarPositionRowThree[i]].classList.add("carThree")
        }
    }

    function moveCyclists() {
        for (let i = 0; i < currentCyclistPositionRowFour.length; i++) {
            cellsIndex[currentCyclistPositionRowFour[i]].classList.remove("cyclist")
        }

        currentCyclistPositionRowFour = currentCyclistPositionRowFour.map(positionRowFour => {
            newPositionRowFour = (positionRowFour - 1 < 153) ? 169 : positionRowFour - 1
            return newPositionRowFour
        })

        for (let i = 0; i < currentCyclistPositionRowFour.length; i++) {
            cellsIndex[currentCyclistPositionRowFour[i]].classList.add("cyclist")
        }
    }

    function moveLorrys() {

        for (let i = 0; i < currentLorryPosition.length; i++) {
            cellsIndex[currentLorryPosition[i]].classList.remove("lorry")
        }
    
        currentLorryPosition = currentLorryPosition.map(positionRowFive => {
            newPositionRowFive = (positionRowFive + 1 > 152) ? 136 : positionRowFive + 1
            return newPositionRowFive;
        });
    
        for (let i = 0; i < currentLorryPosition.length; i++) {
            cellsIndex[currentLorryPosition[i]].classList.add("lorry")
        }
    
    }

    function checkForCarCollision() {

        for (let i = 0; i < currentCarPositionRowOne.length; i++) {

            if (currentPosition === currentCarPositionRowOne[i]) {
                console.log("COLLISION ROW ONE")
                clearInterval(timerLoop)
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()
                timeOut = true
                resetTimer()
            }
        }

        for (let i = 0; i < currentCarPositionRowTwo.length; i++) {
            if (currentPosition === currentCarPositionRowTwo[i]) {
                console.log("COLLISION ROW TWO")
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()            }
        }

        for (let i = 0; i < currentCarPositionRowThree.length; i++) {
            if (currentPosition === currentCarPositionRowThree[i]) {
                console.log("COLLISION ROW THREE")
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()            }
        }

        for (let i = 0; i < currentCyclistPositionRowFour.length; i++) {
            if (currentPosition === currentCyclistPositionRowFour[i]) {
                console.log("COLLISION ROW FOUR")
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()            }
        }

        for (let i = 0; i < currentLorryPosition.length; i++) {
            if (currentPosition === currentLorryPosition[i]) {
                console.log("COLLISION ROW FIVE")
                lives--
                console.log(lives)
                cellsIndex[livesArray.pop()].classList.remove("heart")
                collisionSound.play()
                renderMessage()
                resetFrogPosition()            }
        }
    }

    function lilyPadMovementRowOne() {
        checkIfFrogFallsInWater()
        checkIfFrogOnLilyRowOne()
        moveLilyPadsRowOne()
    }

    function lilyPadMovementRowFour() {
        checkIfFrogFallsInWater()
        checkIfFrogOnLilyRowFour()
        moveLilyPadsRowFour()
    }

    function lilyPadMovementRowFive() {
        checkIfFrogFallsInWater()
        checkIfFrogOnLilyRowFive()
        moveLilyPadsRowFive()
        checkIfFrogHitsBank()
        // checkIfFrogReachesHome()

    }

    function moveLilyPadsRowOne() {

        for (let i = 0; i < currentLilyPadPositionRowOne.length; i++) {
            cellsIndex[currentLilyPadPositionRowOne[i]].classList.remove("lilypad")
        }

        currentLilyPadPositionRowOne = currentLilyPadPositionRowOne.map(positionRiverRowOne => {
            newPositionRiverRowOne = (positionRiverRowOne + 1 > 118) ? 102 : positionRiverRowOne + 1
            return newPositionRiverRowOne;

        });

        for (let i = 0; i < currentLilyPadPositionRowOne.length; i++) {
            cellsIndex[currentLilyPadPositionRowOne[i]].classList.add("lilypad")
        }

    }

    function moveLilyPadsRowFour() {

        for (let i = 0; i < currentLilyPadPositionRowFour.length; i++) {
            cellsIndex[currentLilyPadPositionRowFour[i]].classList.remove("lilypad")
        }

        currentLilyPadPositionRowFour = currentLilyPadPositionRowFour.map(positionRiverRowFour => {
            newPositionRiverRowFour = (positionRiverRowFour - 1 < 51) ? 67 : positionRiverRowFour - 1
            return newPositionRiverRowFour;

        });

        for (let i = 0; i < currentLilyPadPositionRowFour.length; i++) {
            cellsIndex[currentLilyPadPositionRowFour[i]].classList.add("lilypad")
        }

    }

    function moveLilyPadsRowFive() {

        for (let i = 0; i < currentLilyPadPositionRowFive.length; i++) {
            cellsIndex[currentLilyPadPositionRowFive[i]].classList.remove("lilypad")
        }

        currentLilyPadPositionRowFive = currentLilyPadPositionRowFive.map(positionRiverRowFive => {
            newPositionRiverRowFive = (positionRiverRowFive + 1 > 50) ? 34 : positionRiverRowFive + 1
            return newPositionRiverRowFive;

        });

        for (let i = 0; i < currentLilyPadPositionRowFive.length; i++) {
            cellsIndex[currentLilyPadPositionRowFive[i]].classList.add("lilypad")
        }

    }

    function logMovementRowTwo() {
        checkIfFrogFallsInWater()
        checkIfFrogOnLog()
        moveLogsRowTwo()
    }

    function logMovementRowThree() {
        checkIfFrogFallsInWater()
        checkIfFrogOnLogRowThree()        
        moveLogsRowThree()
    }

    function moveLogsRowTwo() {
        for (let i = 0; i < currentLogPositionRowTwo.length; i++) {
            cellsIndex[currentLogPositionRowTwo[i]].classList.remove("logOne")
        }

        currentLogPositionRowTwo = currentLogPositionRowTwo.map(positionRiverRowTwo => {
            newPositionRiverRowTwo = (positionRiverRowTwo - 1 < 85) ? 101 : positionRiverRowTwo - 1
            return newPositionRiverRowTwo
        })

        for (let i = 0; i < currentLogPositionRowTwo.length; i++) {
            cellsIndex[currentLogPositionRowTwo[i]].classList.add("logOne")
        }
    }

    function moveLogsRowThree() {
        for (let i = 0; i < currentLogPositionRowThree.length; i++) {
            cellsIndex[currentLogPositionRowThree[i]].classList.remove("logOne")
        }

        currentLogPositionRowThree = currentLogPositionRowThree.map(positionRiverRowThree => {
            newPositionRiverRowThree = (positionRiverRowThree + 1 > 84) ? 68 : positionRiverRowThree + 1
            return newPositionRiverRowThree
        })

        for (let i = 0; i < currentLogPositionRowThree.length; i++) {
            cellsIndex[currentLogPositionRowThree[i]].classList.add("logOne")
        }
    }

    function checkIfFrogOnLilyRowOne() {
        let frog = cellsIndex[currentPosition];
        
        for (let i = 0; i < currentLilyPadPositionRowOne.length; i++) {
            let lilyPadRowOne = cellsIndex[currentLilyPadPositionRowOne[i]];
    
            if (frog === lilyPadRowOne) {
                console.log("FROG ON LILYPAD");
                removeFrog();
                currentPosition++;
    
                // Check if the lily pad goes out of bounds
                if (lilyPadRowOne.classList.contains("lilypad")) {
                    let newIndex = currentLilyPadPositionRowOne[i] + 1
                    if (newIndex > 118) {
                        console.log("FROG OUT OF BOUNDS")
                        clearInterval(timerLoop)
                        fellInRiverSound.play()
                        lives--
                        cellsIndex[livesArray.pop()].classList.remove("heart")
                        renderMessage()
                        resetFrogPosition()
                        timeOut = true
                        resetTimer()
                    }
                }
    
                addFrog(currentPosition)
            }
        }
    }

    function checkIfFrogOnLilyRowFour() {
        let frog = cellsIndex[currentPosition]

        for (let i = 0; i < currentLilyPadPositionRowFour.length; i++) {
            let lilyPadRowFour = cellsIndex[currentLilyPadPositionRowFour[i]];

                if (frog === lilyPadRowFour) {
                    console.log("FROG ON LILYPAD")
                    removeFrog()
                    currentPosition--

                    if (lilyPadRowFour.classList.contains("lilypad")) {
                        let newIndex = currentLilyPadPositionRowFour[i] - 1
                        if (newIndex < 51) {
                            console.log("FROG OUT OF BOUNDS")
                            clearInterval(timerLoop)
                            fellInRiverSound.play()
                            lives--
                            cellsIndex[livesArray.pop()].classList.remove("heart")
                            renderMessage()
                            resetFrogPosition()
                            timeOut = true
                            resetTimer()
                        }
                    }

                    addFrog(currentPosition)
            }
        }
    }

    function checkIfFrogOnLilyRowFive() {
        let frog = cellsIndex[currentPosition]
        for (let i = 0; i < currentLilyPadPositionRowFive.length; i++) {
            let lilyPadRowFive = cellsIndex[currentLilyPadPositionRowFive[i]];

                if (frog === cellsIndex[currentLilyPadPositionRowFive[i]]) {
                    console.log("FROG ON LILYPAD")
                    removeFrog()
                    currentPosition++

                    if (lilyPadRowFive.classList.contains("lilypad")) {
                        let newIndex = currentLilyPadPositionRowFive[i] + 1
                        if (newIndex > 50) {
                            console.log("FROG OUT OF BOUNDS")
                            clearInterval(timerLoop)
                            fellInRiverSound.play()
                            lives--
                            cellsIndex[livesArray.pop()].classList.remove("heart")
                            renderMessage()
                            resetFrogPosition()
                            timeOut = true
                            resetTimer()
                        }
                    }

                    addFrog(currentPosition)
            }
        }
    }

    function checkIfFrogOnLog() {
        let frog = cellsIndex[currentPosition]

        for (let i = 0; i < currentLogPositionRowTwo.length; i++) {
            if (frog === cellsIndex[currentLogPositionRowTwo[i]]) {
                console.log("FROG ON LOG")
                removeFrog()
                currentPosition--
                addFrog(currentPosition)
            }
        }
    }

    function checkIfFrogOnLogRowThree() {
        let frog = cellsIndex[currentPosition]


        for (let i = 0; i < currentLogPositionRowThree.length; i++) {
            if (frog === cellsIndex[currentLogPositionRowThree[i]]) {
                console.log("FROG ON LOG")
                removeFrog()
                currentPosition++
                addFrog(currentPosition)
            }
        }
    }

    function checkIfFrogFallsInWater() {
        let frog = cellsIndex[currentPosition]
        const frogOnLilyPad = frog.classList.contains("lilypad")
        const frogOnLog = frog.classList.contains("logOne")

        riverArray = document.querySelectorAll(".river")
          for (let i = 0; i < riverArray.length; i++) {
            if (!frogOnLilyPad && !frogOnLog && currentPosition === parseInt(riverArray[i].id)) {
                    console.log("FELL IN RIVER")
                    clearInterval(timerLoop)
                    fellInRiverSound.play()
                    lives--
                    cellsIndex[livesArray.pop()].classList.remove("heart")
                    renderMessage()
                    resetFrogPosition()
                    timeOut = true
                    resetTimer()
            }
        }
    }

    function checkIfFrogHitsBank() {
        let frog = cellsIndex[currentPosition]

        for (let i = 0; i < bank.length; i++) {
            if (currentPosition === bank[i]) {
                console.log("HIT RIVERBANK")
                clearInterval(timerLoop)
                collisionSound.play()
                lives--
                cellsIndex[livesArray.pop()].classList.remove("heart")
                renderMessage()
                resetFrogPosition()
                timeOut = true
                resetTimer()
            } 
        }
    }

    function checkIfFrogReachesHome() {
        let frog = cellsIndex[currentPosition]

        for (let i = 0; i < homes.length; i++) {
            if (currentPosition === homes[i] && !frog.classList.contains("frogInHome")) {
                frogInHomeCount++
                clearInterval(timerLoop)
                // cellsIndex[homes[i]].classList.remove("home")
                // cellsIndex[homes[i]].classList.add("bank")
                cellsIndex[homes[i]].classList.add("frogInHome")
                reachedHomeSound.play()
                console.log("home reached")
                timeOut = true
                resetTimer()

                checkWinner()
            } else if (currentPosition === homes[i] && frog.classList.contains("frogInHome")) {
                clearInterval(timerLoop)
                collisionSound.play()
                currentPosition = startingPosition
                addFrog(startingPosition)
                console.log("frog already in home")
                lives--
                cellsIndex[livesArray.pop()].classList.remove("heart")
                renderMessage()
                timeOut = true
                resetTimer()
            }
         }
    }

    function checkWinner() {
        if (frogInHomeCount < 5) {
            winner = false
            cellsIndex[frogFamilyArray.pop()].classList.remove("frog")

            console.log(frogFamilyArray)

            currentPosition = startingPosition
            addFrog(startingPosition)
            // resetFrogPosition() 

            } else if (frogInHomeCount === 5) {
            winner = true
            console.log("winner")
            renderMessage()
            }
    }

    function renderMessage() {

        if (winner === true) {
            gameOver = true
            message.style.display = "flex"
            message.innerHTML = "winner!<br>press -enter-<br>to play again"
            // clearInterval(checkIfFrogReachesHome)
            // clearInterval(lilyPadMovementRowFive)
            document.addEventListener("keyup", handleRestartOption)

        } else if (lives === 0) {
            gameOver = true
            message.style.display = "flex"
            message.innerHTML = "you lose =(<br>press -enter-<br>to play again"
            // message.addEventListener("click", handleRestartOption)
            document.addEventListener("keyup", handleRestartOption)
        }
    }

    function handleRestartOption(event) {
        const key = event.keyCode
        const restartKey = 13

        if (key === restartKey) {
            resetGame()
            document.removeEventListener("keyup", handleRestartOption, ("enter"))
        }
    }

    function resetGame() {
        lives = 3
        livesArray = [251, 252, 253]
        winner = false
        gameOver = false
        frogInHomeCount = 0
        frogFamilyArray = [239, 240, 241, 242]
        message.innerHTML = ""

        cellsIndex.forEach((cell) => cell.classList.remove("frog", "heart", "frogInHome"))
        message.style.display = "none"

        addFrogFamily()
        addLives()
        resetFrogPosition()
        resetTimer()

        // changeTimerLoop()
        console.log("game reset")
    }

    function resetFrogPosition() {
        removeFrog()
        currentPosition = startingPosition
        addFrog(startingPosition)
    }
}
window.addEventListener("DOMContentLoaded", init)
