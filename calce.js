/**calculator is designed with a ui displaying the entered inputs, user is clearly able to see the format required in the UI and accordingly user may type the input.
If user makes a mistake in entering the input (i.e, format is not followed) then the output is not displayed. **/

const buttons = document.querySelectorAll("button")
let select1 = document.querySelector(".trignometry")
let select2 = document.querySelector(".functions")
head = document.querySelector(".head")
body = document.querySelector(".body")
let display_val = []
let cal_val = []
let memory = []
let rad = true
let trigo = select1.querySelector(".trigo")
let fun = select2.querySelector(".fun")
let sec = true
let tog1 = document.querySelector(".toggle1")
let tog2 = document.querySelector(".toggle2")
let facto = document.querySelector(".factorial")

//custom function to calculate factorial of given input as Math library is not having factorial.

function factorial(display_val, cal_val) {
  let index = 0
  for (let i = 0; i < display_val.length; i++) {
    if ((display_val[i] === "+") || (display_val[i] === "-") || (display_val[i] === "x") || (display_val[i] === "/")) {
      index = i
    }
  }
  if (index > 0) {
    let n = Number(display_val.slice(index + 1).join(""))
    cal_val = cal_val.slice(0, index + 1)
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    cal_val.push(String(result))
    return cal_val;
  } else {
    let result = 1;
    for (let i = 1; i <= Number(display_val.join("")); i++) {
      result *= i;
    }
    cal_val = result
    return cal_val;
  }
}

//Function to convert radians to degrees as math module by default works in radians and do not have a converter function.

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

//function to toggle the last value from plus to minus and vice versa.

function prm(display, cal) {
  if ((display.length == 1) && (cal.length === 1)) {
    display.push("*(-1)")
    cal.push("*(-1)")
    //console.log(cal)
    //console.log(display)
  } else if (display.length > 1) {
    //console.log(display)
    let pind = display.lastIndexOf("+")
    let mind = display.lastIndexOf("-")
    if (pind > mind) {
      display[pind] = "-"
      cal[pind] = "-"
    } else {
      display[mind] = "+"
      cal[mind] = "+"
    }
    //console.log(cal)
    //console.log(display)
  }
  return display, cal
}


function trignometry(value, func) {
  let evaluate = "Math." + func + value + ")"
  console.log(evaluate)
}

//Function to perform the memory related operations.

function crud(name, memory, head) {
  value = Number(head.textContent)
  if (name === "ms") {
    memory.push(value)
    console.log(memory)
  } else if (name === "m+") {
    temp = memory.pop()
    temp += value
    memory.push(temp)
    console.log(memory)
  } else if (name === "m-") {
    temp = memory.pop()
    temp -= value
    memory.push(temp)
    console.log(memory)
  } else if (name === "mr") {
    console.log(memory[memory.length - 1])
    head.textContent = memory[memory.length - 1]
  } else {
    memory = []
  }
  return memory
}

