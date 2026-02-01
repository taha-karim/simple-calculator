const input = document.querySelector('.calculator input');
const buttons = document.querySelectorAll('.calculator button');

let current = '';
let resetNext = false;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent;

        if (val === 'AC') {
            current = '';
            input.value = '';
        } else if (val === 'DEL') {
            current = current.slice(0, -1);
            input.value = current;
        } else if (val === '=') {
            try {
                let result = eval(current.replace('%', '/100'));
                input.value = result;
                current = result.toString();
                resetNext = true;
            } catch {
                input.value = 'Error';
                current = '';
                resetNext = true;
            }
        } else if (val === '%') {
            current += '%';
            input.value = current;
        } else if (['+', '-', '*', '/'].includes(val)) {
            if (current && !['+', '-', '*', '/'].includes(current.slice(-1))) {
                current += val;
                input.value = current;
            }
        } else {
            if (resetNext) {
                current = '';
                resetNext = false;
            }
            current += val;
            input.value = current;
        }
    });
});