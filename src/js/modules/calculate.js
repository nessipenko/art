import { getResource } from "../services/requests";


const calculate = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let state;

    getResource('assets/calc.json')
        .then(res => {
            state = res;
            updatePrice();
        })
        .catch(e => console.log(e));


    const updatePrice = () => {
        const sizeValue = getValue(state, 'size', sizeBlock.value);
        const materialValue = getValue(state, 'material', materialBlock.value);
        const optionsValue = getValue(state, 'options', optionsBlock.value);
        let sum = Math.round((+sizeValue) * (+materialValue) + (+optionsValue));

        if (sizeBlock.value === '' || materialBlock.value === '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };
    const getValue = (state, category, key) => {
        if (!state || !state[category] || !state[category][key]) return 0;
        return state[category][key];
    };

    const changePrice = (event, elem) => {
        elem.addEventListener(event, updatePrice);
    };

    changePrice('change', sizeBlock);
    changePrice('change', materialBlock);
    changePrice('change', optionsBlock);
    changePrice('input', promocodeBlock);
};

export default calculate; 