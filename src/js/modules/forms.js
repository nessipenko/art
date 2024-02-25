import { postData } from "../services/requests";

const forms = () => {
    const quickOrderBtn = document.querySelector('.btn-open_new_modal');
    const consultationModal = document.querySelector('.popup-consultation');
    const consultationForm = document.querySelector('#consultation_form');
    const sumElem = document.querySelector('[name="result"]');

    quickOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        consultationModal.style.display = 'block';
    });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Мы с Вами свяжемся.',
        failure: 'Что-то пошло не так!',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        questions: 'assets/questions.php'
    };

    const clearInputs = (form) => {
        const divSum = document.querySelector('.calc-price');
        divSum.textContent = 'Пожалуйста, выберите размер и материал картины';
        form.querySelectorAll('input').forEach(item => {
            item.value = '';
        });
        form.querySelectorAll('[name="upload"]').forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
        form.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
    };

    const isFormFilled = (form) => {
        const inputs = form.querySelectorAll('input');
        const selects = form.querySelectorAll('select');

        for (const input of inputs) {
            if (input.value.trim() !== '') {
                return true;
            }
        }
        for (const select of selects) {
            if (select.value !== '') {
                return true;
            }
        }
        return false;
    };

    const handleFormSubmit = (item, formData) => {
        const uploadInput = item.querySelector('[name="upload"]');
        const sumText = sumElem.textContent.trim();
        const sumValue = parseFloat(sumText);
        if (!isNaN(sumValue)) {
            formData.append('sum', sumValue);
        }
        const nameInput = item.querySelector('[name="name"]');
        const phoneInput = item.querySelector('[name="phone"]');
        if (nameInput.value.trim() !== '') {
            formData.append('name', nameInput.value.trim());
        }
        if (phoneInput.value.trim() !== '') {
            formData.append('phone', phoneInput.value.trim());
        }
        if (uploadInput && (!uploadInput.files || uploadInput.files.length === 0)) {
            if (!item.querySelector('.error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Пожалуйста, выберите файл для загрузки.';
                errorMessage.classList.add('error-message');
                item.appendChild(errorMessage);
            }
            return;
        }

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.parentNode.appendChild(statusMessage);
        item.classList.add('animated', 'fadeOutUp');
        setTimeout(() => {
            item.style.display = 'none';
        }, 400);

        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', message.spinner);
        statusImg.classList.add('animated', 'fadeInUp');
        statusMessage.appendChild(statusImg);

        let textMessage = document.createElement('div');
        textMessage.textContent = message.loading;
        statusMessage.appendChild(textMessage);

        let api = item.closest('.popup-design') ? path.designer : path.questions;
        console.log(api)

        postData(api, formData)
            .then(res => {
                console.log('res', res)
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            })
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs(item);
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                    const errorMessage = item.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }, 5000);
            });
    };

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const calcForm = document.getElementById('calc_form');
            if (isFormFilled(calcForm)) {
                const calcFormData = new FormData(calcForm);
                for (const [key, value] of calcFormData.entries()) {
                    formData.append(key, value);
                }
            }
            const consultationFormData = new FormData(consultationForm);
            for (const [key, value] of consultationFormData.entries()) {
                formData.append(key, value);
            }
            handleFormSubmit(form, formData);
        });
    });
};

export default forms;
