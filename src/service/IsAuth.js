let IsAuthenticated = async (isAuth, route) => {

    if(!isAuth){
        if(!localStorage.getItem('@token')){
            window.location.replace(`#/${route}`)
        }
    }else{
        if(localStorage.getItem('@token')){
            window.location.replace(`#/${route}`)
        }
    }
  }


  export default IsAuthenticated;