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
        inputs.forEach(item => {
            item.value = ''
        })
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'

        })
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log('upload', item.files[0])
            let dots
            const arr = item.files[0].name.split('.')
            arr[0].length > 8 ? dots = '...' : dots = '.'
            const name = arr[0].substring(0, 8)
                + dots + arr[1]
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
            let api
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.questions
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
                    setTimeout(() => {
                        statusMessage.remove()
                        item.style.display = 'block'
                        item.classList.remove('fadeOutUp')
                        item.classList.add('fadeInUp')
                    }, 5000)
                    // setTimeout(() => {
                    //     hideModal()
                    // }, 2000)
                    // clearState()
                    // for (let key in state) {
                    //     delete state[key]
                    // }
                    // setTimeout(() => {
                    //     statusMessage.remove()
                    //     windows.forEach(item => {
                    //         item.getElementsByClassName.dispaly = 'none'
                    //     })
                    // }, 5000)
                })
        })
    })
}
export default forms