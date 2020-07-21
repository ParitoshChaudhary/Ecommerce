
var updateBtns = document.querySelectorAll('.update-cart')


function getToken(name) {
     let cookieValue = null;
     if (document.cookie && document.cookie !== '') {
         const cookies = document.cookie.split(';');
         for (let i = 0; i < cookies.length; i++) {
             const cookie = cookies[i].trim();
             // Does this cookie string begin with the name we want?
             if (cookie.substring(0, name.length + 1) === (name + '=')) {
                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break;
             }
         }
     }
  return cookieValue;
}


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


var i=0;
for(i; i < updateBtns.length; i++){

    updateBtns[i].addEventListener('click', function() {
        var productId = this.dataset.product
        var action = this.dataset.action
        var user = this.dataset.user_name
        console.log('productId: ', productId, 'Action: ', action, 'User: ', user)

        if(user == 'AnonymousUser'){
            console.log("User is not Logged in")
        }else{
            updateUserData(productId, action)
        }
    })

}


function updateUserData(productId, action){
    console.log("User is logged in, sending data...")

    var url = '/update_item/'
    var csrftoken = getToken('csrftoken');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'productId': productId, 'action': action})
    })

    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log('data: ', data)
    })
}
