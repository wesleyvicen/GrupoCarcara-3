let Footer = {
    render : async () => {

        
        let viewHome = `
        <footer class="my-5 pt-3 text-muted text-center text-small">
            <p>© Copyrigth 2021 - Arte: <a href="https://www.instagram.com/andersoneliasarts/">@andersoneliasarts</a></p>
        </footer>         
        `
        let viewDefault = `
        <footer class="my-5 pt-3 text-muted text-center text-small">
            <p>© Copyrigth 2021</p>
        </footer> 
        `
        if(window.location.hash == ""){
            return viewHome;
        }
        return viewDefault;
    },
    after_render : async () => {}
}

export default Footer;



