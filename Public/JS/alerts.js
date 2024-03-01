
export const hideAlert = () => {
    let alerts = document.querySelector('.alert');
    if (alerts) alerts.parentElement.removeChild(alerts);
}

// type will be success or error
export const showAlert = (type, msg) => {

    console.log("came inside");
    hideAlert();

    const markup = `<div class=" animate-bounce translate-y-6  w-75 m-auto text-center font-bold capitalize alert alert-${type} fixed-top">${msg} </div>`;
    document.querySelector('body').insertAdjacentHTML("beforebegin", markup);

    window.setTimeout(hideAlert, 5000);
}



















