const filter = () => {
    const menu = document.querySelector('.portfolio-menu');
    const wrapper = document.querySelector('.portfolio-wrapper');
    const no = document.querySelector('.portfolio-no');
    const filters = menu.querySelectorAll('li');

    const typeFilter = (markType) => {
        const marks = wrapper.querySelectorAll('.all, .girl, .lovers, .chef, .guy', '.grandmother', '.granddad');
        marks.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType && markType.length > 0) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    menu.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
            const filterClass = event.target.classList[0];
            filters.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const markType = filterClass === 'all' ? wrapper.querySelectorAll('.all') : wrapper.querySelectorAll('.' + filterClass);
            typeFilter(markType);
        }
    });

};

export default filter;




// const filter = () => {
//     const menu = document.querySelector('.portfolio-menu'),
//         items = menu.querySelectorAll('li'),
//         btnAll = menu.querySelector('.all'),
//         btnLovers = menu.querySelector('.lovers'),
//         btnChef = menu.querySelector('.chef'),
//         btnGirl = menu.querySelector('.girl'),
//         btnGuy = menu.querySelector('.guy'),
//         btnGrandmother = menu.querySelector('.grandmother'),
//         btnGranddad = menu.querySelector('.granddad'),
//         wrapper = document.querySelector('.portfolio-wrapper'),
//         markAll = wrapper.querySelectorAll('.all'),
//         markGirl = wrapper.querySelectorAll('.girl'),
//         markLovers = wrapper.querySelectorAll('.lovers'),
//         markChef = wrapper.querySelectorAll('.chef'),
//         markGuy = wrapper.querySelectorAll('.guy'),
//         no = document.querySelector('.portfolio-no');

//     const typeFilter = (markType) => {
//         markAll.forEach(mark => {
//             mark.style.display = 'none'
//             mark.classList.remove('animated', 'fadeIn')
//         })

//         no.style.display = 'none'
//         no.classList.remove('animated', 'fadeIn')

//         if (markType) {
//             markType.forEach(mark => {
//                 mark.style.display = 'block'
//                 mark.classList.add('animated', 'fadeIn')
//             })
//         } else {
//             no.style.display = 'block'
//             no.classList.add('animated', 'fadeIn')
//         }
//     }
//     btnAll.addEventListener('click', () => {
//         typeFilter(markAll)
//     })
//     btnLovers.addEventListener('click', () => {
//         typeFilter(markLovers)
//     })


// }

// export default filter;