//Adding "click" event to all the buttons in html.

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("type")
    if (type === "memory") {
      memory = crud(button.getAttribute("name"), memory, head)
    } else if (type === "clear") {
      display_val = []
      cal_val = []
      head.textContent = ""
      body.textContent = ""
      trigo.selected = "true"
      fun.selected = "true"
    } else if (type === "second") {
      if (sec) {
        sec = false
        tog1.textContent = "x^3"
        tog2.textContent = "2^x"

      } else {
        sec = true
        tog1.textContent = "x^2"
        tog2.textContent = "10^x"
      }
    } else if (type === "factorial") {
      cal_val = factorial(display_val, cal_val)
      let symbol = facto.getAttribute("name")
      display_val.push(symbol)
      body.textContent = display_val.join("")
    } else if (type === "back") {
      display_val.pop()
      cal_val.pop()
      body.textContent = display_val.join("")
      head.textContent = ""
    } else if (type === "format") {
      let name = button.getAttribute("name")
      if (name === "deg") {
        if (rad) {
          rad = false
          //console.log(rad)
          button.textContent = "RAD"
        } else {
          rad = true
          button.textContent = "DEG"
          //console.log(rad)
        }
      } else {
        let content = head.textContent
        let op = ""
        let ind = (content.replace("-", "")).indexOf(".")
        let incrementor = 0

        if (ind == -1) {
          incrementor = content.replace("-", "").length - 1
          //console.log(incrementor)
        } else {
          incrementor = (content.slice(0, ind)).length - 1
          //console.log(incrementor)
          //console.log(content.slice(0, ind))
        }

        if (Number(content) >= 0) {
          op = "+"
        } else {
          op = "-"
        }
        //console.log(content)
        let lenth = content.length
        content = content.replace(".", "").replace("-", "")
        content = content.slice(0, 1) + "." + content.slice(1, lenth) + "e" + op + String(incrementor)
        head.textContent = content
      }
    } else if (type === "toggle") {
      if (sec) {
        const name = button.getAttribute("name")
        const value = button.getAttribute("value")
        display_val.push(name)
        cal_val.push(value)
        body.textContent = display_val.join("")
      } else {
        let validity = button.getAttribute("class")
        if (validity === "toggle1") {
          display_val.push("^(3)")
          cal_val.push("**3")
          body.textContent = display_val.join("")
        } else {
          display_val.push("2^x(")
          cal_val.push("2**(")
          body.textContent = display_val.join("")
        }
      }
    } else if (type === "equals") {
      //console.log(cal_val)
      if (cal_val.length > 1) {
        head.textContent = eval(cal_val.join(""))
      } else {
        head.textContent = cal_val
      }
    } else {
      const name = button.getAttribute("name")
      if (name === "prm") {
        display_val,
        cal_val = prm(display_val, cal_val)
        body.textContent = display_val.join("")
      }
      else {
        const value = button.getAttribute("value")
        display_val.push(name)
        cal_val.push(value)
        body.textContent = display_val.join("")
      }
    }
  })
})

//Functions to perform operations bys html "select" elements.

select1.onchange = (event) => {
  let radian = head.textContent
  let trifunc = event.target.value
  if (rad === true) {
    if (trifunc === "Math.sin(") {
      body.textContent = "sin(" + radian + ")"
      head.textContent = eval("Math.sin(" + radian + ")")
    } else if (trifunc === "Math.cos(") {
      body.textContent = "cos(" + radian + ")"
      head.textContent = eval("Math.cos(" + radian + ")")
    } else if (trifunc === "Math.tan(") {
      body.textContent = "tan(" + radian + ")"
      head.textContent = eval("Math.tan(" + radian + ")")
    } else if (trifunc === "Math.sec(") {
      body.textContent = "sec(" + radian + ")"
      head.textContent = eval("1/(Math.cos(" + radian + "))")
    } else if (trifunc === "Math.cosec(") {
      body.textContent = "cosec(" + radian + ")"
      head.textContent = eval("1/(Math.sin(" + radian + "))")
    } else {
      body.textContent = "cot(" + radian + ")"
      head.textContent = eval("1/(Math.tan(" + radian + "))")
    }
  } else {
    let radian = degrees_to_radians(head.textContent)
    if (trifunc === "Math.sin(") {
      body.textContent = "sin(" + radian + ")"
      head.textContent = eval("Math.sin(" + radian + ")")
    } else if (trifunc === "Math.cos(") {
      body.textContent = "cos(" + radian + ")"
      head.textContent = eval("Math.cos(" + radian + ")")
    } else if (trifunc === "Math.tan(") {
      body.textContent = "tan(" + radian + ")"
      head.textContent = eval("Math.tan(" + radian + ")")
    } else if (trifunc === "Math.sec(") {
      body.textContent = "sec(" + radian + ")"
      head.textContent = eval("1/(Math.cos(" + radian + "))")
    } else if (trifunc === "Math.cosec(") {
      body.textContent = "cosec(" + radian + ")"
      head.textContent = eval("1/(Math.sin(" + radian + "))")
    } else {
      body.textContent = "cot(" + radian + ")"
      head.textContent = eval("1/(Math.tan(" + radian + "))")
    }
  }

}



select2.onchange = (event) => {
  let radian = head.textContent
  let funfunc = event.target.value
  if (funfunc == "Math.ceil(") {
    body.textContent = "ceil(" + radian + ")"
    head.textContent = eval("Math.ceil(" + radian + ")")
  } else {
    body.textContent = "floor(" + radian + ")"
    head.textContent = eval("Math.floor(" + radian + ")")
  }
}