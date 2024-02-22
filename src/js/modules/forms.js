import { postData } from "../services/requests"

// import checkNumInputs from "./checkNumInputs"
const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]')


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
    }
    const clearSelects = () => {
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
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
    //закрытие мод окна после отправки
    // const hideModal = () => {
    //     windows.forEach(item => {
    //         setTimeout(() => {
    //             item.style.display = 'none'
    //         }, 1000)
    //     })
    //     document.body.classList.remove('modal-open')

    // }
    // const clearState = () => {
    //     for (const prop of Object.keys(state)) {
    //         delete state[prop]
    //     }
    // }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            const uploadInput = item.querySelector('[name="upload"]');
            const sum = item.querySelector('[name="result"]');


            if (uploadInput && (!uploadInput.files || uploadInput.files.length === 0)) {
                if (!item.querySelector('.error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.textContent = 'Пожалуйста, выберите файл для загрузки.';
                    errorMessage.classList.add('error-message');
                    item.appendChild(errorMessage);
                } return;
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

            const formData = new FormData(item)

            if (sum) {
                formData.append('sum', sum.textContent);
            }

            let api
            item.closest('.popup-design') ? api = path.designer : api = path.questions
            console.log(api)

            postData(api, formData)
                .then(res => {
                    console.log(res)
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs()
                    clearSelects()

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