console.log('Client side javascript is loaded.')

const searchForm = document.querySelector('form')
const search = document.querySelector('input')


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searched = search.value
    print(location)

})