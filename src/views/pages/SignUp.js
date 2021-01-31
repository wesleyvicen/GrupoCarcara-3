let SignUp = {
    render :async () => {
        // window.postData = postRegisterNewUser();
        let view = `
        <div>
            Hello World - Cadastro
        </div>
        `

        return view;
    },
    after_render :async () => {
    }
}

export default SignUp;