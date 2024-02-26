import { postData } from "../services/requests"

// import checkNumInputs from "./checkNumInputs"
const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]')
    const calcForm = document.getElementById('calc_form'),
        quickOrderBtn = document.querySelector('.btn-open_new_modal'),
        consultationModal = document.querySelector('.popup-consultation'),
        consultationForm = document.querySelector('#consultation_form'),
        sumElem = document.querySelector('[name="result"]');

    quickOrderBtn.addEventListener('click', (e) => {
        e.preventDefault()
        consultationModal.style.display = 'block';
    });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Мы с Вами свяжемся.',
        failure: 'Что-то пошло не так!',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    const path = {
        designer: 'assets/server.php',
        questions: 'assets/questions.php'
    }

    const clearInputs = () => {
        const divSum = document.querySelector('.calc-price')
        divSum.textContent = 'Пожалуйста, выберите размер и материал картины'
        inputs.forEach(item => {
            item.value = ''
        })
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'

        })
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        })
    }
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

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log('upload', item.files[0])
            let dots
            const arr = item.files[0].name.split('.')

            arr[0].length > 8 ? dots = '...' : dots = '.'
            const name = arr[0].substring(0, 8) + dots + arr[1]
            item.previousElementSibling.textContent = name
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            const formData = new FormData(item);
            for (let key of formData) {
                console.log('formData', key);
            }

            if (isFormFilled(calcForm)) {
                const calcFormData = new FormData(calcForm);
                for (const [key, value] of calcFormData.entries()) {
                    formData.append(key, value);
                }
            }
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

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.parentNode.appendChild(statusMessage)

            item.classList.add('animated', 'fadeOutUp')
            setTimeout(() => {
                item.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', message.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusMessage.appendChild(textMessage)

            let api
            item.closest('.popup-design') ? api = path.designer : api = path.questions
            console.log(api)
            postData(api, formData)
                .then(res => {
                    console.log('res', res)
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs()

                    setTimeout(() => {
                        statusMessage.remove()
                        item.style.display = 'block'
                        item.classList.remove('fadeOutUp')
                        item.classList.add('fadeInUp')

                        const errorMessage = item.querySelector('.error-message');
                        if (errorMessage) {
                            errorMessage.remove()
                        }
                    }, 5000)
                })
        })

    })
}
export default forms