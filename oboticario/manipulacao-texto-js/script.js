const form = document.querySelector("#command-form");
const textInput = document.querySelector("#text-input");
const commandsInput = document.querySelector("#commands-input");
const resultOutput = document.querySelector("#result-output");
const cursorOutput = document.querySelector("#cursor-output");
const exampleButtons = document.querySelectorAll("[data-command]");

function clampCursor(cursor, textLength) {
  if (textLength <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(cursor, textLength - 1));
}

function moveCursor(cursor, direction, amount, textLength) {
  const nextCursor = direction === "left" ? cursor - amount : cursor + amount;
  return clampCursor(nextCursor, textLength);
}

function replaceCharacters(chars, cursor, amount, replacement) {
  if (chars.length === 0) {
    return 0;
  }

  let currentCursor = cursor;
  const total = Math.max(1, amount);

  for (let count = 0; count < total; count += 1) {
    chars[currentCursor] = replacement;

    if (amount > 1 && count < total - 1) {
      currentCursor = clampCursor(currentCursor + 1, chars.length);
    }
  }

  return currentCursor;
}

function parseRepeat(commands, index) {
  let digits = "";
  let currentIndex = index;

  while (/\d/.test(commands[currentIndex] ?? "")) {
    digits += commands[currentIndex];
    currentIndex += 1;
  }

  return {
    repeat: digits ? Number(digits) : 1,
    nextIndex: currentIndex,
  };
}

function applyCommands(text, commands) {
  const chars = [...text];
  let cursor = 0;
  let index = 0;

  while (index < commands.length) {
    const { repeat, nextIndex } = parseRepeat(commands, index);
    const command = commands[nextIndex];

    if (!command) {
      break;
    }

    if (command === "h") {
      cursor = moveCursor(cursor, "left", repeat, chars.length);
      index = nextIndex + 1;
      continue;
    }

    if (command === "l") {
      cursor = moveCursor(cursor, "right", repeat, chars.length);
      index = nextIndex + 1;
      continue;
    }

    if (command === "r") {
      const replacement = commands[nextIndex + 1];

      if (replacement === undefined) {
        break;
      }

      cursor = replaceCharacters(chars, cursor, repeat, replacement);
      index = nextIndex + 2;
      continue;
    }

    index = nextIndex + 1;
  }

  return {
    text: chars.join(""),
    cursor,
  };
}

function renderResult() {
  const result = applyCommands(textInput.value, commandsInput.value);
  resultOutput.textContent = result.text || " ";
  cursorOutput.textContent = String(result.cursor);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderResult();
});

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    textInput.value = "Hello Grupo Boticario";
    commandsInput.value = button.dataset.command;
    renderResult();
  });
});

renderResult();
