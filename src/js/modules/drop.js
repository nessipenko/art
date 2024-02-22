import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
            input.addEventListener(eventName, () => highlight(input), false);
            if (eventName === 'dragleave' || eventName === 'drop') {
                input.addEventListener(eventName, () => unhighlight(input), false);
            }
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .3)';
    }

    function unhighlight(item) {
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.main')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6'
        }
        else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }
    const clearInputs = () => {
        fileInputs.forEach(item => {
            item.value = ''
        })
        fileInputs.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'
        })

    }

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;


            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 8 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 8) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if (input.closest('.main')) {
                const formData = new FormData()
                formData.append('file', input.files[0])

                postData('assets/server.php', formData)
                    .then(result => {
                        console.log('drop', result)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                    .finally(() => {
                        clearInputs()
                    })

            }
        });
    });
}

export default drop;
