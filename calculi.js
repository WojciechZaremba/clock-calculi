console.log("test")


const base = document.querySelector("#base")
const add = document.querySelector("#add")
const ansInput = document.querySelector("#ans")
const buttonsAll = document.querySelectorAll(".btn")
const cheatBtn = document.querySelector("#cheatBtn")
const hardBtn = document.querySelector("#hardBtn")
const startBtn = document.querySelector("#startBtn")

base.innerText = "2:22"
add.innerText = "+ 3:33"
ansInput.innerHTML = `<span class="focused ansElem">00</span>:00`

let baseTime = 0
let addTime = 0
let ansTime = 0
let subtract = true

let useCheat = false
let hardMode = false
let challengeOn = false

let focus = "none" // "mins", "secs" or "none"
let inputMins = "00"
let inputSecs = "00"

function check() {
  if (isAnsCorrect()) {
    ansInput.style.color = "green"
    ansInput.style.fontWeight = "bold"
    setTimeout(() => prepareNextQuestion(), 1500)
  } else {
    // ansInput.style.color = "red"
    // prepareNextQuestion()
  }
}

function isAnsCorrect() {
  ansTime = readInput()
  console.log("isAnscorrect func", baseTime + addTime, ansTime)
  console.log(baseTime, addTime)
  return baseTime + addTime === ansTime ? true : false
}

function prepareNextQuestion() {
  subtract = Math.random() < 0.5
  baseTime = createTime()
  addTime = subtract ? createTime() * -1 : createTime()
  ansTime = 0
  inputMins = "00"
  inputSecs = "00"

  if (subtract && baseTime < Math.abs(addTime)) {
    [baseTime, addTime] = [Math.abs(addTime), baseTime * -1]
  } // save the player from typing negative values

  // // // Values for tests // // //
  //baseTime = 90
  //addTime = 90
  //subtract = false
  // // // Values for tests // // //

  // console.log(baseTime, addTime)
  // console.log(stringifyTime(baseTime), stringifyTime(addTime))
  // console.log(stringifyTime(baseTime), stringifyTime(Math.floor(addTime)))

  const baseSecs = baseTime % 60
  const addSecs = addTime % 60

  if (hardMode && subtract) {

  } else if (hardMode && !subtract && baseSecs + addSecs <= 60) {
    if (baseSecs + addSecs < 60) {
      baseTime += 60 - 2 * baseSecs
      addTime += 60 - 2 * addSecs
    } else if (baseSecs + addSecs == 60 && baseSecs == addSecs) {
      const sum = 61 + Math.floor(Math.random() * 58)
      //const sum = 118
      const min = sum - 60
      const gap = 120 - sum
      const part = Math.floor(Math.random() * (gap - 1)) + 1
      const secsBaseNew = min + part
      const secsAddNew = min + gap - part
      console.log(sum)
      console.log("not less than", min)
      console.log("not more than", 60)
      console.log("gap", gap)
      console.log("part", part)
      console.log("new secs base", secsBaseNew)
      console.log("new secs add", secsAddNew)
      baseTime += secsBaseNew - baseSecs
      addTime += secsAddNew - addSecs
    }
  }

  if (hardMode &&
    subtract &&
    baseTime % 60 >= Math.abs(addTime) % 60) { // prepare hard qs here
    // console.log("HARD")
    const baseSecs = baseTime % 60
    const subSecs = addTime % 60 // should be always negative
    const baseMins = Math.floor(baseTime / 60)
    const addMins = Math.floor(Math.abs(addTime) / 60)

    console.log(baseMins, addMins)

    console.log(baseTime, addTime)
    console.log(stringifyTime(baseTime), stringifyTime(addTime))
    console.log(baseSecs, subSecs)

    baseTime -= baseSecs
    addTime -= subSecs

    console.log(baseTime, addTime)

    baseTime += Math.abs(subSecs)
    addTime += baseSecs * -1

    console.log(baseTime, addTime)
    console.log(stringifyTime(baseTime), stringifyTime(addTime))

    if (baseTime + addTime < 0 && baseMins != addMins) {
      console.log("mins swap")
      baseTime -= baseMins
      baseTime += addMins
      addTime += addMins
      addTime -= baseMins
    } else if (baseTime + addTime <= 0 && baseMins == addMins) {
      console.log("add time + 60 s")
      baseTime += 60
    }
    // if (baseSecs == subSecs) {
    // console.log("secs 0")
    // 	let baseSecsNew = baseSecs
    //   let subSecsNew = subSecs
    //   let iterations = 0
    // 	while ((baseSecsNew >= subSecsNew 
    //   				|| baseSecsNew - subSecsNew * -1 >= 0) 
    //   				&& iterations < 10) {
    //           console.log(iterations)
    //   	baseSecsNew = Math.floor(Math.random(60))
    //     subSecsNew = Math.floor(Math.random(-60))
    //     iterations++
    //   }
    //   baseTime -= baseSecs
    //   baseTime += baseSecsNew
    //   addTime -= subSecs
    //   addTime += subSecsNew
    // }
  }

  base.innerText = stringifyTime(baseTime)
  add.innerText = `${subtract ? "-" : "+"} ${stringifyTime(Math.abs(addTime))}`
  ansInput.style.color = "black"
  ansInput.style.fontWeight = "normal"
  focusSwap()
  drawInput()
  //ansInput.innerText = "00:00"
  if (useCheat) {
    cheat.innerText = stringifyTime(baseTime + addTime)
  }
}

