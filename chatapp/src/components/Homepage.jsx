import Authentication from "./Authentication";



// eslint-disable-next-line react/prop-types
export default function Homepage({ onSignIn }){

    return(
        <>
        
        <Authentication onSignIn={onSignIn}/>
       
        
        </>
    )
}