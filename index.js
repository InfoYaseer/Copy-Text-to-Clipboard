const textinput = document.getElementById("textInput");
const copyBtn = document.getElementById("copybtn");
const clearBtn = document.getElementById("clearbtn");
const statusText = document.getElementById("status");

function setStatus(message, isError = false) {
    statusText.textContent = message;
    statusText.style.color = isError ? "#b91c1c" : "#0f172a";
}
async function copyText() {
    const text = textinput.value.trim();

    if (!text) {
        setStatus("Please type something first!", true);
        textinput.focus();
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        setStatus("Copied to clipboard ✅");
    } catch (err) {
        textinput.select();
        textinput.setSelectionRange(0, textinput.value.length);

        const sucess = document.execCommand("copy");
        if (sucess) {
            setStatus("Copied to clipboard ✅")
        } else {
            setStatus("Copy failed. Please copy manually.", true);
        }

        window.getSelection().removeAllRanges();
    }
}

copyBtn.addEventListener("click", copyText);

clearBtn.addEventListener("click", () => {
    textinput.value = "";
    setStatus("");
    textinput.focus(); 
});
textinput.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        copyText();
    }
})