function createTime() {
  return (Math.floor(Math.random() * 10 * 60)) // up to 10 minutes
}

function stringifyTime(time) { // argument must not be negative
  if (time < 0) time = Math.abs(time) // just in case
  const min = Math.floor(time / 60).toString()
  const sec = (time % 60).toString()
  return `${min}:${sec.padStart(2, '0')} min`
  //return `${min.padStart(2, '0')}:${sec.padStart(2, '0')} min`
}

function readInput() {
  let time = 0
  time += parseInt(inputMins, 10) * 60 || 0 // if there's no min input
  time += parseInt(inputSecs > 59 ? 59 : inputSecs, 10)
  ansTime = time
  console.log("readInput func", ansTime)
  return time
}

function drawInput() {
  console.log(inputMins, "asdf")
  let mins = inputMins //.padStart(2, '0')
  let secs = inputSecs >= 60 ? "59" : inputSecs //< 10 ? inputSecs.padStart(2, '0') : inputSecs
  // padStart changes how input displays

  if (inputMins.length >= 2 && inputMins[0] == "0") {}

  if (focus === "mins") {
    ansInput.innerHTML = `<span class="focused ansElem">${mins}</span>:${secs} min`
  } else if (focus === "secs") {
    ansInput.innerHTML = `${mins}:<span class="focused ansElem">${secs}</span> min`
  } else if (focus === "none") {
    //ansInput.innerHTML = `${mins}:${secs} min`
    ansInput.innerHTML = `<span data-order="mins" class="clickable">${mins}</span>:<span data-order="secs" class="clickable">${secs}</span> min`
  }
}

function focusSwap(p) {
  //if (p.dataset) console.log(p.dataset.order)
  //if (p) console.log("#######",p.target.dataset.order)

  if (focus === "mins" && !p) {
    focus = "secs"
  } else if ((focus === "secs" || focus === "none") && !p) {
    focus = "mins"
  } else if (focus === "none" && !p) {
    console.log("a #######", focus)
    focus = "mins"
  } else if (focus === "none" && p) {
    focus = p.target.dataset.order
    console.log("b #######", focus)
  }

  inputMins = inputMins.padStart(2, '0')
  inputSecs = inputSecs.padStart(2, '0')
}

function handleInputNum(num) {
  if (focus === "mins") {
    if (inputMins.length < 2) {
      inputMins += num
      if (inputMins.length >= 2) focusSwap()
    } else if (inputMins.length >= 2) {
      inputMins = ""
      inputMins += num
    }
  } else if (focus === "secs") {
    if (inputSecs.length < 2) {
      inputSecs += num
      if (inputSecs.length >= 2) focus = "none"
    } else if (inputSecs.length >= 2) {
      inputSecs = ""
      inputSecs += num
    }
  }
  check()
}

function handleKeyDown(e) {
  e.preventDefault()
  if (e.keyCode >= 37 && e.keyCode <= 40) { // arrows swap focus
    focusSwap()
    drawInput()
  }
  if (e.key == "Enter") {
    focus = "none"
    check()
  }
  if (isFinite(e.key)) {
    handleInputNum(e.key)
    drawInput()
  }
  if (e.key == "Backspace") {
    console.log("backspace")
    drawInput()
  }
  if (e.key == "\\") {
    console.log("\\")
    focus = "none"
    prepareNextQuestion()
  }
}

function toggleRed(boolean, elem) {
  if (boolean) elem.style.color = "red"
  else if (!boolean) elem.style.color = ""
}

function handleClick(e) {
  e.preventDefault()
  if (e.target == ansInput || e.target.classList.contains("clickable")) {
    console.log(focus)
    console.log(e.target.dataset.order)
    focusSwap(e)
    drawInput()
    console.log("asdfasdfasdfasdf")
  } else if (e.target.classList.contains("focused")) {
    focus = "none"
    drawInput()
  }
}

function handleMDown(e) {
  e.preventDefault()
  e.target.classList.add("pressed")
  e.target.classList.remove("unpressed")
}

function handleMUp(e) {
  e.preventDefault()
  //e.target.classList.remove("pressed")
  //e.target.classList.add("unpressed")
  buttonsAll.forEach(button => {

    button.classList.remove("pressed")
    button.classList.add("unpressed")

  })
  if (e.target === startBtn) {
    challengeOn = !challengeOn
    toggleRed(challengeOn, startBtn)
  } else if (e.target === hardBtn) {
    hardMode = !hardMode
    toggleRed(hardMode, hardBtn)
  } else if (e.target === cheatBtn) {
    useCheat = !useCheat
    toggleRed(useCheat, cheatBtn)
    useCheat ?
      cheat.innerText = stringifyTime(baseTime + addTime) :
      cheat.innerText = ""
  }
}

prepareNextQuestion()

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("click", handleClick)
for (let button of buttonsAll) {
  button.addEventListener("mousedown", handleMDown)
  //  button.addEventListener("mouseup", handleMUp)
}
//document.addEventListener("mousedown", handleMDown)
document.addEventListener("mouseup", handleMUp)
