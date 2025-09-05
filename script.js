const timeline = gsap.timeline()
timeline.from('.container',{
    y:'-100%',
    duration:3, 
    ease: 'bounce'
})
.from('.stag' ,{
    opacity: 0,
    duration:2,
    stagger: 0.5,  
})
.from('.sub-btn', {
    opacity:0,
    scale: 0,
    rotation: 360,})
.from('.stag2',{
    opacity: 0,
    duration: 2,
    stagger: 0.5,
    ease: 'ease'
})
.from('.reset-btn', {
    x: '-100%',
    opacity: 0,
    ease:'power-in-out',
    duration:3
})



const form = document.querySelector('.age-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const day = parseInt(document.getElementById('day').value)
    const month = parseInt(document.getElementById('month').value)
    const year = parseInt(document.getElementById('year').value)

    const dayInput = form.elements.day
    const monthInput = form.elements.month
    const yearInput = form.elements.year
    const labels = document.querySelectorAll('label')

    const now = new Date()
    const currentYear = now.getFullYear()
    let hasError = false

    let dayError = ''
    if (!day) {
        dayError = 'This field is required'
        dayInput.classList.add('error')
        labels.forEach(label => {
            label.classList.add('label-error')
        })
        hasError = true
        // console.log('error');
    } else if (day < 1 || day > 31) {
        dayError = 'Day must be between 1-31'
       dayInput.classList.add('error')
        hasError = true
    } else {
        dayInput.classList.add('success')
        labels.forEach(label => {
            label.classList.remove('label-error')
        })
    }

    document.getElementById('day-error').textContent = dayError

    //month
    let monthError = ''
    if (!month) {
        monthError = 'This field is required'
        monthInput.classList.add('error')
        labels.forEach(label => {
            label.classList.add('label-error')
        })
        hasError = true
    } else if (month < 1 || month > 12) {
        monthError = 'Month must be between 1-12'
         monthInput.classList.add('error')
        hasError = true
    } else {
        labels.forEach(label => {
            label.classList.remove('label-error')
        })
        monthInput.classList.add('success')
    }

    document.getElementById('month-error').textContent = monthError

    //year
    let yearError = ''
    if (!year) {
        yearError = 'This field is Required'
        yearInput.classList.add('error')
        labels.forEach(label => {
            label.classList.add('label-error')
        })
        hasError = true
    } else if (year > currentYear) {
        yearError = 'Year must not be in the future'
        yearInput.classList.add('error')
        hasError = true
    } else {
        yearInput.classList.add('success')
        labels.forEach(label => {
            label.classList.remove('label-error')
        })
    }

    document.getElementById('year-error').textContent = yearError

    //check for valid date
    if (!hasError) {

        const inputDate = new Date(year, month - 1, day)
        if (inputDate.getDate() !== day ||
            inputDate.getMonth() !== (month - 1) ||
            inputDate.getFullYear() !== year) {
            dayError = 'Invalid date'
            hasError = true
        }
        document.getElementById('day-error').textContent = dayError
    }

    if (hasError) return

    const today = new Date()
    let years = today.getFullYear() - year
    let months = today.getMonth() - (month - 1)
    let days = today.getDate() - day

    if (days < 0) {
        months--
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }

    if (months < 0) {
        years--
        months += 12
    }

    document.querySelector('.years').textContent = years
    document.querySelector('.months').textContent = months
    document.querySelector('.days').textContent = days



})

const reset = document.querySelector('.reset-btn')
reset.addEventListener('click', ()=>{
    // Clear input values
    document.getElementById('day').value = '';
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';

    // Clear error messages
    document.getElementById('day-error').textContent = '';
    document.getElementById('month-error').textContent = '';
    document.getElementById('year-error').textContent = '';

    // Clear output results
    document.querySelector('.years').textContent = '--';
    document.querySelector('.months').textContent = '--';
    document.querySelector('.days').textContent = '--';

     document.getElementById('day').classList.remove('error', 'success');
    document.getElementById('month').classList.remove('error', 'success');
    document.getElementById('year').classList.remove('error', 'success');

})